---
title: "Real-Time Updates with React, NestJS, and Prisma"
description: "How I built a live dashboard to impress potential clients"
date: "2025-12-10T12:00:00.00000-07:00"
author: "Jared Gibson"
tags: ["react", "nestjs", "prisma", "real-time", "updates"]
image:
  {
    sm: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=M3w4MzU4MTJ8MHwxfHNlYXJjaHwxMHx8d2F0Y2h8ZW58MHx8fHwxNzY0OTc1ODM1fDA&ixlib=rb-4.1.0&w=600&h=400&q=80&fm=webp&fit=crop&dpr=1",
    lg: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixid=M3w4MzU4MTJ8MHwxfHNlYXJjaHwxMHx8d2F0Y2h8ZW58MHx8fHwxNzY0OTc1ODM1fDA&ixlib=rb-4.1.0&w=1200&h=800&q=80&fm=webp&fit=crop&dpr=1",
  }
status: "draft"
---

## Introduction

One of the projects I do contract work for involves performing inspections in remote locations and aggregating that data into a dashboard with various widgets. This project is actually a revamp of an existing product that was showing its age and was considered ready to be "put to rest", so to speak. The old version had a dashboard that required manual refreshing, which, during product demos was a huge pain point! The owner and sales team agreed that an "auto-refresh" would be really "slick".

Of course, I love slick tech (beautiful UIs really speak to me 🤩) and I love to impress, so, naturally, I told them I could make it happen.

## My Toolkit

Before we get started, here is a brief rundown of the tools I'm working with:

| Function              | Tool                      |
| --------------------- | ------------------------- |
| Database              | Postgres                  |
| ORM                   | Prisma                    |
| Backend/API Framework | NestJS/Express.js         |
| Frontend Framework    | React Router 7 (ie Remix) |
| Pub/Sub Tool          | Redis                     |

## Deciding on a Solution

Our "auto-refresh" feature will be an example of a common pattern called real-time updates. The basic idea is that somehow the client (i.e. frontend or browser in this case) needs to become aware of changes to data both automatically and as soon as the changes happen (this is the "real-time" part).

Most apps (including this one) are built primarily for a "pull" pattern, that is, data is only served upon request.

```
+-----------+       (makes request)       +-------+       (calls db)       +-----------+
|           | ------------------------->  |       | ---------------------> |           |
|  Client   |                             |  API  |                        | Database  |
|           | <-------------------------- |       | <--------------------- |           |
+-----------+  (responds with data)       +-------+  (responds with data)  +-----------+
```

The challenge with this pattern is that the client isn't aware of changes to data, so it doesn't know when to request the updates.

A trivial solution to this would be to **poll** (not "pull") the data every few seconds. It's simple, but it puts efficiency and real-time at odds with each other: longer intervals mean less real-time, but shorter intervals mean higher server load. It's not very _slick_.

On the other extreme we have **sync engines** (_very slick_), but they are also far from trivial. I would love to play around with that tech more at some point, but right now it's overkill for this use case.

One great "middle-ground" solution (and the one we will adopt) is to set up a "push" mecahnism for the API to alert the client (via **events**) of changes, to which the client can react by requesting fresh updates. This is much closer to real-time (within milliseconds sometimes) without over-burdening our poor servers. It's also pretty straightforward to adopt incrementally and it's flexible – the client can pick which events to listen to and how to react (or not react).

### Push Events

When I think of pushing data from the server, my first instinct is to reach for [websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). Websockets are great, but they can be kind of tricky to implement right, and still maybe a little more than what we need. Websockets allow data to flow in **both** directions with low overhead, but we only need data to flow in **one** direction. This is just for sending update events from the server – we already have our HTTP API for making standard data requests from the client.

That brings me to [server sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). They're basically just the one-way version of websockets, and even have a well-supported browser interface called [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource).

So, we'll use the EventSource API on the client to listen for events, but now we need to figure out how the server is going to trigger and send these events.

### Update Triggers

Triggering update events can happen at either the database or the application level, each of which has trade-offs. At the database level, being closer to the data, you can guarantee a higher level of consistency since any table updates will trigger events. However, at the application level, you gain more flexibility, type safety, and better debuggability.

