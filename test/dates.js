const dates = require("../lib/dates");
const { expect } = require("chai");

describe("Dates", () => {
  it("can parse the date for the March equinox in Boston", () => {
    expect(dates.spring_ms === 1710903960000).to.be.true;
  });

  it("can parse the date for the June solstice in Punta Arenas", () => {
    expect(dates.summer_ms === 1718916600000).to.be.true;
  });

  it("can parse the date for the September equinox in Reykjavik", () => {
    expect(dates.autumn_ms === 1727008980000).to.be.true;
  });

  it("can parse the date for the December solstice in Tokyo", () => {
    expect(dates.winter_ms === 1734772800000).to.be.true;
  });
});
