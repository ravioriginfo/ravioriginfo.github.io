---
title: "Contacts"
type: "Dialer & Contacts"
status: live
featured: false
order: 60
icon: /images/apps/contacts-dialer.webp
playPackage: com.contacts.callerdialer.phonecalldialerapp
developer: "Accura LabApp"
developerUrl: https://play.google.com/store/apps/developer?id=Accura+LabApp
summary: "Contacts manager and default dialer with a custom in-call screen and number blocking."
features:
  - "Contacts list, details, add and edit"
  - "Recent calls with call details"
  - "Custom in-call screen with notification controls"
  - "Number blocking and missed-call actions"
  - "Call-screen wallpapers"
highlights:
  - "InCallService + CallScreeningService"
  - "Bluetooth and audio routing during calls"
  - "Hilt, Room, libphonenumber"
tags:
  - "Kotlin"
  - "XML Views"
  - "InCallService"
  - "CallScreeningService"
  - "Hilt"
  - "Room"
  - "Firebase"
screenshots:
  - src: /images/apps/contacts-dialer/1.webp
    alt: "Contacts screenshot 1"
    width: 720
    height: 405
  - src: /images/apps/contacts-dialer/2.webp
    alt: "Contacts screenshot 2"
    width: 720
    height: 1280
  - src: /images/apps/contacts-dialer/3.webp
    alt: "Contacts screenshot 3"
    width: 720
    height: 1280
  - src: /images/apps/contacts-dialer/4.webp
    alt: "Contacts screenshot 4"
    width: 720
    height: 1280
  - src: /images/apps/contacts-dialer/5.webp
    alt: "Contacts screenshot 5"
    width: 720
    height: 1280
  - src: /images/apps/contacts-dialer/6.webp
    alt: "Contacts screenshot 6"
    width: 720
    height: 1280
---

## Overview

A contacts manager that doubles as the default dialer, with a custom in-call screen, number blocking and call-screen wallpapers.

## How it works

An **InCallService** provides the in-call UI with accept/decline from the notification, Bluetooth and audio routing, while a **CallScreeningService** blocks unwanted numbers. libphonenumber normalises numbers; Hilt and Room back the data layer. It also reacts to SIM changes.
