"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function Ethereum3DModel({
  className = "",
  autoRotate = true,
  enableZoom = false,
}: {
  className?: string
  autoRotate?: boolean
  enableZoom?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    // Set up scene
    const scene = new THREE.Scene()
    scene.background = null // Transparent background

    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 5

    // Set up renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add a cyan point light for teal/cyan glow
    const cyanLight = new THREE.PointLight(0x00ffff, 2)
    cyanLight.position.set(1, 1, 2)
    scene.add(cyanLight)

    // Add a purple point light for violet/pink glow
    const purpleLight = new THREE.PointLight(0xff00cc, 2)
    purpleLight.position.set(-2, 1, 3)
    scene.add(purpleLight)

    // Add a blue point light
    const blueLight = new THREE.PointLight(0x0088ff, 1.5)
    blueLight.position.set(0, -2, 1)
    scene.add(blueLight)

    // Add a spotlight for extra definition
    const spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.position.set(5, 5, 5)
    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 0.2
    scene.add(spotLight)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = enableZoom
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 3

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    // Load the model
    const loader = new GLTFLoader()
    loader.load(
      "/base_basic_shaded.glb", // This will be the path to your GLB file
      (gltf: any) => {
        const model = gltf.scene
        
        // Apply custom materials for neon effect
        model.traverse((child: any) => {
          if (child.isMesh) {
            // Create a glowing material
            const material = new THREE.MeshStandardMaterial({
              color: 0x00ffff, // Cyan base color
              emissive: 0x00ffff, // Cyan glow
              emissiveIntensity: 0.4,
              metalness: 0.8,
              roughness: 0.2,
            })
            
            // Add second UV set for light map
            child.material = material
          }
        })
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3.5 / maxDim
        model.scale.multiplyScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        scene.add(model)
        setLoading(false)
      },
      (xhr: any) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      (error: any) => {
        console.error("An error happened loading the model:", error)
      },
    )

    // Initial sizing
    if (containerRef.current) {
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      containerRef.current.appendChild(renderer.domElement)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()
    handleResize()
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [autoRotate, enableZoom])

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-400 border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
