import React, { ReactNode } from 'react'
import { Text } from 'react-native'

interface Props {
  url: string

  children: ReactNode
}

export const Link: React.FC<Props> = (props) => {
  return (
    <Text className={'text-xs text-[#00AB55] underline font-bold'}>
      {props.children}
    </Text>
  )
}
