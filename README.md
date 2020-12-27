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

![solar system in 3D](3D/assets/cubes.png)

---
### [Solar System](https://github.com/herokunt/javascript_ramblings/blob/main/3D/planets.js)

A simple 3D simulation of the solar system built with [Three.js](https://threejs.org) as an introduction to how the library works.

![solar system in 3D](3D/assets/solar.png)

---
> The following are exercises inspired by Daniel Shiffman from The Coding Train, Gustavo Pezzi and others. I adopted my own implemention following modern ES6 syntax and other finishing touches here and there.
>
> Please note that the images below are in low resolution, make sure to click on "see demo" to see the working project and the code.

**[2D - Angry Matter](https://github.com/herokunt/javascript_ramblings/blob/main/2D/angry_matter.js)**: A simplified version of Angry Birds, features p5.js wrappers over matter.js bodies to handle rendering and physics independently. [See demo](https://editor.p5js.org/fall-parameter/sketches/Q6PcOhQBl)

![](2D/assets/polygons.gif)

**[2D - Asteroids](https://github.com/herokunt/javascript_ramblings/blob/main/2D/asteroids.js)**: The classic 8-bit game Asteroids! [See demo](https://editor.p5js.org/fall-parameter/sketches/EBnF9Q-1N)

**[2D - Attraction](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_physics.js)**: This basic demo simulates gravitational attraction towards a center object. [See demo](https://editor.p5js.org/fall-parameter/sketches/HmzJS_pB8)

![Attraction](2D/assets/attraction.gif)

**[2D - Attraction-Repulsion](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_attraction.js)**: A variation to gravitational attraction that includes repulsion forces. [See demo](https://editor.p5js.org/fall-parameter/sketches/5bTOj2boj)

**[2D - Beesweeper](https://github.com/herokunt/javascript_ramblings/blob/main/2D/beesweeper.js)**: Version of the classic game of minesweeper, using bees instead of mines. [See demo](https://editor.p5js.org/fall-parameter/sketches/ExafupoVm)

**[2D - Binary Tree Visualization](https://github.com/herokunt/javascript_ramblings/blob/main/2D/binary_tree.js)**: A visualization of the binary search algorithm, through nodes that form a tree that can be traversed. [See demo](https://editor.p5js.org/fall-parameter/sketches/XZ8q5Uljy)

**[2D - Fireworks](https://github.com/herokunt/javascript_ramblings/blob/main/2D/fireworks.js)**: A firework simulation in the browser canvas [See demo](https://editor.p5js.org/fall-parameter/sketches/oQ_ScPSZq)

![Fireworks](2D/assets/fireworks.gif)

**[2D - Flock Simulation](https://github.com/herokunt/javascript_ramblings/blob/main/2D/flock_simulation.js)**: Simulation of how individual particles interact as a flock in a complex system [See demo](https://editor.p5js.org/fall-parameter/sketches/cq-M6CW1k)

**[2D - Flow Field](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_flowfield.js)**: A follow along of Daniel Shiffman's The Nature Of Code playlist. This is a visual representation of 3-dimensional Perlin noise. [See demo](https://editor.p5js.org/fall-parameter/sketches/PxvmM0PMq)

**[2D - Forces](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_forces.js)**: This basic demo uses p5.js to create an environment that simulates real world forces, such as gravity, wind, friction and drag. [See demo](https://editor.p5js.org/fall-parameter/sketches/5KQupIlIW)

**[2D - Game Of Life](https://github.com/herokunt/javascript_ramblings/blob/main/2D/game_of_life.js)**: Classic John Conway's Game Of Life, a zero-player game based on an initial input that evolves by itself based on a basic set of rules. [See demo](https://editor.p5js.org/fall-parameter/sketches/NLFQKHvjr)

![The Game Of Life](2D/assets/game_life.gif)

**[2D - Hanging Lightbulb](https://github.com/herokunt/javascript_ramblings/blob/main/2D/hanging_lightbulb.js)**: One of my favorites, it combines a raycasting algorithm and physics engine to project shadows off of moving objects. [See demo](https://editor.p5js.org/fall-parameter/sketches/iRAe03G1W)

![hanging_lightbulb](2D/assets/hanging_lightbulb.gif)

**[2D - Joggler](https://github.com/herokunt/javascript_ramblings/blob/main/2D/joggler.js)**: Very simple game to mimic an interactive joggling in the canvas. [See demo](https://editor.p5js.org/fall-parameter/sketches/d5aRIpu00)

**[2D - Matrix Letter Effect](https://github.com/herokunt/javascript_ramblings/blob/main/2D/matrix_letters.js)**: The classic digital letter "rain" effect from the movie: The Matrix. [See demo](https://editor.p5js.org/fall-parameter/sketches/7RUbiCt1b)

**[2D - Maze Generator](https://github.com/herokunt/javascript_ramblings/blob/main/2D/maze_generator.js)**: A visualization in p5.js of a maze generator, based on the depth-first search recursive algorithm. [See demo](https://editor.p5js.org/fall-parameter/sketches/Y_IB8Scm4)

![Maze Generator](2D/assets/maze.gif)

**[2D - Mitosis](https://github.com/herokunt/javascript_ramblings/blob/main/2D/mitosis.js)**: A simple simulation of the process of mitosis on cells. [See demo](https://editor.p5js.org/fall-parameter/sketches/8iVEnifrI)

**[2D - Non-overlapping circles](https://github.com/herokunt/javascript_ramblings/blob/main/2D/overlap.js)**: Fill the screen with circles that will never overlap with each other! [See demo](https://editor.p5js.org/fall-parameter/sketches/hm3joNACl)

**[2D - Perlin Noise](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_perlin_noise.js)**: This is a visual representation of 2-dimensional Perlin noise. [See demo](https://editor.p5js.org/fall-parameter/sketches/oGkwnNowr)

**[2D - Phyllotaxis](https://github.com/herokunt/javascript_ramblings/blob/main/2D/phyllotaxis.js)**: A visualization of a common pattern found in nature such as the shape of some plants. [See demo](https://editor.p5js.org/fall-parameter/sketches/u7RBrO09p)

**[2D - Plinko](https://github.com/herokunt/javascript_ramblings/blob/main/2D/plinko.js)**: The game of Plinko built with Matter.js and P5.js as rendering engine. [See demo](https://editor.p5js.org/fall-parameter/sketches/FD9i-1nL0F)

![plinko](2D/assets/plinko.gif)

**[2D - Quadtree](https://github.com/herokunt/javascript_ramblings/blob/main/2D/quadtree.js)**: Visualization of a quadtree data structure for optimized performance in complex systems with interacting particles. [See demo](https://editor.p5js.org/fall-parameter/sketches/wPjwEOd-i)

![quadtree](2D/assets/quadtree.gif)

**[2D - Raycasting Rendering](https://github.com/herokunt/javascript_ramblings/blob/main/2D/raycasting_rendering.js)**: Implementation of a raycasting algorithm in p5.js à la Wolfenstein 3D, creating a 3D projection of the environment. [See demo](https://editor.p5js.org/fall-parameter/sketches/lDJjXSG6o)

![Raycast Rendering](2D/assets/raycast_render.gif)

**[2D - Raycasting](https://github.com/herokunt/javascript_ramblings/blob/main/2D/raycasting.js)**: Visualization of a light-emitting object using raycasting algorithm. [See demo](https://editor.p5js.org/fall-parameter/sketches/Mr6WzNe5E)

![Raycast Rendering](2D/assets/raycasting.gif)

**[2D - Snowfall](https://github.com/herokunt/javascript_ramblings/blob/main/2D/noc_snowfall.js)**: A snowfall effect using p5.js inspired by Daniel Shiffman's The Nature Of Code playlist. [See demo](https://editor.p5js.org/fall-parameter/sketches/KHmqjD_gx)

**[2D - Snake](https://github.com/herokunt/javascript_ramblings/blob/main/2D/snake.js)**: Another classic 8-bit game. [See demo](https://editor.p5js.org/fall-parameter/sketches/_B_A8i0d1)

![snake_game](2D/assets/snake.gif)

**[2D - Space Invaders](https://github.com/herokunt/javascript_ramblings/blob/main/2D/invaders.js)**: Another 8-bit classic game: space invaders!. [See demo](https://editor.p5js.org/fall-parameter/sketches/AULsRZPCm)

![Space Invaders](2D/assets/space_invaders.png)

**[2D - Steering Behaviors](https://github.com/herokunt/javascript_ramblings/blob/main/2D/steering_behavior.js)**: Particle system where each particle reacts to it's environment in a "lifelike" manner. [See demo](https://editor.p5js.org/fall-parameter/sketches/Po7qTPFag)

![steering behaviors](2D/assets/steering_behaviors.gif)

**[2D - Tetris](https://github.com/herokunt/javascript_ramblings/blob/main/2D/tetris.js)**: Another popular 8-bit classic: Tetris!. [See demo](https://editor.p5js.org/fall-parameter/sketches/-8YjzbeP0)

---
### [Invidious bookmarklet](https://github.com/herokunt/javascript_ramblings/blob/main/bookmarklets.js)

A simple bookmarklet that replaces references to Youtube links in the current page with Invidious instances. This `https://youtu.be/70MQ-FugwbI` becomes `https://invidious.site/70MQ-FugwbI`
