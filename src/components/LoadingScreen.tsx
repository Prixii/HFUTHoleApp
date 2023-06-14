import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react-native'
import { View } from 'react-native'
import { SecondaryText } from '@/components/Text/SecondaryText'

interface Props {
  isLoading: boolean
  children: React.ReactNode
}

export function LoadingScreen(props: Props) {
  const animationRef = useRef<Lottie>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [props.isLoading])

  return (
    <>
      {loading ? (
        <View
          className={
            'bg-white w-full h-full flex-row items-center justify-center'
          }
        >
          <View className={'flex space-y-1 items-center'}>
            <Lottie
              ref={animationRef}
              source={require('@/assets/lottie/loading.json')}
              style={{
                width: 200,
                height: 200,
              }}
              autoPlay
            />
            <SecondaryText>加载中...</SecondaryText>
          </View>
        </View>
      ) : (
        props.children
      )}
    </>
  )
}
