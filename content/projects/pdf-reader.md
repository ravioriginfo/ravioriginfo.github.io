---
title: "PDF Reader & Editor"
type: "Productivity"
status: in-progress
featured: true
order: 10
icon: /images/apps/pdf-reader.webp
summary: "A full PDF reader and editor — annotate, sign, edit text, fill forms, lock, convert and scan."
features:
  - "Annotate: text & area highlight, underline, strike-through and freehand ink"
  - "Sign documents with a drawn signature you can move, scale and rotate"
  - "Edit existing text in place and insert new text blocks"
  - "Fill forms and add watermarks"
  - "Lock / unlock PDFs with a password"
  - "Merge, split, compress and manage pages"
  - "Convert image ↔ PDF, PDF → image and PDF ↔ Word"
  - "Camera document scanner with edge detection, crop and filters"
highlights:
  - "pdf.js running inside a WebView, bridged to Kotlin with custom JS patches"
  - "~15 Clean Architecture modules with hand-written dependency injection"
  - "OpenCV + LiteRT for on-device document detection, CameraX capture"
  - "PDFBox-Android and Apache POI for document processing"
  - "Latest toolchain: AGP 9, Kotlin 2.4, Compose BOM 2026, targetSdk 37"
tags:
  - "Kotlin"
  - "Jetpack Compose"
  - "pdf.js"
  - "PDFBox"
  - "OpenCV"
  - "LiteRT"
  - "CameraX"
  - "Room"
  - "WorkManager"
  - "Clean Architecture"
---

## Overview

A native Android PDF reader **and** editor. It goes well beyond viewing: you can annotate, sign, rewrite text in place, fill forms, protect files with a password, convert between formats and scan paper documents with the camera.

## How it works

Rendering and most of the editing run on **pdf.js inside an Android WebView**, bridged to Kotlin. Editor modes (`EDIT`, `ANNOTATE`, `SIGN`, `FILL_OUT`, `WATERMARK`) are driven from Compose UI, and custom JavaScript patches on top of the pdf.js wrapper handle in-place text replacement (mask and outline layers), stamps and flattening on save.

- **Signatures**: drawn on a Compose signature pad (undo, width, colour), then placed as a stamp you can move, scale and rotate before it's flattened into the page.
- **Document tools**: PDFBox-Android handles merge, split, compress and page management; Apache POI powers Word conversion.
- **Scanner**: CameraX capture with OpenCV and LiteRT for on-device edge detection, then crop and filters before building the PDF.

## Architecture

Around 15 Clean Architecture modules with hand-written dependency injection (no Hilt), State/Action/Event screens, and a bleeding-edge toolchain (AGP 9, Kotlin 2.4 with context parameters, Compose BOM 2026, targetSdk 37).

## Status

In active development: editor UX, signatures and text editing are being refined.