I went with triggering updates at the application level via Prisma extensions, because of the greater flexibility and, frankly, the comfort of working in the code. I do think that the database level triggers would have worked well and may have been simpler. I'll play with them in a future project (or maybe someday update this one, who knows 🤷🏽‍♂️).

### The Last Piece: Pub/Sub

To connect the dots, we need some way to make sure clients only get the events they care about (or are allowed to see). We also want delivering events to be asynchronous – errors delivering events should be decoupled from (and therefore not impact) completion of operations (i.e. create, update, delete). Since I'm already using Redis for [queues](https://docs.bullmq.io/) and caching, it isn't too much to set it up for publishing and subscribing to events. Plus, we get the power and performance of Redis, which comes in handy with its `PSUBSCRIBE` command that will allow us to use wildcards when subscribing to events.

### Summarizing the Solution

Here's the solution we've come up with so far:

1. Client A listens to events from API via server sent events (SSE).
2. API subscribes to appropriate Redis channel and forwards events to client listeners.
3. Client B mutates data (create, update, delete) via API.
4. Prisma extension intercepts operation and publishes event to Redis after operation completes.

```
+-----------+    (mutates data)     +----------+       (calls db)       +-----------+
|           | ------------------->  |          | ---------------------> |           |
| Client B  |                       |    API   |                        | Database  |
|           |                       |          |                        |           |
|           | <-------------------- | [Prisma] | <--------------------- |           |
|           | (responds with data)  |    |     |  (responds with data)  |           |
+-----------+                       |    |     |                        |           |
                                    |    |     |                        |           |
                                    |    |     |   (publish to channel) |           |
                                    |    +-----+------------+           |           |
                                    |          |            v           |           |
                                    |          |       +----------+     |           |
                                    |          |       |  Redis   |     |           |
                                    |          |       +----------+     |           |
                                    |          |            |           |           |
                                    |     +----+------------+           |           |
                                    |     |    | (subscribe to channel) |           |
                                    |     |    |                        |           |
+-----------+  (listens to events)  |     v    |                        |           |
|           | ------------------->  |   [SSE]  |                        |           |
|           | <-------------------  |          |                        |           |
| Client A  |     (emits event)     |          |                        |           |
|           |                       |          |                        |           |
|           | (fetches fresh data)  |          |       (calls db)       |           |
|           | ------------------->  |          | ---------------------> |           |
|           | <-------------------  |          | <--------------------- |           |
+-----------+  (responds with data) +----+-----+  (responds with data)  +-----------+
```

## Building the Solution

Okay, now that we have a plan, where do we begin? There are both bottom-up (starting with DB events) and top-down (starting with client) approaches. In this case I prefer the bottom-up approach as it will allow us to see working progress at each step, and each step builds on previous steps.

Here are the steps:

1. [API] Build (or update) a Prisma extension to intercept updates and publish events to Redis.
2. [API] Set up our Redis client.
3. [API] Add SSE endpoint for subscribing to event channels and emitting those events.
4. [Client] Initialize `EventSource` to consume events and trigger data refreshes.

### Prisma Extension

