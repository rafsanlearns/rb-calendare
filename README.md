# RB Calendar

**By Rafsan**

A beautiful, modern multi-country calendar Progressive Web App (PWA) with support for **Gregorian**, **Bangla (Bengali)**, and **Hijri (Arabic)** dates.

## Features

- **Time range**: 2014 – 2060 (select any year)
- **Views**: Month (primary), Year overview, Holidays Chart, and placeholders for Week / Day / Schedule
- **Bangladesh special**: Shows English + Bangla + Hijri dates together on every day (like traditional wall calendars)
- **Other countries**: Clean Gregorian view with local holidays
- **Country selector** with search (Bangladesh, USA, India, UK, Saudi Arabia, UAE, Pakistan, Canada, Australia, Japan and more can be added)
- **11 languages**: English (main) + বাংলা, العربية, हिन्दी, Español, Français, 中文, 日本語, Deutsch, Português, Русский  
  UI text changes with language; app name "RB" stays in English.
- **Annual Holidays Chart**: Easy-to-read list of public holidays for the selected country & year
- **Works Offline**: Installable as PWA on mobile and desktop. Service Worker caches core files.
- **Beautiful dark theme** with soft gradients and moon-inspired logo
- **Auto “Today”** based on device local time
- Ready for GitHub Pages or any static host

## Logo

Crescent moon with “RB” and “By Rafsan” underneath.

## How to Use / Install

### Online (any browser)
1. Open `index.html` or host the folder.
2. Select country from the side menu.
3. Change language if desired.
4. Navigate months/years. Tap a day for details.

### Install as App (PWA)
- **Android / Chrome**: Open the site → menu → “Add to Home screen” / “Install app”
- **iOS Safari**: Share → “Add to Home Screen”
- **Desktop Chrome/Edge**: Install icon in address bar

Once installed it works offline for core calendar functions.

## Project Structure

```
RB-Calendar/
├── index.html
├── manifest.json
├── sw.js                 # Service Worker for offline
├── css/styles.css
├── js/
│   ├── app.js            # Main logic
│   ├── calendars.js      # Bangla & Hijri conversion
│   ├── holidays.js       # Holiday data (extendable)
│   └── i18n.js           # Translations
├── assets/logo.jpg
└── README.md
```

## Extending Holidays

Edit `js/holidays.js`. Add more years under `years` or more countries.  
Moon-dependent Islamic holidays are approximate; for production you can add an online refresh when the device is online.

## Bangla & Hijri Accuracy

- **Bangla**: Uses the revised Bangladesh calendar rules (Boishakh ≈ 14 April). Good for display purposes 2014–2060.
- **Hijri**: Tabular/arithmetic approximation. Actual religious dates may vary by ±1 day depending on moon sighting. Suitable for general calendar use.

## License

Free to use, modify, and share. Created for educational and personal use.

**RB Calendar • By Rafsan • 2026**
