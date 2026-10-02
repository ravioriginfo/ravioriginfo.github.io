---
title: "Messages"
type: "Messaging"
status: live
featured: true
order: 30
icon: /images/apps/messages-compose.webp
playPackage: com.message.textmessenger.smsapp
summary: "A modern default SMS & MMS app, rebuilt from the ground up in Jetpack Compose."
features:
  - "Default SMS/MMS messaging with group conversations"
  - "Scheduled messages and quick reply from notifications"
  - "Block numbers, archive threads and swipe actions"
  - "Backup & restore, auto-delete old messages"
  - "Home-screen widgets and theme picker"
highlights:
  - "Compose rewrite of a classic SMS stack"
  - "Modules: app / domain / data / common / android-smsmms"
  - "Hilt, Room, WorkManager, Media3 for attachments"
  - "GDPR consent flow and Baseline Profile benchmarks"
tags:
  - "Kotlin"
  - "Jetpack Compose"
  - "Default SMS role"
  - "Hilt"
  - "Room"
  - "WorkManager"
  - "Media3 ExoPlayer"
  - "Firebase"
basedOn: "QKSMS"
screenshots:
  - src: /images/apps/messages-compose/1.webp
    alt: "Messages screenshot 1"
    width: 720
    height: 626
  - src: /images/apps/messages-compose/2.webp
    alt: "Messages screenshot 2"
    width: 720
    height: 1280
  - src: /images/apps/messages-compose/3.webp
    alt: "Messages screenshot 3"
    width: 720
    height: 1280
  - src: /images/apps/messages-compose/4.webp
    alt: "Messages screenshot 4"
    width: 720
    height: 1280
  - src: /images/apps/messages-compose/5.webp
    alt: "Messages screenshot 5"
    width: 720
    height: 1280
  - src: /images/apps/messages-compose/6.webp
    alt: "Messages screenshot 6"
    width: 720
    height: 1280
---

## Overview

A complete default SMS & MMS app, rebuilt from the ground up in **Jetpack Compose**.

## How it works

As the default SMS app it handles the `sms:`, `smsto:` and `mms:` schemes, the headless "respond via message" service and the default-SMS-changed broadcast. On top of messaging it adds scheduled messages, blocking, archive, swipe actions, backup & restore, auto-delete, quick reply from notifications and home-screen widgets.

## Architecture

Separate `app`, `domain`, `data`, `common` and `android-smsmms` modules, with Hilt, Room, WorkManager and Media3 for attachments. A GDPR consent flow and a Baseline Profile benchmark module are included. The messaging core builds on the open-source QKSMS project.
