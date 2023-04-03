import { Appbar, Text } from 'react-native-paper'
import { TouchableOpacity, View } from 'react-native'
import { SearchIcon } from '@/components/icon'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import React, { useCallback } from 'react'
import { useHoleListContext } from '@/shared/context/hole'
import { HoleListMode } from '@/shared/enums'

const SearchBar = () => {
  return (
    <View
      className={
        'bg-white/40 rounded-full w-full py-2 px-3 flex flex-row space-x-2 items-center'
      }
    >
      <SearchIcon color={'gray'} size={20} />
      <Text className={'text-gray-500'}>搜索</Text>
    </View>
  )
}

const Animation = {
  active: {
    color: '#00AB55',
    fontSize: 24,
  },
  inactive: {
    color: '#86D0A8',
    fontSize: 16,
  },
}

export const SelectListHoleListMode = () => {
  const { mode, setMode } = useHoleListContext()

  const randomFontsizeShared = useDerivedValue(() => {
    return mode === HoleListMode.random
      ? Animation.active.fontSize
      : Animation.inactive.fontSize
  }, [mode])
  const randomColorShared = useDerivedValue(() => {
    return mode === HoleListMode.random
      ? Animation.active.color
      : Animation.inactive.color
  }, [mode])
  const timelineFontsizeShared = useDerivedValue(() => {
    return mode === HoleListMode.timeline
      ? Animation.active.fontSize
      : Animation.inactive.fontSize
  }, [mode])
  const timelineColorShared = useDerivedValue(() => {
    return mode === HoleListMode.timeline
      ? Animation.active.color
      : Animation.inactive.color
  }, [mode])

  const randomStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(randomFontsizeShared.value),
      color: withSpring(randomColorShared.value),
      fontWeight: mode === HoleListMode.random ? 'bold' : 'normal',
    }
  })

  const timelineStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(timelineFontsizeShared.value),
      color: withSpring(timelineColorShared.value),
      fontWeight: mode === HoleListMode.timeline ? 'bold' : 'normal',
    }
  })

  const handleToggle = useCallback(
    (received: HoleListMode) => {
      if (received === mode) {
        return
      }

      setMode(received)
    },
    [mode]
  )

  return (
    <View className={'w-full flex flex-row space-x-1 items-center'}>
      <TouchableOpacity onPress={() => handleToggle(HoleListMode.random)}>
        <Animated.Text style={[randomStyle]}>随机漫步</Animated.Text>
      </TouchableOpacity>
      <Text className={'text-2xl text-[#00AB55]/70 font-bold'}>/</Text>
      <TouchableOpacity>
        <Animated.Text
          onPress={() => handleToggle(HoleListMode.timeline)}
          style={[timelineStyle]}
        >
          时间轴
        </Animated.Text>
      </TouchableOpacity>
    </View>
  )
}

export function HoleHeader() {
  return (
    <View className={'bg-transparent grid space-y-2'}>
      <SelectListHoleListMode />
      <View>
        <SearchBar />
      </View>
    </View>
  )
}
