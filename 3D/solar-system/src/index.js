import {
  Clock,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from "three/src/Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import earthImg from "./assets/earth.jpg";
import moonImg from "./assets/moon.jpg";

import "./styles.scss";

/**
 * INITIALIZE VARIABLES
 */
const SHOW_WIREFRAMES = true;
const AU = 20; // astronomical unit

const canvas = document.getElementById("webgl");
const scene = new Scene();
const gui = new dat.GUI();
const textureLoader = new TextureLoader();

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * CAMERA & CONTROLS
 */
const aspectRatio = windowSize.width / windowSize.height;
const camera = new PerspectiveCamera(45, aspectRatio, 1, 1000);
// camera.position.set(10, 40, 30);
camera.position.set(0, 40, 0);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * OBJECTS
 */

const sunOrbit = new Object3D();
const earthOrbit = new Object3D();

const sphereGeometry = new SphereGeometry(1);

const sun = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    wireframe: SHOW_WIREFRAMES,
    emissive: "yellow",
    // color: "orange",
  })
);
sun.scale.set(5, 5, 5);

const mercuryPlane = new Object3D();
const mercury = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    wireframe: SHOW_WIREFRAMES,
    emissive: "darkslategray",
    color: "darkslategray",
  })
);
mercury.scale.set(0.055, 0.055, 0.055);
mercury.position.set(AU * 0.4, 0, 0);
mercuryPlane.rotation.y = Math.floor(Math.random() * 100);
mercuryPlane.add(mercury);

const venusPlane = new Object3D();
const venus = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    wireframe: SHOW_WIREFRAMES,
    emissive: "orangered",
    color: "orangered",
  })
);
venus.scale.set(0.815, 0.815, 0.815);
venus.position.set(AU * 0.7, 0, 0);
venusPlane.rotation.y = Math.floor(Math.random() * 100);
venusPlane.add(venus);

const earthPlane = new Object3D();
const earth = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    map: textureLoader.load(earthImg),
    wireframe: SHOW_WIREFRAMES,
    emissive: "blue",
    color: "blue",
  })
);

const moon = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    map: textureLoader.load(moonImg),
    wireframe: SHOW_WIREFRAMES,
    emissive: "gray",
    color: "gray",
  })
);
moon.scale.set(0.0123, 0.0123, 0.0123);
moon.position.set(2, 0, 0);

const marsPlane = new Object3D();
const mars = new Mesh(
  sphereGeometry,
  new MeshPhongMaterial({
    wireframe: SHOW_WIREFRAMES,
    emissive: "orangered",
    // color: "orangered",
  })
);
mars.scale.set(0.107, 0.107, 0.107);
mars.position.set(AU * 1.5, 0, 0);
marsPlane.rotation.y = Math.floor(Math.random() * 100);
marsPlane.add(mars);

earthOrbit.position.set(AU, 0, 0);
earthOrbit.rotation.y = Math.floor(Math.random() * 100);
earthOrbit.add(earth, moon);
earthPlane.add(earthOrbit);

sunOrbit.add(sun, mercuryPlane, venusPlane, earthPlane, marsPlane);

scene.add(sunOrbit);

/**
 * LIGHT
 */
// const light = new AmbientLight({ color: 0xffffff });
// const light = new PointLight({ color: 0xffffff });
// light.position.set(0, 20, 0);
// scene.add(light);

/**
 * RENDERER
 */
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(windowSize.width, windowSize.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor(new Color("#21282A"), 1);
// renderer.shadowMap.enabled = true;

/**
 * ANIMATION LOOP
 */

const clock = new Clock();

function mainLoop() {
  const elapsedTime = clock.getElapsedTime();

  // Not really needed?
  // sunOrbit.rotation.y = elapsedTime * 0.025;

  mercuryPlane.rotation.y += 0.005 * 1.6;
  mercury.rotation.y += 0.005 * 0.68;

  venusPlane.rotation.y += 0.005 * 1.17;
  venus.rotation.y += 0.005 * 0.41;

  /**
   * Earth is used as the reference for other measurements
   */
  earthPlane.rotation.y += 0.005;
  earth.rotation.y += 0.005;

  marsPlane.rotation.y += 0.005 * 0.8;
  mars.rotation.y += 0.005 * 0.55;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

/**
 * EVENT LISTENERS
 */
window.addEventListener("resize", () => {
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;

  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();

  renderer.setSize(windowSize.width, windowSize.height);
});

window.addEventListener("dblclick", () => {
  const isFullScreenCapable =
    document.fullscreenElement || document.webkitFullScreenElement;
  const isWebkit = document.webkitFullScreenElement;

  if (isFullScreenCapable) {
    if (isWebkit) {
      document.webkitExitFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  if (isWebkit) {
    canvas.webkitRequestFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});
