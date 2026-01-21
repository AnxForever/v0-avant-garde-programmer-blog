import { renderHook, waitFor } from '@testing-library/react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

describe('useReducedMotion', () => {
  let matchMediaMock: jest.Mock

  beforeEach(() => {
    // Create a mock for matchMedia
    matchMediaMock = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return false when prefers-reduced-motion is not set', () => {
    const listeners: ((event: MediaQueryListEvent) => void)[] = []
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn((_, listener) => listeners.push(listener)),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(false)
  })

  it('should return true when prefers-reduced-motion is set', () => {
    const listeners: ((event: MediaQueryListEvent) => void)[] = []
    
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: jest.fn((_, listener) => listeners.push(listener)),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(true)
  })

  it('should update when media query changes', async () => {
    const listeners: ((event: MediaQueryListEvent) => void)[] = []
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn((_, listener) => listeners.push(listener)),
      removeEventListener: jest.fn(),
    })

    const { result } = renderHook(() => useReducedMotion())

    expect(result.current).toBe(false)

    // Simulate media query change
    listeners.forEach(listener => {
      listener({ matches: true } as MediaQueryListEvent)
    })

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerMock = jest.fn()
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
    })

    const { unmount } = renderHook(() => useReducedMotion())

    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
