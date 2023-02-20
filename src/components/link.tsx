import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface Props {
  to: string

  children: ReactNode

  className?: string
}

export const Link: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const handleNavigation = () => {
    navigation.navigate(props.to)
  }

  return (
    <Text
      className={`text-xs text-[#00AB55] underline font-bold ${props.className}`}
      onPress={handleNavigation}
    >
      {props.children}
    </Text>
  )
}
