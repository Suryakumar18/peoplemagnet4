"use client"

import { useEffect, useRef, useCallback } from "react"

interface FloatingLinesProps {
  enabledWaves?: ("top" | "middle" | "bottom")[]
  lineCount?: number[] | number
  lineDistance?: number[] | number
  bendRadius?: number
  bendStrength?: number
  interactive?: boolean
  parallax?: boolean
  animationSpeed?: number
}

interface Line {
  x: number
  y: number
  originalY: number
  length: number
  speed: number
  angle: number
  opacity: number
  width: number
  wave: "top" | "middle" | "bottom"
  bendOffset: number
  phase: number
  amplitude: number
  frequency: number
  pulsePhase: number
  pulseSpeed: number
}

export function FloatingLinesBackground({
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [12, 18, 24],
  lineDistance = [6, 4, 2],
  bendRadius = 8.0,
  bendStrength = -0.8,
  interactive = true,
  parallax = true,
  animationSpeed = 1,
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const scrollRef = useRef(0)
  const timeRef = useRef(0)

  const getLineCount = useCallback(
    (wave: "top" | "middle" | "bottom") => {
      const index = wave === "top" ? 0 : wave === "middle" ? 1 : 2
      return Array.isArray(lineCount) ? lineCount[index] : lineCount
    },
    [lineCount],
  )

  const getLineDistance = useCallback(
    (wave: "top" | "middle" | "bottom") => {
      const index = wave === "top" ? 0 : wave === "middle" ? 1 : 2
      return Array.isArray(lineDistance) ? lineDistance[index] : lineDistance
    },
    [lineDistance],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lines: Line[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createLines = () => {
      lines = []

      enabledWaves.forEach((wave) => {
        const count = getLineCount(wave)
        const distance = getLineDistance(wave)

        const yRange =
          wave === "top"
            ? [0, canvas.height * 0.33]
            : wave === "middle"
              ? [canvas.height * 0.33, canvas.height * 0.66]
              : [canvas.height * 0.66, canvas.height]

        for (let i = 0; i < count; i++) {
          const waveIndex = wave === "top" ? 0 : wave === "middle" ? 1 : 2
          const y = yRange[0] + Math.random() * (yRange[1] - yRange[0])
          
          lines.push({
            x: Math.random() * canvas.width,
            y,
            originalY: y,
            length: 100 + Math.random() * 150,
            speed: (0.2 + Math.random() * 0.4) * animationSpeed,
            angle: Math.random() * Math.PI * 0.3 - Math.PI * 0.15,
            opacity: 0.06 + Math.random() * 0.08,
            width: 0.8 + Math.random() * 2,
            wave,
            bendOffset: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            amplitude: 3 + Math.random() * 4,
            frequency: 0.001 + Math.random() * 0.002,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.001 + Math.random() * 0.002,
          })
        }
      })
    }

    const animate = (time: number) => {
      timeRef.current = time
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add a subtle background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      )
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)')
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        // Enhanced wave motion with multiple frequencies
        const waveMotion1 = Math.sin(time * line.frequency + line.phase) * line.amplitude
        const waveMotion2 = Math.cos(time * line.frequency * 1.7 + line.phase * 1.3) * (line.amplitude * 0.3)
        const waveMotion3 = Math.sin(time * line.frequency * 0.5 + line.phase * 0.7) * (line.amplitude * 0.2)
        
        line.y = line.originalY + waveMotion1 + waveMotion2 + waveMotion3

        // Pulsating opacity
        const pulse = (Math.sin(time * line.pulseSpeed + line.pulsePhase) + 1) * 0.5
        const currentOpacity = line.opacity * (0.7 + pulse * 0.3)

        // Enhanced movement with slight acceleration
        line.x += Math.cos(line.angle) * line.speed * (1 + Math.sin(time * 0.0005) * 0.3)

        // Parallax effect based on scroll
        if (parallax) {
          const parallaxFactor = line.wave === "top" ? 0.15 : line.wave === "middle" ? 0.08 : 0.04
          line.y += scrollRef.current * parallaxFactor
        }

        // Enhanced interactive bend with velocity
        if (interactive) {
          const dx = mouseRef.current.x - line.x
          const dy = mouseRef.current.y - line.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < bendRadius * 80) {
            const force = (1 - dist / (bendRadius * 80)) * bendStrength * 25
            const velocityInfluence = Math.sqrt(mouseRef.current.vx * mouseRef.current.vx + mouseRef.current.vy * mouseRef.current.vy) * 0.1
            line.bendOffset = Math.atan2(dy, dx) + force + velocityInfluence
          }
        }

        // Wrap around screen with smooth transitions
        if (line.x < -line.length * 2) {
          line.x = canvas.width + line.length
          line.y = Math.random() * canvas.height
        }
        if (line.x > canvas.width + line.length * 2) {
          line.x = -line.length
          line.y = Math.random() * canvas.height
        }

        // Enhanced curved line with multiple control points
        const bendAmount = Math.sin(time * 0.003 + line.bendOffset) * 40
        const bendAmount2 = Math.cos(time * 0.002 + line.bendOffset * 1.5) * 20
        
        const midX1 = line.x + Math.cos(line.angle) * line.length * 0.33
        const midY1 = line.y + Math.sin(line.angle) * line.length * 0.33 + bendAmount * 0.3
        const midX2 = line.x + Math.cos(line.angle) * line.length * 0.66
        const midY2 = line.y + Math.sin(line.angle) * line.length * 0.66 + bendAmount
        const endX = line.x + Math.cos(line.angle) * line.length
        const endY = line.y + Math.sin(line.angle) * line.length + bendAmount2

        // Create gradient with enhanced colors
        const lineGradient = ctx.createLinearGradient(line.x, line.y, endX, endY)

        const isTopWave = line.wave === "top"
        const isMiddleWave = line.wave === "middle"

        if (isTopWave) {
          // Navy blue with enhanced glow
          lineGradient.addColorStop(0, `rgba(30, 64, 175, 0)`)
          lineGradient.addColorStop(0.3, `rgba(30, 64, 175, ${currentOpacity * 0.7})`)
          lineGradient.addColorStop(0.5, `rgba(59, 130, 246, ${currentOpacity})`)
          lineGradient.addColorStop(0.7, `rgba(34, 197, 94, ${currentOpacity * 0.6})`)
          lineGradient.addColorStop(1, `rgba(34, 197, 94, 0)`)
        } else if (isMiddleWave) {
          // Green with enhanced glow
          lineGradient.addColorStop(0, `rgba(34, 197, 94, 0)`)
          lineGradient.addColorStop(0.3, `rgba(34, 197, 94, ${currentOpacity * 0.8})`)
          lineGradient.addColorStop(0.5, `rgba(74, 222, 128, ${currentOpacity})`)
          lineGradient.addColorStop(0.7, `rgba(30, 64, 175, ${currentOpacity * 0.7})`)
          lineGradient.addColorStop(1, `rgba(30, 64, 175, 0)`)
        } else {
          // Dark navy with subtle green
          lineGradient.addColorStop(0, `rgba(20, 30, 70, 0)`)
          lineGradient.addColorStop(0.4, `rgba(20, 30, 70, ${currentOpacity * 0.8})`)
          lineGradient.addColorStop(0.6, `rgba(30, 64, 175, ${currentOpacity * 0.6})`)
          lineGradient.addColorStop(0.8, `rgba(100, 180, 100, ${currentOpacity * 0.4})`)
          lineGradient.addColorStop(1, `rgba(100, 180, 100, 0)`)
        }

        // Draw bezier curve for smoother lines
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.bezierCurveTo(midX1, midY1, midX2, midY2, endX, endY)
        ctx.strokeStyle = lineGradient
        ctx.lineWidth = line.width
        ctx.lineCap = "round"
        
        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = isTopWave ? 'rgb(30, 64, 175)' : isMiddleWave ? 'rgb(34, 197, 94)' : 'rgb(20, 30, 70)'
        ctx.stroke()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    let lastMouseX = 0
    let lastMouseY = 0
    let lastTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime
      
      if (deltaTime > 0) {
        mouseRef.current.vx = (e.clientX - lastMouseX) / deltaTime
        mouseRef.current.vy = (e.clientY - lastMouseY) / deltaTime
      }
      
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      lastTime = currentTime
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    const handleMouseLeave = () => {
      mouseRef.current.vx = 0
      mouseRef.current.vy = 0
    }

    resize()
    createLines()
    animationFrameId = requestAnimationFrame(animate)

    window.addEventListener("resize", () => {
      resize()
      createLines()
    })

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    if (parallax) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [enabledWaves, getLineCount, getLineDistance, bendRadius, bendStrength, interactive, parallax, animationSpeed])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
      style={{ opacity: 0.8 }}
    />
  )
}