Prisma actually already has [event logging](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging#event-based-logging) built in that we could maybe hook into except that we need a little more context and control than what it provides. For example, it's vital to have information about the person executing the operation so we know who to publish events to! It can also be useful to get the result of the operation, which we don't get with the event logging.

With Prisma extensions, we can hook into any part of the Prisma client that we need to, and make sure we have the context we need!

First, we need to make sure we have a Prisma client set up. Since I'm using NestJS, I can use its dependency injection to instantiate and manage my classes/services.

Since Prisma 7, the client needs an adapter that is instantiated separately:

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { ApiConfigService } from "src/config/api-config.service";

@Injectable()
export class PrismaAdapter extends PrismaPg {
  // This `ApiConfigService` is a light wrapper around Nest's default `ConfigService` that
  // provides type-safe configuration values from environment variables.
  constructor(private readonly apiConfig: ApiConfigService) {
    super({
      connectionString: apiConfig.get("DATABASE_URL"),
    });
  }
}
```

Now we can inject that into our Prisma service, which extends `PrismaClient`:

```typescript
import { Prisma, PrismaClient } from "src/generated/prisma/client";
import { PrismaAdapter } from "./prisma.adapter";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    // TODO: We'll define this service in the next step.
    private readonly redis: RedisService,
    // Starting with Prisma 7, database adapters are instantiated separately.
    private readonly prismaAdapter: PrismaAdapter,

    // (Optional) `nestjs-cls` is a useful library for accessing request-scoped context (such as
    // user data), built around AsyncLocalStorage.
    protected readonly cls: ClsService<CommonClsStore>,

    // (Optional) Some kind of service to help retrieve user data.
    private readonly peopleService: PeopleService
  ) {
    super({
      adapter: prismaAdapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  // This is where we can start extending our Prisma client...
}
```

Your exact needs may differ, but, like I mentioned above, context is very important for my project and this helper method helps build a client with that context (i.e. user/person info, intent).

```typescript
export class PrismaService ... {
  // ...setup code

  public async build(options: PrimaryExtensionOptions = {}) {
    // Apply primary extension to the Prisma service
    return this.$extends(await this.buildPrimaryExtension(options));
  }
}

export interface PrimaryExtensionOptions {
  context?: ViewContext; // Allows application to specify intended context (i.e. admin or user)
  person?: PersonRepresentation; // Details about the user (i.e. organization, name, role)
}
```

Now let's dive into the extension. I debated between slimming down my example to the bare essentials and showing real production code. I chose to show more of the production code so you can see what this looks like in a real-world scenario. I tried to add comments with sufficient explanation to help you determine what you need and what you don't.

```typescript
export class PrismaService ... {
  // ...setup code

  private async buildPrimaryExtension(options: PrimaryExtensionOptions) {
    // (Optional) Get current user from cls. `nestjs-cls` is a useful library for accessing
    // request-scoped context (such as user data), built around AsyncLocalStorage.
    const user = this.cls.get('user');

    // Since the user object comes from an external source (a JWT from the identity provider in
    // this case), we want to get internal, more application-specific details about the person.
    let person: PersonRepresentation | undefined;
    if (options.person) {
      person = options.person;
    } else if (!cronMode) {
      try {
        person = await this.peopleService.getPersonRepresentation();
      } catch (e) {
        if (e instanceof UserConfigurationError) {
          throw new ForbiddenException(e.message);
        }
        throw e;
      }
    }

    // The definition of `this` can get muddled as we start extending the client, so here
    // we're explicitly assigning the PrismaService `this` to `thisPrismaService`.
    const thisPrismaService = this;


    // Ah, finally, defining the extension!
    // NOTE: I've found that Prisma has a tendency to get "over extended". It can lose track
    // of type safety if you chain too many extensions. For that reason, I try to minimize
    // extension chaining and define everything I need in as few extensions as possible.
    return Prisma.defineExtension((prisma) => {
      // Build base extension that handles most of our customizations. The only extension we'll
      // add to this is the one below that sets database parameters for use by RLS (which of
      // course can be ignored if you're not needing to get into that!)
      const extendedPrisma = prisma.$extends({
        // (Optional) Make our hard-earned context available for our application to use as needed.
        client: {
          $currentUser: () => person,
        },
        // Here we could add other extended functions, such as a pagination helper.
        // model: {
        //   $allModels: {
        //     findManyForPage: findManyForPageExtensionFn,
        //   },
        // },

        // REQUIRED: This is where we publish our model events!
        query: {
          $allModels: {
            async $allOperations({ args, query, operation, model }) {
              // Wait for operation to complete.
              const result = await query(args);

              // Process event.
              if (person) {
                // TODO: We'll define this next.
                thisPrismaService.emitModelEvent({
                  model,
                  operation,
                  result,
                  person,
                });
              }

              return result;
            },
          },
        },
      });

     // In my project, this is where I extend the client again to add support for RLS.
     // return extendedPrisma.$extends({ ... });

     return extendedPrisma;
    });
  }
}
```

You'll notice there's a `TODO` in there for defining the method `emitModelEvent`. This is the final step to complete our Prisma extension and is where we finally publish some stuff to Redis!

```typescript
export class PrismaService ... {
  // ...setup code

  private emitModelEvent({
    model,
    operation,
    result,
    person,
  }: {
    model: string;
    operation: string;
    result: unknown;
    person: Pick<PersonRepresentation, 'clientId'>;
  }) {
    // Here, we filter by operations that we care about. I only want to emit events for any kind of
    // mutation query (create, update, delete).
    if (
      ![
        'create',
        'createMany',
        'createManyAndReturn',
        'update',
        'updateMany',
        'updateManyAndReturn',
        'delete',
        'deleteMany',
      ].includes(operation)
    ) {
      return;
    }

    // Our event consumers don't really care about these more specific operations, only the basic
    // create, update, and delete operations.
    let cleanedOperation = operation;
    switch (operation) {
      case 'createMany':
      case 'createManyAndReturn':
        cleanedOperation = 'create';
        break;
      case 'updateMany':
      case 'updateManyAndReturn':
        cleanedOperation = 'update';
        break;
      case 'deleteMany':
        cleanedOperation = 'delete';
        break;
      default:
        break;
    }

    // Build event body. This is what will be published to Redis.
    // NOTE: Although we try to be careful in partitioning data between different
    // organizations/clients, it's a good idea to limit the data included here to only what's
    // really needed, just in case!
    const eventBody: Record<string, string> = {
      model,
      operation: cleanedOperation,
    };

    // If this is an operation on a single row, try to extract and include an ID
    // in the event body.
    if (typeof result === 'object' && !isNil(result) && 'id' in result) {
      eventBody.id = String(result.id);
    }

    // Build a channel name.
    // IMPORTANT: Choosing which information to include in a channel is crucial for
    // partitioning data between different subscribers. In my case, events should only
    // be received for a person's own organization (identified by clientId)!
    const channel = `db-events:${person.clientId}:${model}:${cleanedOperation}`;
    const payload = JSON.stringify(eventBody);

    // ...and publish!
    this.redis.getPublisher().publish(channel, payload);
  }
}
```

And if you need help setting up your Redis service:

```typescript
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { createClient, type RedisClientType } from "redis";
import { ApiConfigService } from "src/config/api-config.service";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: RedisClientType;
  private readonly subscriber: RedisClientType;

  constructor(private readonly config: ApiConfigService) {
    this.client = createClient({
      socket: {
        host: this.config.get("KV_STORE_HOST"),
        port: this.config.get("KV_STORE_PORT"),
        connectTimeout: this.config.get("KV_STORE_CONNECT_TIMEOUT"),
      },
    });

    // Log useful events for main client.
    this.client.on("error", (err) => {
      this.logger.error("Redis client error", err);
    });
    this.client.on("connect", () => {
      this.logger.log("Redis client connected");
    });
    this.client.on("ready", () => {
      this.logger.log("Redis client ready");
    });
    this.client.on("reconnecting", () => {
      this.logger.log("Redis client reconnecting");
    });
    this.client.on("end", () => {
      this.logger.log("Redis client disconnected");
    });

    // Duplicate client to use as subscriber. A client is limited in what commands
    // it can execute while being subscribed to.
    this.subscriber = this.client.duplicate();

    // Log useful events for subscription client.
    this.subscriber.on("error", (err) => {
      this.logger.error("Redis subscriber error", err);
    });
    this.subscriber.on("connect", () => {
      this.logger.log("Redis subscriber connected");
    });
    this.subscriber.on("ready", () => {
      this.logger.log("Redis subscriber ready");
    });
    this.subscriber.on("reconnecting", () => {
      this.logger.log("Redis subscriber reconnecting");
    });
    this.subscriber.on("end", () => {
      this.logger.log("Redis subscriber disconnected");
    });
  }

  async onModuleInit() {
    await this.client.connect();
    await this.subscriber.connect();
  }

  async onModuleDestroy() {
    await Promise.allSettled([this.client.quit(), this.subscriber.quit()]);
  }

  public getPublisher() {
    return this.client;
  }

  public getSubscriber() {
    return this.subscriber;
  }

  // TODO: Add helper methods for listening to events.
}
```
