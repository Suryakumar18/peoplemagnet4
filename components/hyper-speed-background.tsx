"use client"

import { useEffect, useRef } from "react"

interface HyperSpeedProps {
  className?: string
  effectOptions?: {
    onSpeedUp?: () => void
    onSlowDown?: () => void
    distortion?: "turbulentDistortion" | "mountainDistortion" | "xyDistortion" | "LongRaceDistortion" | "deepDistortion"
    length?: number
    roadWidth?: number
    islandWidth?: number
    lanesPerRoad?: number
    fov?: number
    fovSpeedUp?: number
    speedUp?: number
    carLightsFade?: number
    totalSideLightSticks?: number
    lightPairsPerRoadWay?: number
    shoulderLinesWidthPercentage?: number
    brokenLinesWidthPercentage?: number
    brokenLinesLengthPercentage?: number
    lightStickWidth?: [number, number]
    lightStickHeight?: [number, number]
    movingAwaySpeed?: [number, number]
    movingCloserSpeed?: [number, number]
    carLightsLength?: [number, number]
    carLightsRadius?: [number, number]
    carWidthPercentage?: [number, number]
    carShiftX?: [number, number]
    carFloorSeparation?: [number, number]
    colors?: {
      roadColor?: number
      islandColor?: number
      background?: number
      shoulderLines?: number
      brokenLines?: number
      leftCars?: [number, number, number]
      rightCars?: [number, number, number]
      sticks?: number
    }
  }
}

export function HyperSpeedBackground({ className = "" }: HyperSpeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let stars: { x: number; y: number; z: number; color: string }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const numStars = 400
      const colors = [
        "rgba(55, 90, 180, 0.8)", // Navy blue
        "rgba(100, 149, 237, 0.7)", // Cornflower blue
        "rgba(144, 238, 144, 0.6)", // Light green (accent)
        "rgba(200, 220, 255, 0.9)", // Light blue white
        "rgba(70, 130, 180, 0.8)", // Steel blue
      ]

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(247, 245, 240, 0.15)" // Cream background with trail
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      stars.forEach((star) => {
        star.z -= 2 // Speed

        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width - centerX
          star.y = Math.random() * canvas.height - centerY
        }

        const sx = (star.x / star.z) * 300 + centerX
        const sy = (star.y / star.z) * 300 + centerY
        const size = Math.max(0.5, (1 - star.z / 1000) * 3)

        // Draw star trail
        const px = (star.x / (star.z + 10)) * 300 + centerX
        const py = (star.y / (star.z + 10)) * 300 + centerY

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = star.color
        ctx.lineWidth = size
        ctx.stroke()

        // Draw star point
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity: 0.4 }} />
  )
}
