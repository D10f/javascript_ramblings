import { Clock } from 'three';
import { scene, camera, renderer, group, mouse, mouseInteraction } from './setup';
import { stars } from './stars';
import { Earth, Atmosphere } from './globe';

const FRAME_RATE = 60;
const clock = new Clock();
const interval = 1 / FRAME_RATE;
let delta = 0;

group.add(Earth);
group.add(Atmosphere);
scene.add(stars);
scene.add(group);

Earth.rotation.y = -1.75;
Atmosphere.rotation.y = -1.75;
Earth.rotation.x = 0.4;
Atmosphere.rotation.x = 0.4;

function animate() {

  if (waitForNextTick()) {
    return requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (mouse.x >= 0) {
    Earth.rotation.y += 0.005;
    Atmosphere.rotation.y += 0.005;
  } else {
    Earth.rotation.y -= 0.005;
    Atmosphere.rotation.y -= 0.005;
  }
  
  mouseInteraction();
}

function waitForNextTick() {
  delta += clock.getDelta();
  const isDelayed = delta <= interval;

  delta = delta % interval;
  return isDelayed;
}

animate();
