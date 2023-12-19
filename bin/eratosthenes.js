const julian = require("../lib/julian");
const solar = require("../lib/solar");
const units = require("../lib/units");

const EARTH_KM = 40075.017;

console.log("== EXPERIMENT OF ERATOSTHENES ==");
console.log();
console.log(
  `OK, kids, gather round! We're going to digitally repeat Eratosthenes'
experiment to estimate the meridian arc using the sun.

At noon on the summer solstice, the sun is directly above Syene. We know
this since you can look down a deep well and see no shadow. Let's see if
we can simulate this.`
);
console.log();

// NOTE: I cheated a little here! Syene is now Aswan, and Aswan is no
// longer on the Tropic of Cancer (since the tropics migrate about 15 m/yr).
// So I took Aswan's longitude but used the modern latitude.
const solstice_jt = julian.to(Date.parse("2019-06-21T11:49:03+0200"));
const syene_elevation_rad = solar.elevation(solstice_jt, 23.43679, 32.899722);
const syene_elevation_deg = units.deg(syene_elevation_rad);


console.log(`SIMULATED SOLAR ELEVATION: ${syene_elevation_deg.toFixed(0)}`);
console.log("(Zero is at the horizon. Ninety degrees is directly overhead.)");
console.log();

const alexandria_elevation_rad = solar.elevation(solstice_jt, 31.2, 29.916667);
const alexandria_elevation_deg = units.deg(alexandria_elevation_rad);
const shadow_m = 1 / Math.tan(alexandria_elevation_rad);
const diff_deg = syene_elevation_deg - alexandria_elevation_deg;

console.log(
  `Now, let's travel to Alexandria and measure the sun's angle at solar noon
using a meter-long gnomon. We can calculate the angle of the sun by measuring
the length of its shadow.`
);
console.log();

console.log(
  `SIMULATED SOLAR ELEVATION: ${alexandria_elevation_deg.toFixed(1)}`
);
console.log(`CALCULATED SHADOW: ${shadow_m.toFixed(2)} m.`);
console.log(`DIFFERENCE IN ELEVATION: ${diff_deg.toFixed(2)}`);
console.log();

console.log(
  `We know from merchant traders that the distance between Alexandria
and Syene is about 5,000 stadia (or equivalently 912 km). So how big is the Earth?`
);
console.log();

const earth_km = 912.017 * 2 * Math.PI /
  (syene_elevation_rad - alexandria_elevation_rad);
const accuracy_pct = Math.abs(earth_km - EARTH_KM) / EARTH_KM * 100;

console.log(`CALCULATED CIRCUMFERENCE: ${earth_km.toFixed(0)} km.`);
console.log();

console.log(`According mordern measurements, the circumference of the Earth is ${EARTH_KM} km.`);
console.log();
console.log(`Our calculations are acurrate to ${accuracy_pct.toFixed(1)}%!`);
