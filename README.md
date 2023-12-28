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

## How to Do It

You need to functions, which are the building blocks of programs. Functions
take input values and transform them into one output value.

```
 inputs -> [ function ] -> output
```

The inputs to a function are called parameters or arguments. The output is
called the return value. (You'll see why in a moment.) To write a function in
JavaScript you use the special keyword `function` followed by

1. the name of your function, which you get to choose!
2. an open parenthesis `(`
3. a list of input parameters separated by commas
4. a closed parenthesis `)`
5. an open curly brace `{`
6. one or more JavaScript statements. This is the body of the function.
7. a `return` statement consisting of the special keyword `return` followed by
the output value and a semi-colon
8. a closing curly brace

Don't worry! It is not as complicated as the list makes it seems. Let's look at
an example to calculate a quantity called luminance, which is roughly how
bright a color is. It is a weighted average of the red, green, and blue parts
of the color.

The formula for luminance is:
```
luminance = 0.2126 red component + 0.7152 green component + 0.0722 blue component
```

To turn the formula into a JavaScript function, we need to give the function a
name. Since this function will calculate the luminance of a color, let's call
it `luminance`.

Next we need to know its inputs. The formula depends on the red, green, and blue
components of the color whose luminance we are calculating. So let's make our
function take three inputs called `red`, `green`, and `blue`.

Now we put the calculation in the body of our function and return the calculated
value. Here's one way we could write our function:

```js
function luminance(red, green, blue) {
  return (0.2126 * red + 0.7152 * green + 0.0722 * blue);
}
```

Here's another way we could have written it. It does exactly the same thing as
the function above.

```js
function luminance(r, g, b) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b);
}
```

What differences do you notice between the two versions? Which one do you
prefer? Which one is more understandable?

Here's one more way. This version creates two new values `temp` and `final`
inside the function using the special keyword `const` and the assignment
operator `=`. It is not the equals sign and does not denote equality. The 
`=` pairs the name on the left-hand side (like, `temp`) with the value on
the right-hand side.

The output of this version of `luminance()` is the same as the other two, but
the calculation is split up into two separate steps. The result of the first
step is used in the second step.

```js
function luminance(red, green, blue) {
  const temp = 0.0722 * blue + 0.2126 * green;
  const final = temp + 0.2126 * red;
  return final;
}
```

Sometimes splitting up long calculations into smaller steps makes it easier to
understand what is going on. Other times splitting things up can make things
more confusing. Do you think that splitting things up here made the code easier
or harder to understand?
