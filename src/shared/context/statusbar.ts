import { createStore } from 'hox'
import { useTheme } from 'react-native-paper'
import { useState } from 'react'
import { StatusBarProps } from 'react-native'

export const [useStatusBarContext, StatusBarContextProvider] = createStore(
  () => {
    const theme = useTheme()
    const [color, setColor] = useState(theme.colors.background)
    const [barStyle, setBarStyle] =
      useState<StatusBarProps['barStyle']>('dark-content')

    const setWhiteColor = () => setColor('#fff')
    const setBackgroundColor = () => setColor(theme.colors.background)

    return {
      color,
      setColor,
      barStyle,
      setBarStyle,
      setWhiteColor,
      setBackgroundColor,
    }
  }
)
