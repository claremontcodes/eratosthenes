const { expect } = require("chai");
const units = require("../lib/units");

describe("Units", () => {
  // Floating point arithmetic is only simulation of numbers.
  const eps = 0.00001;

  it("can convert degrees to radians", () => {
    expect(units.rad(0)).to.be.closeTo(0, eps);
    expect(units.rad(90)).to.be.closeTo(Math.PI / 2, eps);
    expect(units.rad(180)).to.be.closeTo(Math.PI, eps);
    expect(units.rad(360)).to.be.closeTo(2 * Math.PI, eps);
  });

  it("can convert radians to degrees", () => {
    expect(units.deg(0)).to.be.closeTo(0, eps);
    expect(units.deg(Math.PI / 3)).to.be.closeTo(60, eps);
    expect(units.deg(Math.PI / 4)).to.be.closeTo(45, eps);
    expect(units.deg(Math.PI / 6)).to.be.closeTo(30, eps);
  });
});
