---
title: "Writing a replacement phone dialer: InCallService and CallScreeningService"
description: "How a third-party Android dialer takes over calls with InCallService, picks the right incoming-call UI, and blocks spam with CallScreeningService."
date: 2026-10-01
tags: ["Android", "Kotlin", "Telecom", "InCallService", "CallScreeningService"]
relatedProjects: ["phone-call", "contacts-dialer", "phone-caller-contacts"]
draft: false
---

Android lets a third-party app become the **default phone app**. When it does, the system hands it every call: incoming, outgoing, conference. The app is responsible for the whole experience. I've shipped several dialers on Google Play, including [Phone Call](/projects/phone-call) and [Contacts](/projects/contacts-dialer). This post walks through the two framework services that make it possible, and the decisions that matter in practice.

## Becoming the default dialer

The app asks for the dialer role through `RoleManager` (`RoleManager.ROLE_DIALER`) and declares an `InCallService` in its manifest:

```xml
<service
    android:name=".service.AppCallService"
    android:permission="android.permission.BIND_INCALL_SERVICE"
    android:exported="true">
    <meta-data android:name="android.telecom.IN_CALL_SERVICE_UI" android:value="true" />
    <intent-filter>
        <action android:name="android.telecom.InCallService" />
    </intent-filter>
</service>
```

It also handles the `DIAL` / `CALL` intents and `tel:` links, so it can place calls and open from other apps.

## InCallService: every call flows through here

Once the app holds the role, Android's telecom stack binds to the service and calls `onCallAdded(call)` for each new call. Each `android.telecom.Call` then reports state changes through a `Call.Callback`.

A simplified version of what happens when a call arrives:

```kotlin
override fun onCallAdded(call: Call) {
    super.onCallAdded(call)

    // 1. Bookkeeping first, in its own try/catch:
    //    a UI failure later must never lose the call.
    CallManager.onCallAdded(call)
    call.registerCallback(callListener)

    // 2. Then decide how to show it.
    when {
        call.isOutgoing() || shouldShowFullScreen() -> startActivity(CallActivity.intent(this))
        canShowOverlay(call) -> IncomingCallOverlay.show(this, call)
        else -> notifications.showCallNotification(call)
    }
}
```

Two things I learned the hard way are visible in that sketch.

**Separate bookkeeping from UI.** Registering the call and its callback happens first, isolated from everything else. If launching an activity or building a notification throws (and on the long tail of Android devices, it will), the call is still tracked and can still be answered or hung up.

**There isn't one "incoming call screen".** The right UI depends on context:

- **Device locked, or the user prefers it:** a full-screen `CallActivity` that shows over the lock screen.
- **Unlocked, phone in use, overlay permission granted:** a compact floating card, so a call doesn't hijack whatever the user is doing.
- **Otherwise:** a high-priority call notification with *Answer* / *Decline* actions, routed through a `BroadcastReceiver`.

## Audio routing

`onCallAudioStateChanged(CallAudioState)` tells the app where call audio is going: earpiece, speaker, wired headset or Bluetooth. The in-call UI mirrors that state, and the user switches routes with `setAudioRoute(...)`. For Bluetooth, the app connects to the headset profile to show the device's name, which requires the `BLUETOOTH_CONNECT` runtime permission on Android 12+.

## CallScreeningService: blocking before it rings

Spam blocking uses a separate framework service. Android calls `onScreenCall(details)` **before** the phone rings, and the app must reply quickly with a `CallResponse`:

```kotlin
override fun onScreenCall(details: Call.Details) {
    val number = normalize(details.handle?.schemeSpecificPart)

    val response = when {
        isBlocked(number) -> CallResponse.Builder()
            .setDisallowCall(true).setRejectCall(true)
            .setSkipCallLog(true).setSkipNotification(true)   // silently drop
            .build()
        isSpam(number) -> CallResponse.Builder()
            .setDisallowCall(true).setRejectCall(true)
            .setSkipCallLog(false).setSkipNotification(false) // keep a trace
            .build()
        else -> CallResponse.Builder().setDisallowCall(false).build()
    }
    respondToCall(details, response)
}
```

The difference between the two branches is deliberate. **Numbers the user blocked are dropped silently.** **Suspected spam is rejected but still logged**, so a false positive can be noticed and the number unblocked.

The block and spam lists live in **Room**. Two rules matter here: answer fast, and **fail open**. If a lookup throws, the call is allowed. Logging must never be able to block or crash real call screening.

## Takeaways

- Treat `onCallAdded` as critical infrastructure: do the bookkeeping first and isolate the UI.
- Pick the incoming-call UI from context (locked state, foreground use, permissions) instead of always going full-screen.
- In `CallScreeningService`, respond fast and fail open. Choose silent drop vs. logged rejection on purpose.

These patterns power [Phone Call](/projects/phone-call), [Contacts](/projects/contacts-dialer) and [Phone Caller](/projects/phone-caller-contacts), all live on Google Play.
