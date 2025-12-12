---
title: "BYU Library Internal Projects"
sponsor: "BYU"
shortDescription: "Internal tools and applications developed for the BYU Library to serve thousands of students and faculty."
urls:
  landing: "https://lib.byu.edu"
images:
  - primary: true
    sm: "/media/projects/byu-library-internal-projects/byu-campus.webp"
    lg: "/media/projects/byu-library-internal-projects/byu-campus.webp"
    alt: "BYU Campus"
    description: "The library is the heart of the BYU campus and builds and supports many web services to safely provide access to its resources."
techStack:
  - name: Angular
    highlight: true
  - name: Django
    highlight: true
  - name: Spring Boot
    highlight: true
  - name: Kubernetes
    highlight: true
  - name: PostgreSQL
  - name: PHP
  - name: GitLab CI/CD
status: "stable"
lastCommit: "2024-10-01T14:00:00.00000-06:00"
size: "lg"
---

- **Team size:** 7
- **Build duration:** approx. 3 years (full-time)
- **Owner:** [BYU](https://byu.edu)

> **🤩 Manager Praise** –
>
> Jared was a workhorse. He worked really hard and accomplished a lot.
>
> He was very self-motivated. He genuninely wanted to do good work and was interested in learning. I never had to remind him to stay on task.
>
> He was an exceptional problem solver. I knew no matter what I sent him, he'd figure it out.
>
> He was able to handle large scale projects, no problem...
>
> He was never afraid to learn new things. In fact, he yearned for it. He learned and became proficient in our entire stack.

As a software engineer at the BYU Library, I had the opportunity to be involved in many internal projects, several of which I was the principal developer. Here I was stretched to learn and become proficient in Python/Django, Java/Spring Boot, and TypeScript/Angular, along with supporting tools (i.e. Docker/K8S, PostgreSQL, Linux VMs).

In the library, we placed a very high priority on stable, robust services. That meant:

- 🤖 Comprehensive automated testing
- 🔍 Thorough code reviews
- 🏭 Review and staging environments
- ⚙️ Detailed rollout and rollback plans
- 🔥 Disaster drills
- 💾 Redundancy and backups

We practiced the above with every application we built and supported. Here are brief descriptions of some of the top projects I had ownership of:

1. **StaffLoad:** Add-on to third-party catalog for provisioning staff accounts and privileges. Consisted of Django backend and Angular frontend and had a special focus on usability.
2. **Person:** A Django backend that provided a library specific API for accessing campus person data, with a special focus on performance.
3. **My Account:** An Angular frontend that connected to various APIs to provide a one-stop experience for patrons to manage account resources (i.e. active and historic checkouts, saved items, preferences, and more.)
