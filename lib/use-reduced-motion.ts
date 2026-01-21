"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook to detect user's prefers-reduced-motion preference
 * Returns true if the user prefers reduced motion
 * 
 * This hook respects the user's accessibility preferences and helps
 * skip loading animation libraries when motion is reduced.
 * 
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === "undefined") {
      return
    }

    // Create media query to detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Create listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add listener for changes
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}
