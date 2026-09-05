# Globewatch

A single-page "world operations deck" that brings flights, ships, road traffic
and population onto one live-feeling dashboard.

**[Live data note]** This is a front-end demo built with static/mock data —
there is no backend and no real API calls. It's meant as a working starting
point / UI reference, not a production tracker.

## What's inside

- **Flights** — a mock list of routes with altitude and speed, animated along
  arcs on the map.
- **Ships** — a mock list of vessels, flags and cargo, animated along shipping
  lanes.
- **Road traffic** — congestion levels for a handful of major cities, shown as
  bars and as colored map nodes.
- **Population** — per-country population figures that count up/down in real
  time based on illustrative growth-rate estimates, plus a world-total ticker.

## Running it

No build step — it's plain HTML/CSS/JS.

```bash
# just open it directly
open index.html

# or serve it locally (recommended, avoids browser file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — markup + all styling
- `data.js` — the mock dataset (cities, flights, ships, traffic, population)
- `app.js` — map rendering, tab switching, live counters

## Wiring in real data

To turn this into a real tracker you'd swap `data.js` for live calls to:

- **Flights** — [Flightradar24](https://www.flightradar24.com/) or
  [FlightAware](https://www.flightaware.com/) APIs
- **Ships** — [MarineTraffic](https://www.marinetraffic.com/) or
  [VesselFinder](https://www.vesselfinder.com/) APIs
- **Road traffic** — Google Maps / Waze traffic APIs
- **Population** — [World Bank](https://data.worldbank.org/) or
  [UN Population Division](https://population.un.org/) open data

Each of those has its own rate limits, auth, and (for flights/ships) usually a
paid tier for real-time data, so plan for a small backend/proxy to hold API
keys rather than calling them from the browser.

## License

MIT — do whatever you like with it.
