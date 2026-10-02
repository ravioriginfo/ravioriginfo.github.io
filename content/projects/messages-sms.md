---
title: "Messages - SMS Messenger"
type: "Messaging"
status: live
featured: false
order: 50
icon: /images/apps/messages-sms.webp
playPackage: com.messages.smsmessenger.textmessage.messenger
summary: "A default SMS & MMS messenger with scheduling, blocking, backups and caller ID."
features:
  - "Default SMS/MMS app with quick reply"
  - "Scheduled sends, archive and blocking"
  - "Backup & restore and home-screen widgets"
  - "Caller-ID screen during and after calls"
highlights:
  - "Realm + RxJava + Conductor architecture"
  - "Multi-module: business / datasource / shared / sms-mms"
  - "Hilt dependency injection, Media3 for attachments"
tags:
  - "Kotlin"
  - "XML Views"
  - "Default SMS role"
  - "Hilt"
  - "Realm"
  - "RxJava"
  - "Firebase"
  - "AdMob"
basedOn: "QKSMS"
variants: "Maintained in two variants (update track and a redesigned V2 targeting SDK 36)."
screenshots:
  - src: /images/apps/messages-sms/1.webp
    alt: "Messages - SMS Messenger screenshot 1"
    width: 654
    height: 1280
  - src: /images/apps/messages-sms/2.webp
    alt: "Messages - SMS Messenger screenshot 2"
    width: 654
    height: 1280
  - src: /images/apps/messages-sms/3.webp
    alt: "Messages - SMS Messenger screenshot 3"
    width: 654
    height: 1280
  - src: /images/apps/messages-sms/4.webp
    alt: "Messages - SMS Messenger screenshot 4"
    width: 654
    height: 1280
  - src: /images/apps/messages-sms/5.webp
    alt: "Messages - SMS Messenger screenshot 5"
    width: 654
    height: 1280
  - src: /images/apps/messages-sms/6.webp
    alt: "Messages - SMS Messenger screenshot 6"
    width: 654
    height: 1280
---

## Overview

A default SMS & MMS messenger with scheduling, blocking, backups, widgets and a caller-ID screen during and after calls.

## How it works

The classic QKSMS-style stack (Realm, RxJava, Conductor) split into `business`, `datasource`, `shared` and `sms-mms` modules, with Hilt for dependency injection and Media3 for attachments. Phone-state receivers show caller ID around calls.

## Variants

Maintained as two variants: an update track and a redesigned V2 targeting SDK 36 with refreshed ads and remote-config handling.
