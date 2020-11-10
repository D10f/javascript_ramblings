JavaScript Ramblings - a collection of small scripts made with the sole purpose of exploring different technologies in the JavaScript landscape.

---
### [dice_simulator](https://github.com/herokunt/javascript_ramblings/blob/main/dice.js)

Small, simple script to simulate dice rolls programatically. Create functions for every new type of dice you need, and provide parameters to adjust things like re-rolls or sorting results.

```js
const d20 = dice(20)
const d12 = dice(12)
const d6 = dice(6)

d20()   // 15
d12()   // 9
d6()    // 4

/**
  * Optionally provide an array of numbers to the roll to exclude those numbers
  * from the result, as if they were re-rolled.
  */

d20([2,4,6,8,10])
d12([1,3,5])
d6([5,6])
```

```
/*
TODO: Make it avilable as CLI
TODO: Add option to create custom "sides" other than numbers
TODO: Option to roll multiple dices at once:
d12({ repeat: 5 })  // [7, 3, 9, 12, 3]

TODO: Option to chain dices of differnt sides:
d6().d4().d3({ repeat: 2 })   // [5, 4, 1, 2]

TODO: For multiple rolls, add option to sort results:
d12({ repeat: 5, sort: true })    // [3, 3, 7, 9, 12]

TODO: For multiple rolls, add option to group results:
d12({ repeat: 5, group: true })   // 2 threes, 1 seven, 1 nine, 1 twelve

TODO: Animation using three.js
*/
```

---
### [Solar System](https://github.com/herokunt/javascript_ramblings/blob/main/3D/planets.js)

A simple 3D simulation of the solar system built with [Three.js](https://threejs.org) as an introduction to how the library works.

![solar system in 3D](3D/assets/solar.png)

---
### [2D - Forces](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_forces.js)

[See demo](https://editor.p5js.org/fall-parameter/sketches/5KQupIlIW)

A follow along of Daniel Shiffman's The Nature Of Code playlist. This basic demo uses p5.js to create an environment that simulates real world forces, such as gravity, wind, friction and drag.

---
### [2D - Attraction](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_physics.js)

[See demo](https://editor.p5js.org/fall-parameter/sketches/HmzJS_pB8)

A follow along of Daniel Shiffman's The Nature Of Code playlist. This basic demo uses p5.js to create an environment that simulates gravitational attraction between objects.

---
### [2D - Perlin Noise](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_perlin_noise.js)

[See demo](https://editor.p5js.org/fall-parameter/sketches/oGkwnNowr)

A follow along of Daniel Shiffman's The Nature Of Code playlist. This is a visual representation of 2-dimensional Perlin noise.

---
### [2D - Flow Field](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_flowfield.js)

A follow along of Daniel Shiffman's The Nature Of Code playlist. This is a visual representation of 3-dimensional Perlin noise.

[See demo](https://editor.p5js.org/fall-parameter/sketches/PxvmM0PMq)

---
### [2D - Snowfall](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_snowfall.js)

A snowfall effect using p5.js inspired by Daniel Shiffman's The Nature Of Code playlist.

[See demo](https://editor.p5js.org/fall-parameter/sketches/KHmqjD_gx)

---
### [Invidious bookmarklet](https://github.com/herokunt/javascript_ramblings/blob/main/bookmarklets.js)

A simple bookmarklet that replaces references to Youtube links in the current page with Invidious instances. This `https://youtu.be/70MQ-FugwbI` becomes `https://invidious.site/70MQ-FugwbI`
