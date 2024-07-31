import { useState, useCallback, useMemo } from 'react'

/**
 * 
 */
export const useToggle = (initialState: boolean) => {
  const [value, setValue] = useState(initialState)
  
  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const enable = useCallback(() => {
    setValue(true)
  }, [])

  const disable = useCallback(() => {
    setValue(false)
  }, [])

  const actions = useMemo(() => ({
    toggle,
    enable,
    disable
  }), [toggle, enable, disable])

  return [value, actions] as const
}