---
title: "Phone Caller - Contacts"
type: "Dialer & Contacts"
status: live
featured: false
order: 70
icon: /images/apps/phone-caller-contacts.webp
playPackage: com.calldialerpro.mobiledialer.phonebookdialer
summary: "A phonebook dialer with full-screen caller ID, speed dial and quick responses."
features:
  - "Default dialer with keypad, history and contacts"
  - "Full-screen caller screen and after-call caller ID"
  - "Speed dial with contact picker"
  - "Block numbers and quick-response SMS"
highlights:
  - "InCallService implementation"
  - "Mixed Java + Kotlin codebase"
  - "Room + RxJava, libphonenumber"
tags:
  - "Kotlin"
  - "Java"
  - "XML Views"
  - "InCallService"
  - "Room"
  - "RxJava"
  - "Firebase"
screenshots:
  - src: /images/apps/phone-caller-contacts/1.webp
    alt: "Phone Caller - Contacts screenshot 1"
    width: 720
    height: 492
  - src: /images/apps/phone-caller-contacts/2.webp
    alt: "Phone Caller - Contacts screenshot 2"
    width: 654
    height: 1280
  - src: /images/apps/phone-caller-contacts/3.webp
    alt: "Phone Caller - Contacts screenshot 3"
    width: 654
    height: 1280
  - src: /images/apps/phone-caller-contacts/4.webp
    alt: "Phone Caller - Contacts screenshot 4"
    width: 654
    height: 1280
  - src: /images/apps/phone-caller-contacts/5.webp
    alt: "Phone Caller - Contacts screenshot 5"
    width: 654
    height: 1280
  - src: /images/apps/phone-caller-contacts/6.webp
    alt: "Phone Caller - Contacts screenshot 6"
    width: 654
    height: 1280
---

## Overview

A phonebook dialer with a full-screen caller screen, after-call caller ID, speed dial and quick-response SMS.

## How it works

An **InCallService** (`CallServiceCaller`) powers the default-dialer experience with a full-screen caller UI. The codebase mixes Java and Kotlin, with Room and RxJava for data and libphonenumber for number handling.
