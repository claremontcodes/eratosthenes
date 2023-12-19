const { expect } = require("chai");
const sidereal = require("../lib/sidereal");
const units = require("../lib/units");

describe("Sidereal Time", () => {
  const spring_jt = -286.42564601851853;
  const summer_jt = -193.67356268518517;
  const autumn_jt = -100.01870157407407;
  const winter_jt = -10.177034907407407;

  // Try to be accurate to one second
  const eps = 1 / 60 / 60 / 24;

  it("can calculate Greenwich mean sidereal time", () => {
    expect(sidereal.greenwich(spring_jt)).to.be.closeTo(-1799.69777, eps);
    expect(sidereal.greenwich(summer_jt)).to.be.closeTo(-1215.32364, eps);
    expect(sidereal.greenwich(autumn_jt)).to.be.closeTo( -625.26167, eps);
    expect(sidereal.greenwich(winter_jt)).to.be.closeTo(  -59.22430, eps);
  });

  it("can calculate local mean sidereal time", () => {
    const claremont_lon = -72.34676;
    const firenze_lon = 11.15856;

    expect(sidereal.local(spring_jt, claremont_lon)).to.be.
      closeTo(-1800.96045, eps);
    expect(sidereal.local(spring_jt, firenze_lon)).to.be.
      closeTo(-1799.50301, eps);
  });

  it("coincides with Greenwich mean sidereal time at Greenwich", () => {
    for(const jt of [spring_jt, summer_jt, autumn_jt, winter_jt]) {
      const gmst = sidereal.greenwich(jt);
      const local = sidereal.local(jt, 0);
      expect(local).to.equal(gmst);
    }
  });
});
