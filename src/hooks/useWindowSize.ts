import { useState, useEffect, useCallback } from 'react'
import { debounce } from '@/lib/utils'
import { PERFORMANCE_CONFIG } from '@/constants'

/**
 * Custom hook for tracking window size with debouncing
 * @param debounceDelay - The debounce delay in milliseconds (default: 250ms)
 * @returns The current window size { width, height }
 */
export function useWindowSize(debounceDelay: number = PERFORMANCE_CONFIG.DEBOUNCE.RESIZE) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  const debouncedUpdateWindowSize = useCallback(
    debounce(updateWindowSize, debounceDelay),
    [updateWindowSize, debounceDelay]
  )

  useEffect(() => {
    // Set initial window size
    updateWindowSize()

    // Add event listener
    window.addEventListener('resize', debouncedUpdateWindowSize, { passive: true })

    return () => {
      window.removeEventListener('resize', debouncedUpdateWindowSize)
    }
  }, [debouncedUpdateWindowSize, updateWindowSize])

  return windowSize
}
