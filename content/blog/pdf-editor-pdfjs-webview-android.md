---
title: "Building a PDF editor on Android with pdf.js inside a WebView"
description: "Why my Android PDF editor runs pdf.js in a WebView bridged to Kotlin, and the lessons from building signatures, text editing and form filling on top of it."
date: 2026-10-02
tags: ["Android", "Kotlin", "Jetpack Compose", "pdf.js", "WebView"]
relatedProjects: ["pdf-reader"]
draft: false
---

Most Android PDF apps pick one of two paths: render pages with the platform `PdfRenderer` (view-only), or license a commercial SDK. For my [PDF Reader & Editor](/projects/pdf-reader) I took a third route: **pdf.js running inside a WebView, bridged to Kotlin and driven by a Jetpack Compose UI.**

This post covers how that bridge is structured, and the hard-won lessons from building real editing features on top of it.

## Why pdf.js in a WebView?

pdf.js is Mozilla's PDF engine, the one inside Firefox. Besides rendering, it ships an **annotation editor layer** (ink, highlight, free text, stamps) and solid text-layer support. Running it in a WebView gives a native app:

- a mature, battle-tested renderer and text layer;
- an existing editor model to extend, instead of writing one from scratch;
- full control over the JavaScript, because the code is vendored into the app's assets.

The trade-off is that the most important part of the app is now **a JavaScript program talking to Kotlin through a narrow bridge**, which shapes everything else.

## The architecture

The project is split into roughly 15 Clean Architecture modules. The parts that matter here:

| Module | Role |
| --- | --- |
| `presentation:libs:pdfjs` | A vendored fork of an open-source pdf.js Android wrapper: the Kotlin `PdfViewer`, a `@JavascriptInterface` bridge, plus the pdf.js assets |
| `presentation:pdf` | The editor feature: Compose UI, tool state, every editor screen |
| `presentation:libs:tools` | Document operations (merge, split, compress, lock/unlock, watermark, conversions) with PDFBox-Android and Apache POI |
| `domain` / `data` | Models, use-case `*Action` classes, Room repositories |

Screens follow a **State / Action / Event** pattern: a ViewModel exposes a `StateFlow` of screen state and a `SharedFlow` of one-shot events, and the Compose UI dispatches sealed actions back to it. The editor works in one of several modes:

```kotlin
enum class EditorMode { EDIT, ANNOTATE, SIGN, FILL_OUT, WATERMARK }
```

Each mode toggles behaviour on the JavaScript side. Nearly all custom editor behaviour lives in a couple of helper scripts (`helper_methods.js`, `helper_main.js`) that patch the vendored pdf.js core.

## Lesson 1: the fork is not upstream

The vendored `pdf.mjs` has diverged from upstream pdf.js, and upstream docs can be confidently wrong about it. A few examples from this codebase:

- `uiManager.getActiveEditor()` doesn't exist. The fork exposes `firstSelectedEditor` / `getActive()` instead.
- `layer.pasteEditor()` doesn't return the editor it creates. `layer.createAndAddNewEditor(...)` does.
- A freshly created **stamp editor decodes its bitmap asynchronously**. Code that saves immediately after creating a stamp must wait for the canvas to exist, or the stamp silently disappears from the saved file.

The rule I settled on: **read the actual `pdf.mjs` source before relying on any API.** Never assume it from documentation.

## Lesson 2: measure, don't recompute

Signatures and images are placed as stamps that the user can **move, scale and rotate** before they're flattened into the page on save. My first versions recomputed the final position mathematically from the stored rotation and scale: page fractions, CSS transforms and trigonometry. It kept drifting by a few pixels, more on rotated pages.

What finally worked was the opposite: **measure what's actually rendered** with `getBoundingClientRect()`, convert that box to page-fraction coordinates, and treat it as the source of truth when baking the stamp into the PDF. When there's a visual answer on screen, trust it over re-derived maths.

## Lesson 3: debug the live WebView

Several "this should work" fixes based on reading the JavaScript turned out wrong on a real device. What changed the pace was debugging the **live** WebView:

1. Find the app's WebView DevTools socket with `adb shell cat /proc/net/unix | grep webview`.
2. Forward it: `adb forward tcp:9222 localabstract:webview_devtools_remote_<pid>`.
3. Drive it from a tiny Node WebSocket client and call `Runtime.evaluate` against the real page.

That lets you inspect real geometry, call app functions and even **live-patch a JS function** to test a fix, all without a rebuild-and-install cycle. I reserve full rebuilds for changes that touch Kotlin or need real touch input.

## Beyond the viewer

Around the editor sit the "document toolbox" features:

- merge, split and compress (PDFBox-Android)
- password lock and unlock
- watermarks
- image ↔ PDF and PDF ↔ Word conversion (Apache POI)
- a camera **document scanner**: CameraX capture, with OpenCV plus a LiteRT model for on-device edge detection and perspective correction

## Takeaways

- A WebView engine can be the right call for a complex document editor. Treat the JS side as first-class code with its own conventions.
- Vendored libraries drift. The source is the documentation.
- For geometry, measure the rendered result instead of re-deriving it.
- Live WebView debugging over CDP is a superpower for hybrid apps.

The app is still in active development. See the [project page](/projects/pdf-reader) for the full feature list.
