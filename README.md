# Claremont Codes: Project 1
## The Size of the Earth

Eratosthenes was born in 276 BCE in Cyrene, which is in modern day Libya in
North Africa. He was a librarian, mathematician, philosopher, and cartographer.
Over two thousand years ago, Eratosthenes estimated (with great accuracy!) the
circumference of the Earth.

His calculation was based on the position of the sun during the solstice and
the shadow length at his home, in Alexandria.

Watch this explanation of his experiment and calculation below:
https://www.youtube.com/watch?v=wPR3XhIDP9w

You will write a code to simulate Eratosthenes' Earth-shaking experiment.

## The Setup
You will need:

1. To download and install [NodeJS](https://nodejs.org/en)
2. To download and extract the zip file of this project.
3. Open a Terminal window and navigate to the directory of this project.
4. Install the project dependencies by typing `npm install`.

## How This Works

In order to reproduce Eratosthenes' experiment, we will need put the sun in
correct position in the sky over Syene and Alexandria on the summer solstice.
This requires us to calculate several values from celestial mechanics.

## What to Do

The project is organized into a number of libraries of related functions. You
are given empty function stubs. Comments explain what each function does and provides formula for you to implement as working JavaScript code.

You can check to see if you have a working implementation by running the tests.
Run the tests often!

```
npm test
```

Some of the libraries depend on other libraries that you will build. It will
be easiest if you work on the libraries in this order:

* `lib/units.js` -- This library contains functions to convert to degrees and
 radians, measurement of angles.
* `lib/dates.js` -- This is a library that technically isn't used. It exists to
 introduce you to JavaScript epochs, one way to measure time that is different
 than the calendar time you are used to.
* `lib/julian.js` -- This library contains important functions to convert from
 JavaScript epochs to another measurement of time called Julian time, which
 is one of the systems of times used by astronomers.
* `lib/sidereal.js` -- This library contains yet more functions for another
 system of time called sidereal time (star dates!), which are also used by
 astronomers when calculating positions of celestial bodies.
* `lib/solar.js` -- This is the main event. The solar library contains functions
 that can calculate the position of the Earth and sun from points of view. This
 is the largest of the libraries.

## What Will Happen

After you get all of the tests to pass, the simulation will run. If you have
come up with working calculations for all of the functions in this project,
you will be able to calculate the circumference of the Earth that is accurate to
0.1% percent! (That's pretty awesome!)
