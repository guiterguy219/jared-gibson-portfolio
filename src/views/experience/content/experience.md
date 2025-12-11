---
title: Experience
description: A deep dive into my experience by technical domain
---

![Zion National Park](https://content.gibsonops.com/jared/zion-national-park-banner.webp)

## What can I help you with? 🙂

I'm happy to dive head first into building any solution you might need, but first, I'd like to present to you my experience by technical domain, giving you a deeper understanding of how I can provide for you the most benefit.

+++

### Experience by Technical Domain

I can _tell you_ I'm a full stack developer, but here I can _show you_ what that really means. Use the **\[ Details 🔗 \]** button by each domain to dive deeper and learn more about relevant projects, my opinions, and other thoughts.

| Domain                          | Typical Framework/Tool(s)      |                                 |
| ------------------------------- | ------------------------------ | ------------------------------- |
| 🤖 AI                           | Claude & Cursor                | [Details 🔗](#domain-ai)        |
| 🔐 Authentication/Authorization | Keycloak (SAML & OIDC)         | [Details 🔗](#domain-auth)      |
| 🚛 Backend                      | NestJS/Express.js              | [Details 🔗](#domain-backend)   |
| 🔑 Cache/Key-Value Store        | Redis, ValKey                  | [Details 🔗](#domain-cache)     |
| ☁️ Cloud                        | Render, AWS                    | [Details 🔗](#domain-cloud)     |
| 💾 Database                     | Postgres & Prisma              | [Details 🔗](#domain-database)  |
| 🚀 Deploy & CI/CD               | Docker, GitHub Actions, Render | [Details 🔗](#domain-deploy)    |
| ✨ Frontend                     | React/React Router 7/Remix     | [Details 🔗](#domain-frontend)  |
| ✉️ Messaging/Pub-Sub            | Redis, Kafka                   | [Details 🔗](#domain-messaging) |
| 🧑‍💻 Server Management            | Linux (mostly Ubuntu or RHEL)  | [Details 🔗](#domain-server)    |
| 👥 User Management              | Keycloak                       | [Details 🔗](#domain-user)      |

+++

---

<h4 id="domain-ai">🤖 AI</h4>

- **Typical Framework/Tool(s)**: Claude & Cursor

I started integrating AI tools into my development workflow ever since I first heard about GitHub Copilot in 2022. I fell in love with the smart code completion and used it constantly to boost productivity.

That's when things were simple. Now, the market is flooded with AI tools that promise massive productivity gains. Like everyone else, I'm still experimenting with which tools to use and how to best leverage them, but as of right now I have adopted Claude and Cursor as my foundational tools for AI-assisted development.

In all that's changing with the advancement of AI tooling, I maintain a strong belief in the importance of **using AI responsibly**. While it can certainly boost productivity and support ingenuity, it can also stifle creativity and lead to poor software if not used correctly. I strive to keep my brain in the driver's seat and use AI tools as just that – tools.

That being said, I found it valuable to experiment with letting AI do the heavy lifting in certain low-stakes environments, such as this gift exchange app I built completely with Claude Code (model: Opus 4.5) without touching the codebase: [🎅 Santa's Secrets](https://santas-secrets.onrender.com) | [\[Source Code\]](https://github.com/guiterguy219/santas-secrets)

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-auth">🔐 Authentication/Authorization</h4>

- **Typical Framework/Tool(s)**: Keycloak (SAML & OIDC)

Managing authentication and user access is an essential component of most applications I build. Security is always a top priority, and I make sure the latest secure practices are baked into every layer of my projects, authentication and authorization being at the forefront.

[Keycloak](https://www.keycloak.org/) has been a trusty tool in my toolbelt for years now, due to its security, powerful features, extensibility, reliability, open-source nature, and support by both the community and Red Hat. Take a look at some custom plugins I developed for Keycloak to support advanced user querying, advanced SSO attribute mapping, and more: [\[Custom Keycloak Plugins\]](https://github.com/threatzero-solutions/keycloak-plugins).

Most popular providers such as [Auth0](https://auth0.com/), [Okta](https://www.okta.com/), [Azure AD](https://azure.microsoft.com/en-us/products/active-directory/), [Amazon Cognito](https://aws.amazon.com/cognito/), etc. tend to suffer with lack of flexibility or high costs. Since my experience has been with smaller, more cost-sensitive businesses with complex authentication needs, Keycloak has been the perfect fit and a huge cost saver.

**A note on my approach 📝**: I deal almost exclusively with OAuth2 for in-app authentication and authorization, and OIDC and SAML for SSO with external identity providers. Keycloak handles the login flows and JWT brokering, while I handle the integration with both the frontend (client) and backend (protected resource). These integrations usually include token validation, parsing and refreshing; login redirects; and fine-grained access control.

**Alternative tools I have my eyes on 👀**: I've been interested in exploring other tools such as [Clerk](https://clerk.com/) or [Better-Auth](https://better-auth.com/) for more modern, developer-friendly authentication solutions.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-backend">🚛 Backend</h4>

- **Typical Framework/Tool(s)**: NestJS/Express.js

My backend experience covers the full spectrum: from designing RESTful APIs to orchestrating complex business logic, background jobs, and real-time systems. I predominantly work with [Node.js](https://nodejs.org/) (favoring [NestJS](https://nestjs.com/), built on [Express.js](https://expressjs.com/), for its powerful architecture and productivity). I structure code for modularity, scalability, and maintainability—using dependency injection, layered services, middleware, guards, and validation best practices.

Security and reliability are top priorities in any backend work I do. That means thoughtfully handling authorization, data validation, rate limiting, logging, and audit trails. I have deep experience integrating with third-party APIs, authentication servers, queuing systems, and cloud resources. Whether rolling out REST, GraphQL, or webhooks, I architect clean interfaces and document them with tools like Swagger or [OpenAPI](https://swagger.io/specification/).

**Other languages 🌐**: I also have extensive experience building backend systems in Python (via [Django](https://www.djangoproject.com/)) and Java (via [Spring Boot](https://spring.io/projects/spring-boot)). These were my primary languages for backend development before I switched to Node.js. _Why the switch?_ Python/Java were the standard languages on a previous team, but after working on my own I learned to appreciate the simplicity and speed of development with Node.js, especially considering that I'm already heavily invested in JavaScript/TypeScript for frontend development.

**Other tools 🔧**: I've been intrigued by the potential of [Bun](https://bun.sh/) for its promised performance improvements over and compatibility with Node.js, but I've found that in the case of real-world, production-grade applications, Node.js still wins out for its stability, community support, and tooling ecosystem.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-cache">🔑 Cache/Key-Value Store</h4>

- **Typical Framework/Tool(s)**: Redis, ValKey

This one is simple. I love performance and scability, and [Redis](https://redis.io/) has established itself as the de facto standard for key-value stores.

I've used Redis for years now, and it's a great tool for caching, session management, and real-time updates. I've also used [ValKey](https://valkey.dev/) as an open-source, drop-in replacement for Redis.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-cloud">☁️ Cloud</h4>

- **Typical Framework/Tool(s)**: Render, AWS

Cloud computing and other cloud-related services are a vital contributor to modern production-grade software. I have extensive experience with [AWS](https://aws.amazon.com/), but have more recently been liking [Render](https://render.com/) for its ease of use and developer-friendly features. While AWS is powerful, it's complexity can cost a lot of development time, which often isn't worth it for smaller, more cost-sensitive businesses. Render makes deployment and monitoring a breeze with similar pricing to AWS.

Services I've used AWS for: Container orchestration (ECS), Database (RDS), Storage (S3), CDN (CloudFront), DNS (Route 53), Load Balancer (ALB), Key-Value Store (ElastiCache), static site hosting (Amplify), and more.

Services I've used Render for: Container orchestration, database hosting, key-value store (ValKey), and static site hosting.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-database">💾 Database</h4>

- **Typical Framework/Tool(s)**: Postgres & Prisma

A database is the backbone of most modern applications. Thoughtful schema design, indexing, and query optimization are crucial for performance and scalability. I've used [Postgres](https://www.postgresql.org/) for years now as it's the most popular relational database and has a strong community and tooling ecosystem.

**Row-level security (RLS) 🔒**: RLS has been a game changer for handling multi-tenant applications with complex data segregation requirements. It allows for fine-grained control over which users can access which data, and is a powerful tool for keeping your data secure. By bringing the segregation down to the database level, you can avoid much more complex and bug-prone solutions at the application layer.

##### ORM Tools

I've used both [TypeORM](https://typeorm.io/) and [Prisma](https://www.prisma.io/) as ORM tools, Prisma being more recent and more popular.

**Other tools I have my eyes on 👀**: Prisma has a great developer experience, but I've been interested in exploring other tools such as [Drizzle](https://orm.drizzle.team/), which poises itself as a more performant alternative to Prisma with a similar developer experience.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-deploy">🚀 Deploy & CI/CD</h4>

- **Typical Framework/Tool(s)**: Docker, GitHub Actions, Render

[Docker](https://www.docker.com/) is the foundation of my deployment pipelines. By containerizing my services, I can ensure safe and consistent releases on any platform. I've found that using environment variables to configure my services has been a simple and secure way to manage multiple environments (development, staging, production) with ease.

For static sites, tools like [Render](https://render.com/), [AWS Amplify](https://aws.amazon.com/amplify/), [Cloudflare Pages](https://pages.cloudflare.com/), etc. are great options, because they are fast, easy, and free for small projects.

For CI/CD, I have experience with both [GitHub Actions](https://github.com/features/actions) and [GitLab CI/CD](https://docs.gitlab.com/ee/ci/). GitLab is more robust, but GitHub is more cost effective for small projects.

[Back to top ⬆️](#what-can-i-help-you-with)

---

<h4 id="domain-frontend">✨ Frontend</h4>

- **Typical Framework/Tool(s)**: React/React Router 7/Remix

The first framework I became experienced with is [Angular](https://angular.io/), but I later began adopting [React](https://react.dev/) because of its popularity and ecosystem. I now have considerably more experience with React, and have used it in production for several projects.

While React has its pain points (i.e. unpredicatble re-renders and messy state management), there's something to be said for its maturity and community support. Other frameworks offer improvements over React ([Svelte](https://svelte.dev/), [Solid](https://www.solidjs.com/), [Preact](https://preactjs.com/), etc.), but I've found that it's hard to commit to these frameworks when delivering a complex production-grade application.

A great compromise between plain React and more up-and-coming tools is [React Router 7](https://reactrouter.com/en/main) (formerly [Remix](https://remix.run/)). It integrates well with the React ecosystem while providing an improved developer experience and other features like server-side data loaders and actions, server-side rendering (SSR) with hydration, nested routes with parallel data loading, and more.

([Remix 3](https://appwrite.io/blog/post/remix-3-whats-changing-and-why-it-matters) 👀 is up and coming and may be a good opportunity to break away from the React ecoystem.)

**Side note 📝**: I'm using [Astro](https://astro.build/) for static site generation (including this one!) and it's been awesome. I love how it's simple and performant by default, but can integrate more dynamic components like React, Vue, Svelte, etc. if needed. It makes for a great playground to experiment with new technologies and ideas.

##### Styling

I've used [Tailwind CSS](https://tailwindcss.com/) for styling for years now, and it's a great tool for quickly building consistent and responsive UIs. I've also used [Shadcn UI](https://ui.shadcn.com/) for its component library and developer experience.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-messaging">✉️ Messaging/Pub-Sub</h4>

- **Typical Framework/Tool(s)**: Redis, Kafka

Just like I love performance and scalability, I love snappy interfaces and real-time updates. [Redis](https://redis.io/) and [Kafka](https://kafka.apache.org/) are great tools for this, and I've used them both extensively in production for several projects.

I use Kafka when durability and "exactly-once" delivery are mission critical. However, for smaller applications where durability and duplicate delivery are not a concern, Redis is much easier to set up and has better out-of-the-box support with platforms like AWS and Render.

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-server">🧑‍💻 Server Management</h4>

- **Typical Framework/Tool(s)**: Linux (mostly Ubuntu or RHEL)

With managed hosting platforms like [Render](https://render.com/) and [AWS](https://aws.amazon.com/), server management these days is mostly out of my hands. However, I started out deploying directly on Linux servers, and I continue to interact with servers via SSH for legacy systems (usually RHEL) or certain personal projects (usually Ubuntu).

[Back to top ⬆️](#experience-by-technical-domain)

---

<h4 id="domain-user">👥 User Management</h4>

- **Typical Framework/Tool(s)**: Keycloak

Nearly every project I've worked on has involved users, and several have required multi-tenancy. [Keycloak](https://www.keycloak.org/) has been a good place for housing users since it's also been my identity provider of choice for several years. I previous company I worked for had 1M+ users in their Keycloak instance, which worked great for them.

Admittedly, Keycloak does not have the most feature-rich user management, but the coupling with authentication and authorization and its extensibility have made it a good fit for most projects. In fact, I fixed one major shortcoming by writing a custom plugin (source code: [\[Custom Keycloak Plugins\]](https://github.com/threatzero-solutions/keycloak-plugins)). Keycloak's REST API for querying user data didn't allow complex queries by user attributes, so my plugin adds an endpoint to do just that. I now have two projects using this endpoint to filter users by organizations, sub-organizations, custom IDs, and more. With that added capability, these projects can manage Keycloak users in-app without having to ever touch the Keycloak admin console.

[Back to top ⬆️](#experience-by-technical-domain)
