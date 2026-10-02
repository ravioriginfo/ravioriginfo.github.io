// ─────────────────────────────────────────────────────────────
// All site content lives here — every page reads from this file.
// App icons live in /public/images/apps/ and are referenced as
// '/images/apps/<file>'.
// ─────────────────────────────────────────────────────────────

export const SITE_URL = 'https://ravioriginfo.github.io'

const play = (id) => `https://play.google.com/store/apps/details?id=${id}`

export const profile = {
  name: 'Ravi Sorathiya',
  role: 'Android Developer',
  roles: ['Android Developer', 'Kotlin & Jetpack Compose', 'Shipping apps to Google Play', 'Clean Architecture fan'],
  tagline:
    'I build and ship Android apps people use every day — dialers, SMS messengers, galleries, calendars and a full PDF editor.',
  location: 'India',
  email: 'hello@example.com', // TODO: replace with your real email
  resumeUrl: '', // e.g. '/resume.pdf' after adding the file to /public
  availableForWork: true,
  avatar: '', // e.g. '/images/avatar.jpg' — leave empty to show initials
  shortBio:
    'Android developer working in Kotlin and Jetpack Compose. I have shipped 11 apps to Google Play — from default dialers and SMS clients that take over core phone roles, to media galleries and productivity tools.',
  bio: [
    'I build native Android apps end to end: architecture, UI, background work, monetization and release. Most of my work lives on Google Play, where apps have to be fast, stable and pass strict policy review.',
    'A lot of it sits close to the platform — replacement phone dialers built on InCallService and CallScreeningService, default SMS/MMS messengers, exact-alarm scheduling, home-screen widgets, and media apps that handle Android 14 partial photo access.',
    'Right now I am building a full PDF reader and editor: pdf.js running inside a WebView bridged to Kotlin, with annotation, signatures, in-place text editing, form filling, password lock and a camera document scanner, split across ~15 Clean Architecture modules.',
  ],
}

export const socials = [
  { name: 'GitHub', url: 'https://github.com/ravioriginfo', icon: 'github' },
  // { name: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username', icon: 'linkedin' },
  // { name: 'X', url: 'https://x.com/your-username', icon: 'x' },
]

export const skills = [
  { group: 'Languages', items: ['Kotlin', 'Java', 'JavaScript', 'SQL'] },
  { group: 'Android UI', items: ['Jetpack Compose', 'Material 3', 'XML Views', 'ViewBinding', 'Navigation', 'Lottie'] },
  { group: 'Architecture & DI', items: ['Clean Architecture', 'MVVM', 'Multi-module', 'Hilt', 'Coroutines', 'Flow', 'RxJava'] },
  { group: 'Data & Background', items: ['Room', 'DataStore', 'Realm', 'WorkManager', 'Retrofit', 'Foreground Services'] },
  { group: 'Media & Camera', items: ['Media3 ExoPlayer', 'Coil', 'Glide', 'CameraX', 'OpenCV', 'LiteRT', 'PDFBox', 'pdf.js'] },
  { group: 'Platform & Telephony', items: ['InCallService', 'CallScreeningService', 'Default SMS role', 'App Widgets', 'Exact Alarms', 'Biometric'] },
  { group: 'Firebase & Monetization', items: ['Firebase', 'Remote Config', 'Crashlytics', 'AdMob', 'UMP Consent', 'Play Billing'] },
  { group: 'Tooling & Release', items: ['Gradle KTS', 'Baseline Profiles', 'Macrobenchmark', 'In-app Updates', 'Git'] },
]

export const experience = [
  {
    role: 'Android Developer',
    company: 'Company Name', // TODO: confirm company and dates
    period: '20XX — Present',
    description:
      'Building and maintaining a portfolio of consumer Android apps on Google Play: dialers, SMS messengers, galleries, calendar, alarm clock and utilities.',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase'],
  },
]

export const education = [
  {
    role: 'Degree name', // TODO
    company: 'University Name',
    period: '20XX — 20XX',
    description: 'Add your education here.',
  },
]

export const statuses = {
  live: { label: 'Live on Play', short: 'Live' },
  completed: { label: 'Completed', short: 'Completed' },
  'in-progress': { label: 'In progress', short: 'In progress' },
}

