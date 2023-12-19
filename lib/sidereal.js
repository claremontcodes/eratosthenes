const units = require("./units");

// There are two major categories of meauring time. One is based on so-called
// atomic clocks. The other is based on the rotation of the Earth. The rotation
// of the Earth is not uniform; the speed of rotation changes of about a few
// seconds each year!

// Most modern clock systems depend on atomic clocks, since they
// are more uniform and reliable. The clocks on computers and phones and GPS use
// atomic clocks to measure time. Julian time is based on atomic clocks.

const GMST0 = 18.697374558 * Math.PI / 12;
const GMST1 = 24.06570982441908 * Math.PI / 12;

// Sidereal time is the measure of the Earth's rotation with respect to distant
// celestial objects. Since sidereal time is based on the Earth's rotation, it
// is useful for incorporating time in calculations regarding positions of
// astronomical bodies, like the sun, when looking from Earth.

// Greenwhich mean sidereal time converts a Julian time to sidereal time at the // prime meridian (longitude 0 degrees), which passes through Greenwich,
// England, where there is a famous observatory.

// The formula for Greenwhich mean sidereal time gmst for a Julian time jt is:
// Greenwich mean sidereal time = GMST0 + GMST1 ⋅ jt
function greenwich_mean_sidereal_time(jt) {
  return GMST0 + GMST1 * jt;
}

// Local sidereal time is the same as GMST, but at a position on east or west
// of the prime meridian. It's like GMST in a local timezone.

// The formula for local sidereal time is at a longitude:
// local sidereal time = GMST + longitude (in radians)

// Note: Latitude and longitude values are measured in degrees. But all of
// the formulas and built-in functions in the Math library use radians instead
// of degrees. Remember to convert longitude from degrees to radians!
function local_sidereal_time(jt, lon_deg) {
  return greenwich_mean_sidereal_time(jt) + units.rad(lon_deg);
}

exports.greenwich = greenwich_mean_sidereal_time;
exports.local = local_sidereal_time;
