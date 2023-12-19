// You know that a (Gregorian) calendar date and clock time is a one way to
// specify a particular moment in time. It keeps track of the number of days
// that have elapsed since January 1, in the year 1 ACE. But there are other ways of keeping track of time.

// In programming, we often use a different way to count time called the
// JavaScript epoch. It keeps track of the milliseconds that have elapsed since
// January 1, 1970 at midnight UTC.

// To convert from a calendar time, you can use the built-in library function
// Date.parse(). It takes a String input of the date you want to convert and
// outputs the JavaScript epoch as a Number.

// The input format is YYYY-MM-DDTHH:mm:SS-,+NNNN, where
// YYYY is the four digit year, e.g., 2023
// MM is the two digit month, e.g., 08 for August
// DD is the two digit day, e.g., 24
// T is the letter T. It stands for time.
// HH is the two digit hour from 00 to 23. Midnight is 00 and 11PM is 23.
// mm is the two digit minute, e.g., 56
// SS is the two digit second, e.g., 12
// -,+NNNN is the UTC offset (timezone). e.g., -0300 or +0700

// For example, to calcualte the JavaScript epoch for the last second in
// 2023 in Boston, you would type:
const boston_new_years_eve_ms = Date.parse("2023-12-31T23:59:59-0500");

// Use Date.parse() to calculate times for the following dates:

// Spring equinox in Boston, MA: March 19. 2024, 11:06pm -0400
const spring_ms = Date.parse("2024-03-19T23:06:00-0400");

// Summer solstice in Punta Arenas, Chile: June 20, 2024, 5:50pm -0300
const summer_ms = Date.parse("2024-06-20T17:50:00-0300");

// Autumun equinox in Reykjavik, Iceland: September 22, 2024, 12:43pm +0000
const autumn_ms = Date.parse("2024-09-22T12:43:00+0000");

// Winter Solstice in Tokyo, Japan: December 21, 6:20pm +0900
const winter_ms = Date.parse("2024-12-21T18:20:00+0900");

exports.spring_ms = spring_ms;
exports.summer_ms = summer_ms;
exports.autumn_ms = autumn_ms;
exports.winter_ms = winter_ms;
