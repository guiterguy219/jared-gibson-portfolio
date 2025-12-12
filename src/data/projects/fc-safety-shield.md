---
title: "Safety Shield"
sponsor: "FC Safety"
shortDescription: "Multi-tenant SaaS platform for managing safety asset inspections and compliance."
urls:
  landing: "https://shield.fc-safety.com"
images:
  - primary: true
    sm: "/media/projects/safety-shield/command-center-light.png"
    lg: "/media/projects/safety-shield/command-center-light.png"
    alt: "Safety Shield Command Center"
    description: "From the command center, administrators can view compliance metrics across their organization at a glance."
  - sm: "/media/projects/safety-shield/inspection-top-aed-light.png"
    lg: "/media/projects/safety-shield/inspection-top-aed-light.png"
    alt: "Inspecting an AED"
    description: "Inspectors are quickly guided through the inspection process by the mobile-friendly web application."
  - sm: "/media/projects/safety-shield/reorder-first-aid-supplies-light.png"
    lg: "/media/projects/safety-shield/reorder-first-aid-supplies-light.png"
    alt: "Reordering first aid supplies"
    description: "Reordering first aid supplies is a breeze with the mobile-friendly web application."
  - sm: "/media/projects/safety-shield/inspection-routes-light.png"
    lg: "/media/projects/safety-shield/inspection-routes-light.png"
    alt: "Inspection routes"
    description: "Inspection routes guide inspectors from one asset to the next, allowing anyone to easily pick up where the last inspector left off."
  - sm: "/media/projects/safety-shield/clients-overview-light.png"
    lg: "/media/projects/safety-shield/clients-overview-light.png"
    alt: "Clients overview"
    description: "System administrators can manage all clients from a single location."
  - sm: "/media/projects/safety-shield/client-details-light.png"
    lg: "/media/projects/safety-shield/client-details-light.png"
    alt: "Client details"
    description: "System administrators can easily view and manage a client's sites, users, assets, and more."
techStack:
  - name: NestJS
    highlight: true
  - name: React
  - name: React Router 7
    highlight: true
  - name: PostgreSQL
    highlight: true
  - name: Redis
  - name: Render
  - name: AWS
  - name: Prisma
status: "alpha"
lastCommit: "2025-12-09T16:17:00.00000-07:00"
size: "md"
soleDeveloper: true
---

- **Team size:** 1 (sole developer)
- **Build duration:** approx. 9 months (part-time)
- **Owner:** [FC Safety](https://fc-safety.com)

The Safety Shield is a platform that helps companies manage their safety related assets (i.e. AEDs, fire extinguishers, eye wash stations, etc.) and track their compliance.

This platform is multi-tenant, allowing for any number of clients to use the same hosted service. Client data is carefully segregated using Postgres row-level security policies. This makes it easy for global administrators to manage client data from a single location.

The core feature of this platform is the ability to inspect assets on a regular basis and track the results. This is done through the use of a mobile-friendly version of this web application. Managers and supervisors can quickly see the results and be alerted of any compliance issues.
