import { useCallback, useEffect } from 'react'
import useSWR from 'swr'

export const themeStorageKey = 'theme'

const isServer = typeof window === 'undefined'
const getTheme = () => {
  if (isServer) return 'dark'
  return localStorage.getItem(themeStorageKey) || 'dark'
}

const setLightMode = () => {
  try {
    localStorage.setItem(themeStorageKey, 'light')
    document.documentElement.classList.add('light')
  } catch (err) {
    console.error(err)
  }
}

const setDarkMode = () => {
  try {
    localStorage.setItem(themeStorageKey, 'dark')
    document.documentElement.classList.remove('light')
  } catch (err) {
    console.error(err)
  }
}

const disableAnimation = () => {
  const css = document.createElement('style')
  css.type = 'text/css'
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(css).opacity)()
    document.head.removeChild(css)
  }
}

const useTheme = () => {
  const { data: theme, mutate } = useSWR(themeStorageKey, getTheme, {
    initialData: getTheme()
  })

  const setTheme = useCallback(
    newTheme => {
      mutate(newTheme, false)
    },
    [mutate]
  )

  useEffect(() => {
    const enable = disableAnimation()

    if (theme === 'dark') {
      setDarkMode()
    } else {
      setLightMode()
    }

    enable()
  }, [theme])

  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(!theme || theme === 'dark' ? 'light' : 'dark')
  }
}

export default useTheme
