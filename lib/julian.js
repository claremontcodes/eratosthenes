// Julian time counts the countinuous number of days that have elapsed since
// January 1, 4713 BCE at noon in UTC (timezone +0000). Almost 2.5 million days
// have transpired since this date. Julian dates are well-suited for
// astronomical calculations. All of the functions in the library solar use
// Julian times.

const J2000_MS = Date.parse("2000-01-01T11:58:55.816Z");
const MS_PER_DAY = 1000 * 60 * 60 * 24;
// The formula for the Julian time jt for a JavaScript epoch epoch_ms is:
// jt = (epoch_ms - J2000_MS) / MS_PER_DAY
function to_julian(epoch_ms) {
  return (epoch_ms - J2000_MS) / MS_PER_DAY;
}

// To convert from a Julian time jt back to a JavaScript epoch, we use the
// formula:
// epoch_ms = jt ⋅ MS_PER_DAY + J2000_MS
function from_julian(jt) {
  return jt * MS_PER_DAY + J2000_MS;
}

exports.to = to_julian;
exports.from = from_julian;
