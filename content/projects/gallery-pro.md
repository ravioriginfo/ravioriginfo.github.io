---
title: "Gallery - Photo Gallery"
type: "Gallery & Media"
status: live
featured: true
order: 40
icon: /images/apps/gallery-pro.webp
playPackage: com.gallery.picturegalleryapp.gallerypro
developer: "Video Player & Media Player"
developerUrl: https://play.google.com/store/apps/developer?id=Video+Player+%26+Media+Player
summary: "A fast Compose gallery with timeline, albums, search, editor and a system photo picker."
features:
  - "Timeline and album views with pinch-to-zoom grid"
  - "Favorites, trash and hidden albums"
  - "Smart search and EXIF / location info"
  - "Built-in photo editor with crop"
  - "Works as a photo/video picker for other apps"
highlights:
  - "Jetpack Compose with window-size classes for tablets"
  - "Hilt + Room + DataStore, data / domain / presentation layers"
  - "Coil 3, Sketch and Telephoto for zoomable media"
  - "Media3 ExoPlayer video playback"
tags:
  - "Kotlin"
  - "Jetpack Compose"
  - "Hilt"
  - "Room"
  - "DataStore"
  - "Coil"
  - "Media3 ExoPlayer"
  - "Baseline Profiles"
basedOn: "Gallery (IacobIonut01)"
screenshots:
  - src: /images/apps/gallery-pro/1.webp
    alt: "Gallery - Photo Gallery screenshot 1"
    width: 720
    height: 1280
  - src: /images/apps/gallery-pro/2.webp
    alt: "Gallery - Photo Gallery screenshot 2"
    width: 720
    height: 1280
  - src: /images/apps/gallery-pro/3.webp
    alt: "Gallery - Photo Gallery screenshot 3"
    width: 720
    height: 1280
  - src: /images/apps/gallery-pro/4.webp
    alt: "Gallery - Photo Gallery screenshot 4"
    width: 720
    height: 1280
  - src: /images/apps/gallery-pro/5.webp
    alt: "Gallery - Photo Gallery screenshot 5"
    width: 720
    height: 1280
  - src: /images/apps/gallery-pro/6.webp
    alt: "Gallery - Photo Gallery screenshot 6"
    width: 720
    height: 1280
---

## Overview

A fast photo & video gallery in Jetpack Compose with a timeline, albums, favorites, trash, search and a built-in editor. It can also act as the system photo picker for other apps.

## How it works

- Timeline and album grids with pinch-to-zoom, window-size classes for tablets and foldables.
- Coil 3, Sketch and Telephoto power smooth, zoomable media; Media3 ExoPlayer plays videos.
- Handles `PICK` / `GET_CONTENT` intents so other apps can use it to choose photos, and opens images from other apps in a standalone viewer.
- EXIF and location details, plus fuzzy search.

## Architecture

Hilt, Room and DataStore, organised into data / domain (use cases) / presentation layers. Built on the open-source Gallery project by IacobIonut01, extended and rebranded.
