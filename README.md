This is a collection of small collection of side-projects and scripts to explore different technologies in JavaScript.

### [dice_master](https://github.com/herokunt/javascript_ramblings/blob/main/dice.js)

Simple script to simulate dice rolls of any size, call the initialize function and specify the number of sides and then simply call that function to rolled a random number of that dice.

```js
const d20 = dice(20)
const d12 = dice(12)
const d6 = dice(6)

d20()   // 15
d12()   // 9
d6()    // 4
```

Optionally provide an array of numbers when rolling the dice, to exclude and re-roll those number from the result i.e., if you need to re-roll any even numbers simple provide those numbers when calling the function.

```
// Provide an array with numbers that should be re-rolled. The result will never include any of them.
d20([2,4,6,8,10])
d12([1,3,5])
d6([5,6])

/*
TODO: Make it avilable as CLI
TODO: Add option to create custom "sides" other than numbers
TODO: Animation using three.js
TODO: Option to roll multiple dices at once             d12({ repeat: 5 })               // [7, 3, 9, 12, 3]
TODO: Option to chain dices of differnt sides           d6().d4().d3({ repeat: 2 })      // [5, 4, 1, 2]
TODO: For multiple rolls, add option to sort results    d12({ repeat: 5, sort: true })   // [3, 3, 7, 9, 12]
TODO: For multiple rolls, add option to group results   d12({ repeat: 5, group: true })  // 2 threes, 1 seven, 1 nine, 1 twelve
*/
```

Update: started working on learning the fundamentals of Three.js
![](cubes.png)

---

### [Solar System](https://github.com/herokunt/javascript_ramblings/blob/main/planets.js)

A simple 3D simulation of the solar system built with Three.js as an introduction to how the library works

![solar system in 3D](solar.png)

---
### [Invidious bookmarklet](https://github.com/herokunt/javascript_ramblings/blob/main/bookmarklets.js)

A simple bookmarklet that replaces references to Youtube links in the current page with Invidious instances. This `https://youtu.be/70MQ-FugwbI` becomes `https://invidious.site/70MQ-FugwbI`
