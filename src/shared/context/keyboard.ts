import { createStore } from 'hox'
import { Keyboard } from 'react-native'
import { useEffect, useState } from 'react'

export const [useKeyboardContext, KeyboardContextProvider] = createStore(() => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return {
    isKeyboardOpen,
  }
})
