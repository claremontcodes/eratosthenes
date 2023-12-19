const julian = require("../lib/julian");
const { expect } = require("chai");

describe("Julian Time", () => {
  it("can calculate the Julian time from a JavaScript epoch", () => {
    const summer_solstice_ms = Date.parse("2023-06-21T14:57:00Z");
    expect(julian.to(summer_solstice_ms)).to.be.closeTo(8572.123659, 0.000001);

    const winter_solstice_ms = Date.parse("2023-12-22T01:27:00Z");
    expect(julian.to(winter_solstice_ms)).to.be.closeTo(8755.561159, 0.000001);
  });

  it("can calculate the JavaScript epoch from Julian Time", () => {
    const summer_solstice_jt = 8572.123659537037;
    const summer_solstice_ms = Date.parse("2023-06-21T14:57:00Z");
    expect(julian.from(summer_solstice_jt)).to.equal(summer_solstice_ms);

    const winter_solstice_jt = 8755.561159537037;
    const winter_solstice_ms = Date.parse("2023-12-22T01:27:00Z");
    expect(julian.from(winter_solstice_jt)).to.equal(winter_solstice_ms);
  });

  it("can convert to Julian time and back again", () => {
    const spring_equinox_ms = Date.parse("2023-03-20T21:24:00Z");
    expect(julian.from(julian.to(spring_equinox_ms))).to.equal(spring_equinox_ms);
  });

  it("can convert from Julian time and back again", () => {
    const fall_equinox_jt = 8665.785465092593;
    expect(julian.to(julian.from(fall_equinox_jt))).to.equal(fall_equinox_jt);
  });
});
