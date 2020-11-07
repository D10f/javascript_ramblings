import * as THREE from 'three'

function main() {
  const canvas = document.getElementById('canvas')

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas })

  // Scene
  const scene = new THREE.Scene()

  // Camera
  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2

  // Geometry
  const width = 0.75
  const height = 0.75
  const depth = 0.75
  const geometry = new THREE.BoxGeometry(width, height, depth)

  // Material (not in use)
  // const color = 0xCF2DAF
  // const material = new THREE.MeshPhongMaterial({ color: color })

  // Cube instances
  const cubes = [
    makeCube(geometry, 0xCC2DA1, { x: -2, y: 0 }),
    makeCube(geometry, 0x54A9FF, { x: 0, y: 0 }),
    makeCube(geometry, 0x7AFF23, { x: 2, y: 0 })
  ]

  // Lights
  const color = 0xFFFFFF
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 2)
  scene.add(light)

  const secondLight = new THREE.DirectionalLight(0xE5E5E5, 0.5)
  secondLight.position.set(-1, -2, 0)
  scene.add(secondLight)

  // Animation
  requestAnimationFrame(render)

  // Utility functions
  function makeCube(geometry, color, position) {
    const material = new THREE.MeshPhongMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)

    cube.position.x = position.x
    cube.position.y = position.y

    scene.add(cube)

    return cube
  }

  function render(time){

    time *= 0.001

    cubes.forEach((cube, idx) => {
      cube.rotation.x = time * 0.5
      cube.rotation.y = time * 0.5
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
}

main()
