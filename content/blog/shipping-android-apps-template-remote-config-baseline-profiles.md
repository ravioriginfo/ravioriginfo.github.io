---
title: "One template, 11 Play Store apps: Remote Config, consent and Baseline Profiles"
description: "The shared foundation behind my Google Play apps: Firebase Remote Config switches, a GDPR consent flow, onboarding, in-app updates and Baseline Profiles for fast startup."
date: 2026-09-30
tags: ["Android", "Firebase", "Google Play", "Performance", "Architecture"]
relatedProjects: ["phone-call", "messages-compose", "gallery-pro", "calendar-2026"]
draft: true
---

I've shipped [11 apps to Google Play](/projects?status=live): dialers, SMS messengers, galleries, a calendar and an alarm clock. They solve very different problems, but they share the same **foundation**. Building that foundation once and reusing it is what makes shipping, and maintaining, that many apps realistic.

This post covers what goes into that shared template, and why.

## 1. Onboarding that respects permissions

Every app starts with the same flow: **splash, language picker, permission screen**. The permission screen matters most. A dialer needs the phone and contacts permissions plus the dialer role; a gallery needs media access (including Android 14's *selected photos only* mode); a calendar needs calendar access and exact alarms.

Users get a short explanation of why each permission is needed, the request is made in context, and the app keeps working (degraded where it must be) if something is denied.

## 2. Remote Config as the control panel

Firebase **Remote Config** drives behaviour that I might need to change without shipping an update:

- whether each ad placement is shown, and on which screens
- feature switches for new or risky code paths
- the content of in-app promotions

In code, every placement gets a pair of values: an ID and a **show flag**. The rule I follow is that a placement is never "half wired". If the constant exists, the matching Remote Config fetch and assignment exist too, otherwise the flag silently never receives a live value. (Ad unit IDs live only in the apps, never anywhere public.)

## 3. Consent first

Apps that show ads to users in regions with privacy regulation need consent **before** ads load. The template uses Google's **User Messaging Platform (UMP)**: request consent info at startup, show the form when required, and only then initialise the ads SDK. Getting this order right is a Play policy requirement, not a nice-to-have.

## 4. Stability and feedback loops

Each app ships with:

- **Firebase Crashlytics** and **Analytics** to find crashes and drop-offs on real devices;
- **Play In-App Updates**, so users on old versions can be moved forward;
- **Play In-App Review** at moments where the user has just succeeded at something.

## 5. Fast startup with Baseline Profiles

Cold start is the first impression. Most of the apps include a `:benchmark` **Macrobenchmark** module that generates **Baseline Profiles**: lists of classes and methods that are compiled ahead of time on install. This noticeably reduces startup jank, especially in Compose-heavy apps where a lot of code runs on the first frame.

## 6. Architecture that scales across apps

Newer apps such as [Messages](/projects/messages-compose), [Gallery](/projects/gallery-pro) and the [PDF editor](/projects/pdf-reader) use **multi-module Clean Architecture**: `domain` for models and use cases, `data` with Room and repositories, `core`/`common` for shared UI and utilities, and feature modules on top. Older apps use a simpler layout. Keeping the template's pieces in their own packages lets either style adopt them.

## Takeaways

- Build the boring parts (onboarding, consent, config, updates, crash reporting) **once**, then reuse them everywhere.
- Remote Config switches are only as good as their wiring. Make "half wired" impossible by convention.
- Baseline Profiles are cheap to add and pay off on every cold start.

See all the apps built on this foundation on the [projects page](/projects).
