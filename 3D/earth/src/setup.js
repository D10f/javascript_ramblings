import { Scene, PerspectiveCamera, WebGLRenderer, Group } from 'three';
import gsap from 'gsap';


/********** SETUP SCENE ***********/

export const scene = new Scene();


/********** SETUP CAMERA **********/

export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);


/********** GROUP **********/

export const group = new Group();


/********** SETUP RENDERER **********/

export const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


/********** MOUSE INTERACTION **********/

export const mouse = { x: undefined, y: undefined };

window.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 + 1;
});

export function mouseInteraction() {
  gsap.to(group.rotation, {
    x: mouse.y * 0.075,
    y: mouse.x * 0.1,
    duration: 4
  });
}
