import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

// Astronomical Unit
const AU = 20

function main() {
  const canvas = document.getElementById('canvas')

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas })

  // Scene
  const scene = new THREE.Scene()

  // Light - PointLight projects light in all directions from a single point
  const color = 0xFFFFFF
  const intensity = 3
  const light = new THREE.PointLight(color, intensity)
  scene.add(light)

  // Camera - looking downwards
  const fov = 75
  const aspect = 2
  const near = 10
  const far = 60
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 20, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  // Orbit controls allow to control the camera with events like mouse clicks
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()

  const objects = []

  // SPHERE - default low-polygon sphere for all planets
  const radius = 1
  const widthSegments = 12
  const heightSegments = 12
  const sphereGeometry = new THREE.SphereBufferGeometry(
    radius, widthSegments, heightSegments
  )

  /**
    * Object3D is a virtual instance that has no material nor shape, with the
    * purpose of grouping other meshes together under a same node.
    */

  // SOLAR SYSTEM MESH - node in the scene to group planets
  const solarSystem = new THREE.Object3D()
  scene.add(solarSystem)
  objects.push(solarSystem)

  // SUN
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFEE11 })
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial)

  // All objects share the same sphere, we control size of each like so
  sunMesh.scale.set(5, 5, 5)
  solarSystem.add(sunMesh)
  objects.push(sunMesh)

  // MERCURY
  const mercuryMaterial = new THREE.MeshLambertMaterial({ color: 0xCCd133 })
  const mercuryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial)
  mercuryMesh.position.x = AU * .4
  mercuryMesh.scale.set(.3, .3, .3)
  solarSystem.add(mercuryMesh)
  objects.push(mercuryMesh)

  // VENUS
  const VenusMaterial = new THREE.MeshLambertMaterial({ color: 0xEEDD77 })
  const VenusMesh = new THREE.Mesh(sphereGeometry, VenusMaterial)
  VenusMesh.position.x = AU * .7
  VenusMesh.scale.set(.9, .9, .9)
  solarSystem.add(VenusMesh)
  objects.push(VenusMesh)

  // EARTH ORBIT
  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.x = AU * 1
  solarSystem.add(earthOrbit)
  objects.push(earthOrbit)

  // EARTH
  const earthMaterial = new THREE.MeshLambertMaterial({ color: 0x2233FF, emissive: 0x112244, flatShading: true })
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial)
  earthOrbit.add(earthMesh)
  objects.push(earthMesh)

  // MOON ORBIT
  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 2
  earthOrbit.add(moonOrbit)
  objects.push(moonOrbit)

  // MOON
  const moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, emissive: 0x222222, flatShading: true })
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial)
  moonMesh.scale.set(.35, .35, .35)
  moonOrbit.add(moonMesh)
  objects.push(moonMesh)

  // MARS
  const marsMaterial = new THREE.MeshLambertMaterial({ color: 0xBB4300 })
  const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial)
  marsMesh.position.x = AU * 1.5
  marsMesh.scale.set = (.5, .5, .5)
  solarSystem.add(marsMesh)
  objects.push(marsMesh)

  function render(time) {
    time *= 0.0005

    objects.forEach((obj, idx) => {
      obj.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
