/* Globewatch — demo dataset.
   Coordinates are approximate city centres projected with a simple
   equirectangular formula (x = (lon+180)/360*1000, y = (90-lat)/180*500).
   All flight/ship/traffic/population figures are illustrative for this demo. */

const LOCATIONS = [
  { id: "nyc", name: "New York",      country: "United States",     x: 294, y: 137 },
  { id: "lon", name: "London",        country: "United Kingdom",    x: 500, y: 107 },
  { id: "dxb", name: "Dubai",         country: "United Arab Emirates", x: 654, y: 180 },
  { id: "sin", name: "Singapore",     country: "Singapore",         x: 788, y: 246 },
  { id: "tyo", name: "Tokyo",         country: "Japan",             x: 888, y: 151 },
  { id: "syd", name: "Sydney",        country: "Australia",         x: 920, y: 344 },
  { id: "gru", name: "São Paulo",     country: "Brazil",            x: 371, y: 315 },
  { id: "los", name: "Lagos",         country: "Nigeria",           x: 509, y: 232 },
  { id: "bom", name: "Mumbai",        country: "India",             x: 702, y: 197 },
  { id: "sha", name: "Shanghai",      country: "China",             x: 838, y: 163 },
  { id: "lax", name: "Los Angeles",   country: "United States",     x: 172, y: 156 },
  { id: "mow", name: "Moscow",        country: "Russia",            x: 604, y: 95  },
  { id: "cai", name: "Cairo",         country: "Egypt",             x: 587, y: 167 },
  { id: "jnb", name: "Johannesburg",  country: "South Africa",      x: 578, y: 323 },
  { id: "pek", name: "Beijing",       country: "China",             x: 822, y: 139 },
  { id: "del", name: "Delhi",         country: "India",             x: 714, y: 171 },
  { id: "dac", name: "Dhaka",         country: "Bangladesh",        x: 751, y: 184 },
  { id: "khi", name: "Karachi",       country: "Pakistan",          x: 686, y: 181 },
  { id: "mex", name: "Mexico City",   country: "Mexico",            x: 225, y: 196 },
  { id: "jkt", name: "Jakarta",       country: "Indonesia",         x: 796, y: 267 },
];

const FLIGHTS = [
  { id: "BA178", from: "nyc", to: "lon", alt: "38,000 ft", speed: "910 km/h", dur: 16 },
  { id: "EK008", from: "lon", to: "dxb", alt: "40,000 ft", speed: "930 km/h", dur: 20 },
  { id: "SQ495", from: "dxb", to: "sin", alt: "39,500 ft", speed: "895 km/h", dur: 22 },
  { id: "NH912", from: "sin", to: "tyo", alt: "37,000 ft", speed: "870 km/h", dur: 18 },
  { id: "JL61",  from: "tyo", to: "lax", alt: "41,000 ft", speed: "955 km/h", dur: 24 },
  { id: "AA12",  from: "lax", to: "nyc", alt: "36,500 ft", speed: "880 km/h", dur: 15 },
  { id: "TP84",  from: "gru", to: "los", alt: "38,200 ft", speed: "860 km/h", dur: 17 },
  { id: "SU532", from: "mow", to: "dxb", alt: "34,800 ft", speed: "845 km/h", dur: 14 },
  { id: "MS762", from: "cai", to: "bom", alt: "37,600 ft", speed: "875 km/h", dur: 15 },
  { id: "BA57",  from: "jnb", to: "lon", alt: "39,000 ft", speed: "905 km/h", dur: 19 },
];

const SHIPS = [
  { id: "Ever Forward",   flag: "Panama",           from: "sha", to: "lax", cargo: "Containers",   dur: 46 },
  { id: "Gulf Voyager",   flag: "Marshall Islands", from: "sin", to: "dxb", cargo: "Crude oil",     dur: 40 },
  { id: "Sabarmati Star", flag: "India",            from: "bom", to: "los", cargo: "Bulk grain",    dur: 38 },
  { id: "Atlantic Bridge",flag: "Liberia",          from: "gru", to: "nyc", cargo: "Containers",    dur: 34 },
  { id: "Nordic Wave",    flag: "Denmark",          from: "lon", to: "cai", cargo: "Containers",    dur: 30 },
  { id: "Southern Cross", flag: "Australia",        from: "syd", to: "sin", cargo: "Iron ore",      dur: 36 },
];

const TRAFFIC = [
  { loc: "nyc", level: 68 },
  { loc: "lon", level: 54 },
  { loc: "tyo", level: 39 },
  { loc: "bom", level: 82 },
  { loc: "sha", level: 61 },
  { loc: "lax", level: 74 },
  { loc: "cai", level: 88 },
  { loc: "los", level: 77 },
  { loc: "dac", level: 91 },
  { loc: "mex", level: 66 },
];

const POPULATION = [
  { loc: "pek", country: "China",          value: 1410000000, perSec: -0.02 },
  { loc: "del", country: "India",          value: 1440000000, perSec: 0.85  },
  { loc: "nyc", country: "United States",  value: 335000000,  perSec: 0.25  },
  { loc: "jkt", country: "Indonesia",      value: 279000000,  perSec: 0.30  },
  { loc: "khi", country: "Pakistan",       value: 240000000,  perSec: 0.30  },
  { loc: "los", country: "Nigeria",        value: 223000000,  perSec: 0.45  },
  { loc: "gru", country: "Brazil",         value: 216000000,  perSec: 0.15  },
  { loc: "dac", country: "Bangladesh",     value: 173000000,  perSec: 0.20  },
  { loc: "mow", country: "Russia",         value: 144000000,  perSec: -0.05 },
  { loc: "mex", country: "Mexico",         value: 128000000,  perSec: 0.15  },
];

const WORLD_POPULATION_BASE = 8200000000;
const WORLD_GROWTH_PER_SEC = 2.3;
