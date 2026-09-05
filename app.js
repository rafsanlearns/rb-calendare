/* Globewatch — app logic */

const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("mapSvg");
const listPanel = document.getElementById("listPanel");
const clockEl = document.getElementById("clock");
const worldPopEl = document.getElementById("worldPop");
const popTrack = document.getElementById("popTrack");
const mapCaptionText = document.getElementById("mapCaptionText");

const locById = (id) => LOCATIONS.find((l) => l.id === id);
const el = (tag, attrs) => {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
};

/* ---------- build static map chrome ---------- */

function buildGraticule() {
  const g = el("g", { class: "graticule" });
  for (let x = 0; x <= 1000; x += 100) {
    g.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: 500 }));
  }
  for (let y = 0; y <= 500; y += 100) {
    g.appendChild(el("line", { x1: 0, y1: y, x2: 1000, y2: y }));
  }
  svg.appendChild(g);
}

function arcPath(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - dist * 0.14;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

function buildRoutes(items, kind, group) {
  items.forEach((item) => {
    const a = locById(item.from), b = locById(item.to);
    if (!a || !b) return;
    const pathId = `route-${kind}-${item.id.replace(/\s+/g, "_")}`;
    const path = el("path", { id: pathId, d: arcPath(a, b), class: `route-${kind}` });
    group.appendChild(path);

    const marker = el("circle", { r: kind === "flight" ? 2.6 : 3.2, class: `marker-${kind}` });
    const anim = document.createElementNS(SVG_NS, "animateMotion");
    anim.setAttribute("dur", `${item.dur}s`);
    anim.setAttribute("repeatCount", "indefinite");
    anim.setAttribute("rotate", "auto");
    const mpath = document.createElementNS(SVG_NS, "mpath");
    mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${pathId}`);
    mpath.setAttribute("href", `#${pathId}`);
    anim.appendChild(mpath);
    marker.appendChild(anim);
    group.appendChild(marker);
  });
}

const nodeEls = {};

function buildNodes() {
  const g = el("g", { class: "nodes" });
  LOCATIONS.forEach((loc) => {
    const circle = el("circle", {
      cx: loc.x, cy: loc.y, r: 3, fill: "#33495A", class: "node",
    });
    const label = el("text", {
      x: loc.x + 6, y: loc.y - 5, class: "node-label",
    });
    label.textContent = loc.name;
    g.appendChild(circle);
    g.appendChild(label);
    nodeEls[loc.id] = circle;
  });
  svg.appendChild(g);
}

const flightGroup = el("g", { class: "routes-flights" });
const shipGroup = el("g", { class: "routes-ships" });

function initMap() {
  buildGraticule();
  svg.appendChild(flightGroup);
  svg.appendChild(shipGroup);
  buildRoutes(FLIGHTS, "flight", flightGroup);
  buildRoutes(SHIPS, "ship", shipGroup);
  buildNodes();
}

function setRouteEmphasis(mode) {
  const fOpacity = mode === "flights" ? 0.9 : mode === "ships" ? 0.15 : 0.18;
  const sOpacity = mode === "ships" ? 0.9 : mode === "flights" ? 0.15 : 0.18;
  document.querySelectorAll(".route-flight").forEach((p) => (p.style.opacity = fOpacity));
  document.querySelectorAll(".route-ship").forEach((p) => (p.style.opacity = sOpacity));
}

function resetNodes() {
  Object.values(nodeEls).forEach((n) => {
    n.setAttribute("r", 3);
    n.setAttribute("fill", "#33495A");
  });
}

function congestionColor(level) {
  if (level <= 40) return getComputedStyle(document.documentElement).getPropertyValue("--low").trim();
  if (level <= 70) return getComputedStyle(document.documentElement).getPropertyValue("--mod").trim();
  return getComputedStyle(document.documentElement).getPropertyValue("--high").trim();
}
function congestionLabel(level) {
  if (level <= 40) return "Light";
  if (level <= 70) return "Moderate";
  return "Heavy";
}

/* ---------- list panel renderers ---------- */

function renderFlights() {
  listPanel.innerHTML = `<div class="list-heading"><b>${FLIGHTS.length} flights</b> currently airborne</div>`;
  FLIGHTS.forEach((f) => {
    const a = locById(f.from), b = locById(f.to);
    listPanel.insertAdjacentHTML("beforeend", `
      <div class="row">
        <div class="row-main">
          <span class="row-id"><span class="dot" style="background:var(--flight)"></span>${f.id}</span>
          <div class="row-sub">${a.name} → ${b.name}</div>
        </div>
        <div class="row-metric">${f.alt}<br>${f.speed}</div>
      </div>
    `);
  });
}

function renderShips() {
  listPanel.innerHTML = `<div class="list-heading"><b>${SHIPS.length} vessels</b> underway</div>`;
  SHIPS.forEach((s) => {
    const a = locById(s.from), b = locById(s.to);
    listPanel.insertAdjacentHTML("beforeend", `
      <div class="row">
        <div class="row-main">
          <span class="row-id"><span class="dot" style="background:var(--ship)"></span>${s.id}</span>
          <div class="row-sub">${a.name} → ${b.name} · ${s.cargo}</div>
        </div>
        <div class="row-metric">${s.flag}</div>
      </div>
    `);
  });
}

function renderTraffic() {
  listPanel.innerHTML = `<div class="list-heading"><b>${TRAFFIC.length} cities</b> — road congestion</div>`;
  TRAFFIC.slice().sort((a, b) => b.level - a.level).forEach((t) => {
    const loc = locById(t.loc);
    const color = congestionColor(t.level);
    listPanel.insertAdjacentHTML("beforeend", `
      <div class="row" style="display:block;">
        <div style="display:flex; justify-content:space-between;">
          <span class="row-id" style="font-family:var(--font-display);">${loc.name}</span>
          <span class="row-metric" style="color:${color};">${congestionLabel(t.level)} · ${t.level}</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${t.level}%; background:${color};"></div></div>
      </div>
    `);
  });
}

let popStart = performance.now();

function renderPopulation() {
  listPanel.innerHTML = `<div class="list-heading"><b>${POPULATION.length} countries</b> — estimated population</div>`;
  POPULATION.slice().sort((a, b) => b.value - a.value).forEach((p) => {
    listPanel.insertAdjacentHTML("beforeend", `
      <div class="row">
        <div class="row-main">
          <span class="row-id" style="font-family:var(--font-display);">${p.country}</span>
          <div class="row-sub">${p.perSec >= 0 ? "+" : ""}${p.perSec.toFixed(2)} / sec (est.)</div>
        </div>
        <div class="row-metric count-up" data-pop="${p.loc}">${formatNumber(p.value)}</div>
      </div>
    `);
  });
}

function formatNumber(n) {
  return Math.round(n).toLocaleString("en-US");
}

/* ---------- tab switching ---------- */

const renderers = { flights: renderFlights, ships: renderShips, traffic: renderTraffic, population: renderPopulation };
const captions = {
  flights: `${FLIGHTS.length} active flights worldwide (simulated)`,
  ships: `${SHIPS.length} vessels at sea (simulated)`,
  traffic: `${TRAFFIC.length} cities monitored for congestion`,
  population: `${POPULATION.length} countries, live-estimated counters`,
};

function applyNodeStyle(tab) {
  resetNodes();
  if (tab === "traffic") {
    TRAFFIC.forEach((t) => {
      const n = nodeEls[t.loc];
      if (!n) return;
      n.setAttribute("r", 3 + t.level / 14);
      n.setAttribute("fill", congestionColor(t.level));
    });
  } else if (tab === "population") {
    const max = Math.max(...POPULATION.map((p) => p.value));
    POPULATION.forEach((p) => {
      const n = nodeEls[p.loc];
      if (!n) return;
      const r = 4 + (p.value / max) * 9;
      n.setAttribute("r", r.toFixed(1));
      n.setAttribute("fill", getComputedStyle(document.documentElement).getPropertyValue("--population").trim());
    });
  }
}

function setActiveTab(tab) {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  renderers[tab]();
  setRouteEmphasis(tab);
  applyNodeStyle(tab);
  mapCaptionText.textContent = captions[tab];
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  setActiveTab(btn.dataset.tab);
});

/* ---------- clock ---------- */

function tickClock() {
  const now = new Date();
  clockEl.textContent = now.toISOString().slice(11, 19);
}
setInterval(tickClock, 1000);
tickClock();

/* ---------- population counters ---------- */

function tickPopulation() {
  const elapsedSec = (performance.now() - popStart) / 1000;
  const world = WORLD_POPULATION_BASE + WORLD_GROWTH_PER_SEC * elapsedSec;
  worldPopEl.textContent = formatNumber(world);

  document.querySelectorAll("[data-pop]").forEach((elmt) => {
    const p = POPULATION.find((x) => x.loc === elmt.dataset.pop);
    if (!p) return;
    elmt.textContent = formatNumber(p.value + p.perSec * elapsedSec);
  });
}
setInterval(tickPopulation, 250);

/* ---------- footer ticker content ---------- */

function buildTicker() {
  const items = POPULATION.slice()
    .sort((a, b) => b.value - a.value)
    .map((p) => `<div class="ticker-item">${p.country} <b>${formatNumber(p.value)}</b></div>`)
    .join("");
  popTrack.innerHTML = items + items; // duplicated for seamless marquee loop
}

/* ---------- init ---------- */

initMap();
buildTicker();
setActiveTab("flights");