export const projects = [
  // ── In progress ───────────────────────────────────────────
  {
    slug: 'pdf-reader',
    title: 'PDF Reader & Editor',
    type: 'Productivity',
    status: 'in-progress',
    featured: true,
    icon: '/images/apps/pdf-reader.png',
    summary: 'A full PDF reader and editor — annotate, sign, edit text, fill forms, lock, convert and scan.',
    features: [
      'Annotate: text & area highlight, underline, strike-through and freehand ink',
      'Sign documents with a drawn signature you can move, scale and rotate',
      'Edit existing text in place and insert new text blocks',
      'Fill forms and add watermarks',
      'Lock / unlock PDFs with a password',
      'Merge, split, compress and manage pages',
      'Convert image ↔ PDF, PDF → image and PDF ↔ Word',
      'Camera document scanner with edge detection, crop and filters',
    ],
    highlights: [
      'pdf.js running inside a WebView, bridged to Kotlin with custom JS patches',
      '~15 Clean Architecture modules with hand-written dependency injection',
      'OpenCV + LiteRT for on-device document detection, CameraX capture',
      'PDFBox-Android and Apache POI for document processing',
      'Latest toolchain: AGP 9, Kotlin 2.4, Compose BOM 2026, targetSdk 37',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'pdf.js', 'PDFBox', 'OpenCV', 'LiteRT', 'CameraX', 'Room', 'WorkManager', 'Clean Architecture'],
  },

  // ── Live on Google Play ───────────────────────────────────
  {
    slug: 'phone-call',
    title: 'Phone Call',
    type: 'Dialer & Contacts',
    status: 'live',
    featured: true,
    icon: '/images/apps/phone-call.png',
    playUrl: play('com.phonecall.phone.contact.callerdialer'),
    summary: 'A replacement default phone dialer with spam blocking, call themes and caller ID.',
    features: [
      'Full-screen incoming and in-call UI as the default dialer',
      'Spam detection and number blocking',
      'Call history, contacts, search and speed dial',
      'Custom call themes',
      'Quick-reply SMS and missed-call notification actions',
    ],
    highlights: [
      'Own InCallService implementation (default dialer role)',
      'CallScreeningService for spam blocking',
      'Multi-module Clean Architecture (core / data / domain)',
      'Next-gen Google Mobile Ads SDK, Baseline Profiles',
    ],
    tags: ['Kotlin', 'XML Views', 'InCallService', 'CallScreeningService', 'Room', 'Firebase', 'AdMob', 'Clean Architecture'],
  },
  {
    slug: 'messages-compose',
    title: 'Messages',
    type: 'Messaging',
    status: 'live',
    featured: true,
    icon: '/images/apps/messages-compose.webp',
    playUrl: play('com.message.textmessenger.smsapp'),
    summary: 'A modern default SMS & MMS app, rebuilt from the ground up in Jetpack Compose.',
    features: [
      'Default SMS/MMS messaging with group conversations',
      'Scheduled messages and quick reply from notifications',
      'Block numbers, archive threads and swipe actions',
      'Backup & restore, auto-delete old messages',
      'Home-screen widgets and theme picker',
    ],
    highlights: [
      'Compose rewrite of a classic SMS stack',
      'Modules: app / domain / data / common / android-smsmms',
      'Hilt, Room, WorkManager, Media3 for attachments',
      'GDPR consent flow and Baseline Profile benchmarks',
    ],
    basedOn: 'QKSMS',
    tags: ['Kotlin', 'Jetpack Compose', 'Default SMS role', 'Hilt', 'Room', 'WorkManager', 'Media3 ExoPlayer', 'Firebase'],
  },
  {
    slug: 'gallery-pro',
    title: 'Gallery - Photo Gallery',
    type: 'Gallery & Media',
    status: 'live',
    featured: true,
    icon: '/images/apps/gallery-pro.webp',
    playUrl: play('com.gallery.picturegalleryapp.gallerypro'),
    summary: 'A fast Compose gallery with timeline, albums, search, editor and a system photo picker.',
    features: [
      'Timeline and album views with pinch-to-zoom grid',
      'Favorites, trash and hidden albums',
      'Smart search and EXIF / location info',
      'Built-in photo editor with crop',
      'Works as a photo/video picker for other apps',
    ],
    highlights: [
      'Jetpack Compose with window-size classes for tablets',
      'Hilt + Room + DataStore, data / domain / presentation layers',
      'Coil 3, Sketch and Telephoto for zoomable media',
      'Media3 ExoPlayer video playback',
    ],
    basedOn: 'Gallery (IacobIonut01)',
    tags: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'DataStore', 'Coil', 'Media3 ExoPlayer', 'Baseline Profiles'],
  },
  {
    slug: 'messages-sms',
    title: 'Messages - SMS Messenger',
    type: 'Messaging',
    status: 'live',
    icon: '/images/apps/messages-sms.png',
    playUrl: play('com.messages.smsmessenger.textmessage.messenger'),
    summary: 'A default SMS & MMS messenger with scheduling, blocking, backups and caller ID.',
    features: [
      'Default SMS/MMS app with quick reply',
      'Scheduled sends, archive and blocking',
      'Backup & restore and home-screen widgets',
      'Caller-ID screen during and after calls',
    ],
    highlights: [
      'Realm + RxJava + Conductor architecture',
      'Multi-module: business / datasource / shared / sms-mms',
      'Hilt dependency injection, Media3 for attachments',
    ],
    basedOn: 'QKSMS',
    variants: 'Maintained in two variants (update track and a redesigned V2 targeting SDK 36).',
    tags: ['Kotlin', 'XML Views', 'Default SMS role', 'Hilt', 'Realm', 'RxJava', 'Firebase', 'AdMob'],
  },
  {
    slug: 'contacts-dialer',
    title: 'Contacts',
    type: 'Dialer & Contacts',
    status: 'live',
    icon: '/images/apps/contacts-dialer.png',
    playUrl: play('com.contacts.callerdialer.phonecalldialerapp'),
    summary: 'Contacts manager and default dialer with a custom in-call screen and number blocking.',
    features: [
      'Contacts list, details, add and edit',
      'Recent calls with call details',
      'Custom in-call screen with notification controls',
      'Number blocking and missed-call actions',
      'Call-screen wallpapers',
    ],
    highlights: [
      'InCallService + CallScreeningService',
      'Bluetooth and audio routing during calls',
      'Hilt, Room, libphonenumber',
    ],
    tags: ['Kotlin', 'XML Views', 'InCallService', 'CallScreeningService', 'Hilt', 'Room', 'Firebase'],
  },
  {
    slug: 'phone-caller-contacts',
    title: 'Phone Caller - Contacts',
    type: 'Dialer & Contacts',
    status: 'live',
    icon: '/images/apps/phone-caller-contacts.png',
    playUrl: play('com.calldialerpro.mobiledialer.phonebookdialer'),
    summary: 'A phonebook dialer with full-screen caller ID, speed dial and quick responses.',
    features: [
      'Default dialer with keypad, history and contacts',
      'Full-screen caller screen and after-call caller ID',
      'Speed dial with contact picker',
      'Block numbers and quick-response SMS',
    ],
    highlights: ['InCallService implementation', 'Mixed Java + Kotlin codebase', 'Room + RxJava, libphonenumber'],
    tags: ['Kotlin', 'Java', 'XML Views', 'InCallService', 'Room', 'RxJava', 'Firebase'],
  },
  {
    slug: 'gallery-photo-album',
    title: 'Gallery - Photo Album',
    type: 'Gallery & Media',
    status: 'live',
    icon: '/images/apps/gallery-photo-album.png',
    playUrl: play('com.albumgallery.imagegallery.photogallery'),
    summary: 'Photo & video gallery with albums, zoomable viewer, video player and crop tools.',
    features: [
      'Photos and videos organised into albums',
      'Zoomable image viewer and video player',
      'Crop, rotate and set as wallpaper',
      'Open-with and share target for media',
    ],
    highlights: [
      'Jetpack Compose + Material 3, Clean Architecture',
      'Android 14 partial (selected photos) access support',
      'Coil 3, Media3 ExoPlayer, GDPR consent with UMP',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Coil', 'Media3 ExoPlayer', 'UMP Consent'],
  },
  {
    slug: 'gallery-locker',
    title: 'Gallery - Private Gallery',
    type: 'Gallery & Media',
    status: 'live',
    icon: '/images/apps/gallery-locker.png',
    playUrl: play('com.photogallery.gallery.privategallery'),
    summary: 'Gallery with a private vault locked by pattern or biometrics, editor and recycle bin.',
    features: [
      'Hide photos and videos in a private vault',
      'Pattern and fingerprint / face unlock',
      'Photo editor with filters and crop',
      'Recycle bin, themes and premium upgrade',
    ],
    highlights: ['AndroidX Biometric', 'Play Billing for premium', 'WorkManager background media loading'],
    tags: ['Kotlin', 'XML Views', 'Biometric', 'Play Billing', 'Room', 'WorkManager', 'Glide'],
  },
  {
    slug: 'calendar-2026',
    title: 'Calendar 2026',
    type: 'Productivity',
    status: 'live',
    icon: '/images/apps/calendar-2026.png',
    playUrl: play('com.calendar.sscalendar.holidaycalendar'),
    summary: 'Holiday calendar with events, reminders and home-screen widgets.',
    features: [
      'Month calendar with national holidays by country',
      'Add, edit and search events',
      'Event reminders as notifications',
      'Syncs with the device calendar',
      'Month grid and event list widgets',
    ],
    highlights: [
      'Interactive App Widgets with month navigation',
      'Exact alarms for reminders',
      'Handles time-zone, locale and reboot changes',
    ],
    tags: ['Java', 'Kotlin', 'XML Views', 'App Widgets', 'Exact Alarms', 'Firebase'],
  },
  {
    slug: 'alarm-clock',
    title: 'Alarm Clock',
    type: 'Productivity',
    status: 'live',
    icon: '/images/apps/alarm-clock.png',
    playUrl: play('com.alarmclock.simplealarm.alarmapp'),
    summary: 'Alarm clock with wake-up challenges, timer, stopwatch, reminders and sleep sounds.',
    features: [
      'Alarms with dismiss tasks: math, memory game, retype text',
      'Full-screen alarm over the lock screen with snooze',
      'Timer and stopwatch',
      'Reminders, bedtime and sleep music',
      'World clock and themes',
    ],
    highlights: [
      'Exact alarm scheduling restored after reboot',
      'Dedicated foreground services for alarm, timer and stopwatch',
      'Room, Media3 ExoPlayer for alarm sounds',
    ],
    tags: ['Kotlin', 'XML Views', 'Exact Alarms', 'Foreground Services', 'Room', 'Media3 ExoPlayer'],
  },
  {
    slug: 'messenger-all-social',
    title: 'Messenger - All Social Apps',
    type: 'Social',
    status: 'live',
    icon: '/images/apps/messenger-all-social.webp',
    playUrl: play('com.allmessages.messengerapp.allinonesocialmediaapps'),
    summary: 'One hub to open your social, messaging and shopping sites in a lightweight in-app browser.',
    features: [
      'Quick access to Facebook, Instagram, Telegram, Discord, LinkedIn and more',
      'Lightweight in-app WebView for each service',
      'Persistent quick-launch notification',
    ],
    highlights: ['Jetpack Compose + Navigation', 'Room + DataStore for saved apps', 'Minimal permissions (no SMS / telephony)'],
    tags: ['Kotlin', 'Jetpack Compose', 'Room', 'DataStore', 'WorkManager', 'Firebase'],
  },

  // ── Completed (not published) ─────────────────────────────



  {
    slug: 'voice-recorder',
    title: 'Voice Recorder',
    type: 'Productivity',
    status: 'completed',
    icon: '/images/apps/voice-recorder.png',
    summary: 'Audio recorder with a live waveform, recordings library and built-in player.',
    features: ['Record audio with a live waveform', 'Recordings list and player', 'Share recordings', 'After-call caller screen'],
    highlights: ['Room for recordings metadata', 'FileProvider sharing'],
    tags: ['Kotlin', 'XML Views', 'Room', 'Firebase'],
  },

]

export const types = [...new Set(projects.map((p) => p.type))]

export const stats = [
  { label: 'Apps live on Google Play', value: projects.filter((p) => p.status === 'live').length },
  { label: 'Android projects built', value: projects.length },
  { label: 'Technologies used', value: new Set(projects.flatMap((p) => p.tags)).size },
]

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
