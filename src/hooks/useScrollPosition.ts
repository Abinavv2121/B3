import { useState, useEffect, useCallback } from 'react'
import { throttle } from '@/lib/utils'
import { PERFORMANCE_CONFIG } from '@/constants'

/**
 * Custom hook for tracking scroll position with throttling
 * @param throttleDelay - The throttle delay in milliseconds (default: 16ms for 60fps)
 * @returns The current scroll position { x, y }
 */
export function useScrollPosition(throttleDelay: number = PERFORMANCE_CONFIG.THROTTLE.SCROLL) {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })

  const updateScrollPosition = useCallback(() => {
    setScrollPosition({
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    })
  }, [])

  const throttledUpdateScrollPosition = useCallback(
    throttle(updateScrollPosition, throttleDelay),
    [updateScrollPosition, throttleDelay]
  )

  useEffect(() => {
    // Set initial scroll position
    updateScrollPosition()

    // Add event listener
    window.addEventListener('scroll', throttledUpdateScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollPosition)
    }
  }, [throttledUpdateScrollPosition, updateScrollPosition])

  return scrollPosition
}
