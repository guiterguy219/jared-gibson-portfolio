---
title: "Type-Safe Environment Variable Config with Zod in NestJS"
description: "The easy solution to guarantee valid and type-safe config"
date: "2025-12-11T10:00:00.00000-07:00"
author: "Jared Gibson"
tags: []
image:
  {
    sm: "https://images.unsplash.com/photo-1562369158-71cbfd5a494c?ixid=M3w4MzU4MTJ8MHwxfHNlYXJjaHw1NHx8cGx1Z3N8ZW58MHx8fHwxNzY1NDY5OTMyfDA&ixlib=rb-4.1.0&w=600&h=400&q=80&fm=webp&fit=crop&dpr=1",
    lg: "https://images.unsplash.com/photo-1562369158-71cbfd5a494c?ixid=M3w4MzU4MTJ8MHwxfHNlYXJjaHw1NHx8cGx1Z3N8ZW58MHx8fHwxNzY1NDY5OTMyfDA&ixlib=rb-4.1.0&w=1200&h=800&q=80&fm=webp&fit=crop&dpr=1",
  }
status: "published"
---

## Introduction

This will be a brief post, because, fortunately, there's not a whole lot to say. Zod and Nest's `ConfigService` do much of the heavy lifting. We just need a little bit of glue to make it all stick together nicely!

I also want to acknowledge that there are many ways to inject configuration values into an environment, but I've found **environment variables** to be the most widely supported and simple to adopt. They have their shortcomings, but, as you'll see here, I think we're able to overcome most of them pretty well.

## The Plan 📝

Here are the basic steps we'll follow:

1. Create `config.ts` file in project root to hold our Zod schema.
2. Set up Nest's default `ConfigModule` in `app.module.ts` to use our recently created config schema.
3. Create a separate `ApiConfigService` that lightly wraps Nest's `ConfigService` to add type safety by default.

## Executing the Plan 🚀

Okay, let's dive right in!

### Config Schema

Earlier I mentioned some of the drawbacks of using environment variables. The main two are their inherint "flat" nature and their lack of types. For example, in previous projects we would use deeply nested YAML config files, so we had to have some process for "de-flattening" the environment variables and converting their string values as needed to numbers, arrays, or even JSON objects. This process was abstracted away and often difficult to understand, which would sometimes lead to obscure and hard to debug errors.

To address the "flat" issue, I've found recently I prefer simply embracing flat config. You may say, "Oh, you're project isn't that complex", and you may be right. 😉 However, even in the case of 50, 100, or more configuration values, I think there is something gained from the simplicity of mapping environment variables directly to the project's config class or object. It reduces ambiguity and the cognitive overhead of setting up the environment variables.

And regarding the typing issue, my answer to that is Zod. Let's take a look:

```typescript
// src/config.ts

import { z } from "zod";

export const configSchema = z.object({
  // --> While the values are flat, it's still nice to keep similar configs grouped together.
  // GENERAL
  PORT: z.coerce.number().optional().default(3000), // --> Use Zod's coercion convert types.
  FRONTEND_URL: z.string(),

  // DATABASE
  DATABASE_URL: z.string(),

  // AUTH
  AUTH_JWKS_URI: z.string(),
  AUTH_ISSUER: z.string(),
  AUTH_AUDIENCE: z.string(),
  AUTH_CLIENT_ID: z.string(),
  AUTH_CLIENT_SECRET: z.string(),
  AUTH_REFRESH_INTERVAL_SECONDS: z.coerce.number().default(58),

  // CORS
  CORS_ALLOWED_ORIGINS: z
    .string()
    .default("")
    .transform((val) => val.split(",")), // --> An example of the powerful Zod's transform method
  // converting this comma-separated value into an array.

  // Key Value Store
  KV_STORE_HOST: z.string().default("localhost"), // --> Set defaults!
  KV_STORE_PORT: z.coerce.number().default(6379),
  KV_STORE_CONNECT_TIMEOUT: z.coerce.number().default(5000),

  // ...other config values as needed.
});

// --> Let Zod infer the type of the schema so we can have type safety!
export type Config = z.infer<typeof configSchema>;
```

I want to re-emphasize the power of Zod's **transforms**. You can convert your environment variable values into whatever you need!

### Plugging In Our Config Schema

Now we need to go to our `app.module.ts` to plug our new config schema into the `ConfigModule`:

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // --> (Optional) Cache to avoid slowdowns from accessing process.env
      validate: (env) => configSchema.parse(env), // --> Simply use Zod's parse method to build
      // the config object from our schema. Zod will throw an error on app startup if environment
      // variables are insufficient or invalid.
    }),
    // ...other module imports.
  ],
  // ...providers, controllers, etc.
});
export class AppModule {}
```

### Wrapping the Config Service

We now have our config service in place, which we could begin to use as is. The issue is that there's some overhead to get type safety. For example, if you just import and use the default config service, you won't get type hints or typed return values:

```typescript
@Injectable()
export class SomeService {
  constructor(private readonly config: ConfigService) {
    // Problems:
    // 1. The `get` method accepts any string. No hints or enforcement of valid keys.
    // 2. The type of `dbUrl` is `any`. Not helpful!
    const dbUrl = config.get("DATABASE_URL");
  }
}
```

Luckily, with a little extra setup, we can fix these problems. Instead of adding this extra setup to every single service that imports config, let's just create our own config module!

```typescript
// src/config/api-config.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config } from "../config";

@Injectable()
export class ApiConfigService {
  // Adding the `Config` type inferred from our Zod schema as a parameter, `ConfigService` will
  // now be able to enforce type safety.
  constructor(private readonly config: ConfigService<Config, true>) {} // --> The `true` here means
  // "Yes", our config schema was validated.

  // Wrap the default `get` function, setting `infer` as `true`.
  get<T extends keyof Config>(key: T) {
    // The `infer` option is what tells the config service we want typed return values.
    return this.config.get(key, { infer: true });
  }
}
```

```typescript
// src/config/api-config.module.ts
import { Global, Module } from "@nestjs/common";
import { ApiConfigService } from "./api-config.service";

// Provide and export our new config service globally, and we're done!
@Global()
@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
```

## Finishing Up

You can now go ahead and started using the new config service:

```typescript
@Injectable()
export class SomeService {
  constructor(private readonly config: ApiConfigService) {
    // What's better:
    // 1. The `get` method only accepts valid config keys and provides hinting.
    // 2. The type of `dbUrl` is correctly typed! Hooray!
    const dbUrl = config.get("DATABASE_URL");
  }
}
```

Enjoy fewer headaches managing your configuration!
