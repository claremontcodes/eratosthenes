const {expect} = require("chai");
const julian = require("../lib/julian");
const solar = require("../lib/solar");
const units = require("../lib/units");

function limit_degrees(rad) {
  const deg = rad * 180 / Math.PI / 360.0;
  let limited = 360.0 * (deg - Math.floor(deg));
  if(limited < 0) {
    limited += 360.0;
  }
  return limited;
}

describe("Solar", () => {
  const spring_jt = julian.to(Date.parse("1999-03-21T01:46Z"));
  const summer_jt = julian.to(Date.parse("1999-06-21T19:49Z"));
  const autumn_jt = julian.to(Date.parse("1999-09-23T11:32Z"));
  const winter_jt = julian.to(Date.parse("1999-12-22T07:44Z"));

  // Try to be accurate to half an arcsecond
  const eps = 0.5 / 3600;

  it("can calculate mean anomaly", () => {
    // Mean anomaly is the angular distance the earth would have
    // traveled if its orbit were a circle (and not an ellipse).

    // The seasons split up one rotation around the sun into 4 equalish
    // parts, so the difference between each of these values is about π/2
    // radians (90 degrees), which is a quarter turn of a circle.
    expect(solar.mean_anomaly(spring_jt)).to.be.closeTo(1.312974, eps);
    expect(solar.mean_anomaly(summer_jt)).to.be.closeTo(2.908493, eps);
    expect(solar.mean_anomaly(autumn_jt)).to.be.closeTo(4.519541, eps);
    expect(solar.mean_anomaly(winter_jt)).to.be.closeTo(6.064994, eps);
  });

  it("can calculate obliquity of the ecliptic", () => {
    // Note: The obliquity of the ecliptic is about 23.4 degrees and is
    // currently decreasing 0.013 degrees (47 arcseconds) per hundred years.
    // So these should all be about the same.
    expect(solar.obliquity(spring_jt)).to.be.closeTo(0.409089, eps);
    expect(solar.obliquity(summer_jt)).to.be.closeTo(0.409088, eps);
    expect(solar.obliquity(autumn_jt)).to.be.closeTo(0.409088, eps);
    expect(solar.obliquity(winter_jt)).to.be.closeTo(0.409087, eps);
  });

  it("can calcualte solar longitude", () => {
    expect(solar.longitude(spring_jt)).to.be.closeTo(Math.PI * 0.0, eps);
    expect(solar.longitude(summer_jt)).to.be.closeTo(Math.PI * 0.5, eps);
    expect(solar.longitude(autumn_jt)).to.be.closeTo(Math.PI * 1.0, eps);
    expect(solar.longitude(winter_jt)).to.be.closeTo(Math.PI * 1.5, eps);
  });

  it("can calculate right ascension", () => {
    // Right ascension runs from -π to π (-180 to 180 degrees). It is measured
    // relative the vernal equinox. So at the start of spring, the right
    // ascension is zero.

    // Is is similar to solar longitude.
    expect(solar.right_ascension(autumn_jt)).to.be.closeTo(Math.PI * -1.0, eps);
    expect(solar.right_ascension(winter_jt)).to.be.closeTo(Math.PI * -0.5, eps);
    expect(solar.right_ascension(spring_jt)).to.be.closeTo(Math.PI *  0.0, eps);
    expect(solar.right_ascension(summer_jt)).to.be.closeTo(Math.PI *  0.5, eps);
  });

  it("can calculate hour angle", () => {
    // Try to be within one degree
    const eps = 1;

    // Solar noon in Boston, MA
    const noon_jt = julian.to(Date.parse("2023-12-14T11:38:35-05:00"));

    // The hour angle at Boston and other locations around the world
    const boston_ha = solar.hour_angle(noon_jt, -71.05);
    const yellowknife_ha = solar.hour_angle(noon_jt, -114.37);
    const cairo_ha = solar.hour_angle(noon_jt, 31.23);
    const lhasa_ha = solar.hour_angle(noon_jt, 91.17);

    expect(limit_degrees(boston_ha)).to.be.closeTo(0, eps);
    expect(limit_degrees(yellowknife_ha)).to.be.closeTo(316, eps);
    expect(limit_degrees(cairo_ha)).to.be.closeTo(102, eps);
    expect(limit_degrees(lhasa_ha)).to.be.closeTo(162, eps);
  });

  it("can calculate the sine of the declination", () => {
    // Sine is dimensionless. So go for three decimals of precision
    const eps = 0.001;

    // The solar declination varies from -23.44° at the (northern hemisphere)
    // winter solstice through 0° at the vernal equinox, to +23.44° at the
    // summer solstice.
    const max = Math.sin(units.rad(23.4));
    const min = Math.sin(units.rad(-23.4));

    expect(solar.sin_declination(spring_jt)).to.be.closeTo(0, eps);
    expect(solar.sin_declination(summer_jt)).to.be.closeTo(max, eps);
    expect(solar.sin_declination(autumn_jt)).to.be.closeTo(0, eps);
    expect(solar.sin_declination(winter_jt)).to.be.closeTo(min, eps);
  });

  it("can calculate solar elevation", () => {
    // Try to be accurate to one degree
    const eps = 1;

    // Boston, MA: 42.35, -71.05
    // December 16, 2023, 05:30 - 18:00-0500
    const boston_positions = [
      -17.1, -15.3, -13.6, -11.8, -10.1, -8.4, -6.7, -5.1, -3.4, -1.7, 0.19,
      1.5, 2.9, 4.4, 5.8, 7.2, 8.5, 9.8, 11.1, 12.4, 13.6, 14.7, 15.8, 16.8,
      17.8, 18.8, 19.6, 20.4, 21.1, 21.8, 22.4, 22.9, 23.3, 23.7, 24.0, 24.2,
      24.3, 24.3, 24.3, 24.2, 23.9, 23.7, 23.3, 22.9, 22.3, 21.8, 21.1, 20.4,
      19.6, 18.7, 17.8, 16.8, 15.8, 14.7, 13.5, 12.3, 11.1, 9.8, 8.5, 7.1,
      5.7, 4.3, 2.9, 1.4, 0.1, -1.8, -3.5, -5.1, -6.8, -8.5, -10.2, -11.9,
      -13.7, -15.4, -17.2,
    ];
    const boston_ms = Date.parse("2023-12-16T05:30:00-0500");
    for(let i = 0; i < boston_positions.length; i++) {
      const jt = julian.to(boston_ms + 600000 * i);
      const elevation_deg = boston_positions[i];
      const actual_deg = units.deg(solar.elevation(jt, 42.35, -71.05));
      expect(actual_deg).to.be.closeTo(elevation_deg, eps);
    }

    // Jakarta, Indonesia: -6.20, 106.816
    // December 16, 2023 4:30 - 17:20+0700
    const jakarta_positions = [
      -15.1, -12.9, -10.6, -8.4, -6.1, -3.8, -1.4, 1.0, 3.1, 5.3, 7.6, 9.8,
      12.1, 14.4, 16.72, 19.0, 21.3, 23.5, 25.8, 28.1, 30.4, 32.7, 34.9, 37.2,
      39.4, 41.7, 43.9, 46.1, 48.3, 50.5, 52.6, 54.7, 56.8, 58.9, 60.8, 62.7,
      64.6, 66.3, 67.9, 69.3, 70.6, 71.6, 72.3, 72.7, 72.9, 72.6, 72.1, 71.2,
      70.1, 68.8, 67.3, 65.6, 63.9, 62.0, 60.1, 58.1, 56.0, 54.0, 51.8, 49.7,
      47.5, 45.3, 43.1, 40.8, 38.6, 36.3, 34.1, 31.8, 29.5, 27.2, 25.0, 22.7,
      20.4, 18.1, 15.8, 13.5, 11.3, 9.0, 6.7, 4.5, 2.3, 0.2, -2.3, -4.7, -7.0,
      -9.2, -11.5, -13.7, -16.0,
    ];
    const jakarta_ms = Date.parse("2023-12-16T04:30:00+0700");
    for(let i = 0; i < jakarta_positions.length; i++) {
      const jt = julian.to(jakarta_ms + 600000 * i);
      const elevation_deg = jakarta_positions[i];
      const actual_deg = units.deg(solar.elevation(jt, -6.2,  106.816));
      expect(actual_deg).to.be.closeTo(elevation_deg, eps);
    }
  });

  it("can calculate the azimuth of the sun", () => {
    // Salvador, Brazil: -12.96667, -38.46667
    // April 10, 2019, 05:00
    const salvador_positions = [
        84.2, 83.7, 83.1, 82.6, 82.0, 81.5, 80.9, 80.3, 79.7, 79.0, 78.4, 77.7,
        76.9, 76.2, 75.4, 74.5, 73.6, 72.6, 71.6, 70.5, 69.4, 68.1, 66.7, 65.2,
        63.6, 61.9, 59.9, 57.8, 55.4, 52.7, 49.8, 46.5, 42.8, 38.6, 34.0, 28.8,
        23.2, 17.0, 10.5, 3.6, 356.7, 349.9, 343.3, 337.2, 331.5, 326.3, 321.7,
        317.5, 313.8, 310.5, 307.5, 304.8, 302.4, 300.3, 298.3, 296.6, 294.9,
        293.5, 292.1, 290.8, 289.6, 288.6, 287.5, 286.6, 285.7, 284.8, 284.0,
        283.3, 282.5, 281.8, 281.2, 280.5, 279.9, 279.3, 278.7, 278.2, 277.6,
        277.1, 276.5, 276.0,
      ];
    const salvador_ms = Date.parse("2019-04-10T05:00:00-0300");
    for(let i = 0; i < salvador_positions.length; i++) {
      const azimuth = salvador_positions[i];
      const jt = julian.to(salvador_ms + 600000 * i);
      const actual = solar.azimuth(jt, -12.96667, -38.46667);
      expect(limit_degrees(actual)).to.be.closeTo(azimuth, 1);
    }

    // Stockholm, Sweden: 59.31667, 18.06667
    // April 10, 2019, 4:10 - 21:30-0400
    const stockholm_positions = [
      51.1, 53.4, 55.7, 57.9, 60.2, 62.4, 64.6, 66.8, 69.0, 71.2, 73.3, 75.5,
      77.6, 79.7, 81.9, 84.0, 86.2, 88.3, 90.4, 92.6, 94.8, 96.9, 99.1, 101.3,
      103.6, 105.8, 108.1, 110.4, 112.7, 115.1, 117.5, 119.9, 122.4, 124.9,
      127.5, 130.0, 132.7, 135.4, 138.1, 140.9, 143.7, 146.5, 149.4, 152.4,
      155.4, 158.4, 161.5, 164.5, 167.7, 170.8, 173.9, 177.1, 180.3, 183.4,
      186.6, 189.8, 192.9, 196.0, 199.1, 202.1, 205.2, 208.1, 211.1, 214.0,
      216.8, 219.7, 222.4, 225.1, 227.8, 230.4, 233.0, 235.6, 238.1, 240.5,
      243.0, 245.4, 247.7, 250.1, 252.4, 254.6, 256.9, 259.1, 261.3, 263.5,
      265.7, 267.9, 270.0, 272.2, 274.3, 276.4, 278.6, 280.7, 282.9, 285.0,
      287.2, 289.3, 291.5, 293.7, 295.9, 298.1, 300.3, 302.6, 304.8, 307.1,
      309.4,
    ];
    const stockholm_ms = Date.parse("2019-04-10T04:10:00+0200");
    for(let i = 0; i < stockholm_positions.length; i++) {
      const azimuth = stockholm_positions[i];
      const jt = julian.to(stockholm_ms + 600000 * i);
      const actual = solar.azimuth(jt, 59.31667, 18.06667);
      expect(limit_degrees(actual)).to.be.closeTo(azimuth, 1);
    }

    // Sydney, Australia: -33.85, 151.2
    // April 10, 2019, 5:20 - 18:40+1000
    const sydney_positions = [
      88.3, 86.9, 85.6, 84.2, 82.8, 81.4, 80.0, 78.6, 77.2, 75.8, 74.3, 72.8,
      71.3, 69.7, 68.1, 66.5, 64.8, 63.0, 61.2, 59.4, 57.4, 55.4, 53.3, 51.1,
      48.9, 46.5, 44.0, 41.4, 38.7, 35.9, 33.0, 30.0, 26.8, 23.6, 20.2, 16.8,
      13.2, 9.6, 5.9, 2.3, 358.6, 354.9, 351.2, 347.6, 344.0, 340.6, 337.2,
      333.9, 330.7, 327.7, 324.7, 321.9, 319.2, 316.6, 314.1, 311.7, 309.4,
      307.2, 305.1, 303.1, 301.1, 299.3, 297.5, 295.7, 294.0, 292.3, 290.7,
      289.2, 287.6, 286.1, 284.7, 283.2, 281.8, 280.4, 279.0, 277.6, 276.3,
      274.9, 273.5, 272.2,
    ];
    const sydney_ms = Date.parse("2019-04-10T05:20:00+1000");
    for(let i = 0; i < sydney_positions.length; i++) {
      const azimuth = sydney_positions[i];
      const jt = julian.to(sydney_ms + 600000 * i);
      const actual = solar.azimuth(jt, -33.85, 151.2);
      expect(limit_degrees(actual)).to.be.closeTo(azimuth, 1);
    }
  });
});
