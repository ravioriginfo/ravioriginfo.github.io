---
title: "Phone Call"
type: "Dialer & Contacts"
status: live
featured: true
order: 20
icon: /images/apps/phone-call.webp
playPackage: com.phonecall.phone.contact.callerdialer
summary: "A replacement default phone dialer with spam blocking, call themes and caller ID."
features:
  - "Full-screen incoming and in-call UI as the default dialer"
  - "Spam detection and number blocking"
  - "Call history, contacts, search and speed dial"
  - "Custom call themes"
  - "Quick-reply SMS and missed-call notification actions"
highlights:
  - "Own InCallService implementation (default dialer role)"
  - "CallScreeningService for spam blocking"
  - "Multi-module Clean Architecture (core / data / domain)"
  - "Next-gen Google Mobile Ads SDK, Baseline Profiles"
tags:
  - "Kotlin"
  - "XML Views"
  - "InCallService"
  - "CallScreeningService"
  - "Room"
  - "Firebase"
  - "AdMob"
  - "Clean Architecture"
screenshots:
  - src: /images/apps/phone-call/1.webp
    alt: "Phone Call screenshot 1"
    width: 720
    height: 405
  - src: /images/apps/phone-call/2.webp
    alt: "Phone Call screenshot 2"
    width: 654
    height: 1280
  - src: /images/apps/phone-call/3.webp
    alt: "Phone Call screenshot 3"
    width: 654
    height: 1280
  - src: /images/apps/phone-call/4.webp
    alt: "Phone Call screenshot 4"
    width: 654
    height: 1280
  - src: /images/apps/phone-call/5.webp
    alt: "Phone Call screenshot 5"
    width: 654
    height: 1280
  - src: /images/apps/phone-call/6.webp
    alt: "Phone Call screenshot 6"
    width: 654
    height: 1280
---

## Overview

A full replacement for the system phone app. Once set as the default dialer, it owns the entire call experience: incoming call screen, in-call controls, call log, contacts and spam protection.

## How it works

- **InCallService** (`AppCallService`) receives every call from Android's telecom stack and drives a full-screen `CallActivity`, including on the lock screen.
- **CallScreeningService** checks incoming numbers against spam and block lists before the phone rings.
- Dial pad, speed dial, call history, contact search, call themes and quick-reply SMS round out the dialer.

## Architecture

Multi-module Clean Architecture (`core` / `data` with Room / `domain` / presentation), the next-gen Google Mobile Ads SDK, Firebase (Analytics, Crashlytics, Remote Config) and a Macrobenchmark module for Baseline Profiles.
