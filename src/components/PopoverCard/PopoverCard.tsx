/**
 * @author prixii
 * @date 2023-09-19 19
 */

import { useEffect, useRef, useState } from 'react'
import Animated, { EasingNode } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { WindowHeight } from '@/shared/utils/utils'

const easingFunction = EasingNode.bezier(0.84, 0, 0.88, 1)

export const PopoverCard = (props: {
  child: React.ReactNode
  coordinateY?: number
}) => {
  let defaultOpacity = 1
  const opacity = new Animated.Value(defaultOpacity)
  const componentRef = useRef(null)
  const [componentHeight, setComponentHeight] = useState(0)

  const styleSheet = StyleSheet.create({
    absolutePosition: {
      width: '100%',
      position: 'absolute',
    },
    bottomPosition: {
      // top: windowHeight - componentHeight - 20
      bottom: 20,
    },
    anywhere: {
      top: props.coordinateY ?? 40,
    },
  })

  /**
   * 计算本组件出现的位置，如果 组件高度+点击位置高度 > 视口大小, 则只出现在底部
   * 否则就出现在点击的地方
   * @returns 对应的css样式
   */
  const generatePosition = () => {
    if (componentHeight + (props.coordinateY ?? 0) > WindowHeight) {
      return styleSheet.bottomPosition
    } else {
      return styleSheet.anywhere
    }
  }
  const [absolutePosition, setAbsolutePosition] = useState(generatePosition())

  const [showPopover, setShowPopover] = useState(true)

  const generatePointerEvents = (): 'box-none' | 'none' =>
    showPopover ? 'box-none' : 'none'

  const [customPointerEvents, setPointerEvents] = useState(
    generatePointerEvents()
  )

  useEffect(() => {
    getComponentHeight()
    setPointerEvents(generatePointerEvents())
    setAbsolutePosition(generatePosition())
  }, [])

  const getComponentHeight = () => {
    if (componentRef.current) {
      let ref = componentRef.current as any
      ref.measure((_x: number, _y: number, _width: number, height: number) => {
        setComponentHeight(height)
      })
    }
  }

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      easing: easingFunction,
    }).start()
  }

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: easingFunction,
    }).start()
  }

  return (
    <View
      pointerEvents={customPointerEvents}
      ref={componentRef}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    >
      <Animated.View
        style={[
          styleSheet.absolutePosition,
          absolutePosition,
          { overflow: 'hidden', opacity: opacity },
        ]}
      >
        {props.child}
      </Animated.View>
    </View>
  )
}
