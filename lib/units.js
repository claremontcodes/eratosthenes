// There are a few different ways to measure a point on a circle. You are
// probably familiar with positions on a clock. The hours begin at 1 and
// continue at equally spaced intervals to 12, at which point the times start
// over again at 1.

// There are two other widely used ways to specify a position on a circle:
// degrees and radians. Degrees begin at 0 and continue to 359 before wrapping.
// The position 0 is the same as position 360 (and 720, and ...) in the degree
// system.

// Radians run from 0 to 2π, with posiion 0 and position 2π (and 4π, and ...)
// being equal, just as in the start and end values in the degree system.

// We use circles that run north-south called latitude and other circles that
// run east-west called longitude to specify places on Earth. If you can pick
// out a particular latitude and longitude, you can uniquely position yourself
// on Earth. Latitude and longitude are usually given in degrees.

// Built-in functions in the Math library, like cosine and sine, however, use
// radian measurements instead of degrees. Therefore, it will be useful to be
// able to convert between degrees and radians and back again.

const RAD_PER_DEG = Math.PI / 180;
// The formula to convert a degree value to radians is:
// radians = degrees * radians per degree
function rad(deg) {
  // TODO: FILL IN
}

const DEG_PER_RAD = 180 / Math.PI;
// The formula to convert a radian value to degrees is:
// degrees = radians * degree per radian
function deg(rad) {
  // TODO: FILL IN
}

exports.deg = deg;
exports.rad = rad;
