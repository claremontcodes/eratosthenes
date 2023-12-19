const sidereal = require("./sidereal");
const units = require("./units");

// In order to calculate the position of the sun in the sky, we need to
// calculate where 1. where the Earth is, and 2. where the sun is in relation
// to the Earth. The first three functions below measure the position of
// Earth in its annual orbit around the sun.

// Once we have fixed the Earth in the celestial sphere, then we can calculate
// the position of the sun in relation to the planent Earth.

// But we want to do one bit better than talking about the entire planet.
// Ultimately, we calculate two numbers called the elevation and azimuth
// to calculate the position of the sun in the sky when we look up from a
// particular place and specified time on the ground.

const G0 = units.rad(357.5291);
// G1 is a conversation factor: one rotation (360 degrees) per one
// (anomalistic) year
// Note: The number of an anomalistic year is different than a normal year,
// because it is how long the Earth would take to go around the sun if the orbit
// were a circle instead of an ellipse.
const G1 = units.rad(360 / 365.259635864);

// The mean anomaly is a measure of how far Earth is in its rotation around
// the sun. The formula for the mean anomaly of the sun is at a particular
// Julian time jt is:
// mean anomaly = G0 + G1 ⋅ jt
function mean_anomaly(jt) {
  // TODO: FILL IN
}

// The obliquity of the ecliptic is a measure of the slant of the Earth on
// its axis. The formula for the obliquity of the ecliptic for a particular
// Julian time jt is:
// obliquity = E0 + E1 ⋅ jt
const E0 = units.rad(23.439);
const E1 = units.rad(-0.00000036);

function obliquity(jt) {
  // TODO: FILL IN
}

// Solar longitude is a measure of how far the Earth has traveled in its orbit
// since the spring equinox. Like the time on a clock, it resets every
// March. The solar longitude at a particular Julian time jt
// involves the mean anomaly g and is given by the formula:
// longitude = Q0 + Q1 ⋅ jt + L0 ⋅ sin(g) + L1 ⋅ sin(2 ⋅ g)
const Q0 = units.rad(280.459);
const Q1 = units.rad(360 / 365.2421896698);
const L0 = units.rad(1.915);
const L1 = units.rad(0.020);
function longitude(jt) {
  // TODO: FILL IN
}

// Right ascension is the east-west position of the sun in space.
// The formula for the right ascension at a particular Julian time jt, and
// associated solar longitude l, and obliquity ob is:
// right ascension = arctan(sin(l) ⋅ cos(ob), cos(l))

// Note: There are two arctan functions in the Math module.
// Use Math.atan2().
function right_ascension(jt) {
  // TODO: FILL IN
}

// Declination is a way of describing the up-down direction of the sun
// in space. The sine of the declination is easier to calculate than
// calculating declination directly.
//
// The formula for the sine of declination at a Julian time jt is:
// sin(declination) = sin(ecliptic longitude) ⋅
//   sin(obliquity)
function sin_declination(jt) {
  // TODO: FILL IN
}

// The hour angle helps us calculate how high the sun is in the sky.
// At solar noon, the hour angle is zero. Because noon time depends where on
// Earth you are---noon in Boston is three hours before noon in San
// Francisco---hour angle depends on both the Julian time
// and longitude on earth (e.g., the longitude of Claremont, NH, is -72.34676).
//
// The formula for hour angle is:
// hour angle = Greenwhich local sidereal time -
//     right ascention
function hour_angle(jt, lon_deg) {
  // TODO: FILL IN
}

// Solar elevation is how far above the horizon you need to look up from
// the ground to find the position of the sun. Solar elevation depends on
// your location on Earth (latitude and longitude) and the (Julian) time
// you look.

// It is easier to calculate the sine of the elevation based on the other
// quantities we've already calculated as a preliminary step. The formula is:
// sin(elevation) = sin(latitude) ⋅ sin(declination) +
//    cos(latitude) ⋅ cos(declination) ⋅ cos(hour angle)

// Note: Remember again that latitude and longitude positions on Earth are
// in degrees, but the formulas are calculated in radians. Remember to convert!
function sin_elevation(jt, lat_deg, lon_deg) {
  // TODO: FILL IN
}

// Now we can use the inverse sine function (sometimes called arcsine)
// to calculate solar elevation.
function elevation(jt, lat_deg, lon_deg) {
  // TODO: FILL IN
}

// Solar azimuth is how far east-west you need to look along the horizon from
// the ground to see the position of the sun. Like solar elevation, solar
// azimuth depends on your location on Earth and time you look.
// The formula for azimuth is:
// azimuth = π + arctan(sin(hour angle),
//    cos(hour angle) ⋅ sin(latitude) -
//    tan(declination) ⋅ cos(latitude))

// Note: Remember again that latitude and longitude positions on Earth are
// in degrees, but the formulas are calculated in radians. Remember to convert!

// Note: Remember there are two arctan functions in the Math library. You should
// use Math.atan2().
function azimuth(jt, lat_deg, lon_deg) {
  // TODO: FILL IN
}

exports.azimuth = azimuth;
exports.elevation = elevation;
exports.hour_angle = hour_angle;
exports.longitude = longitude;
exports.mean_anomaly = mean_anomaly;
exports.obliquity = obliquity;
exports.right_ascension = right_ascension;
exports.sin_declination = sin_declination;
