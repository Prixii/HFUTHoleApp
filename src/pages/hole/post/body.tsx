import { Input } from '@/components/form/Input'
import { ScreenHeight, WindowHeight } from '@/shared/utils/utils'
import { View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useHolePostContext } from '@/shared/context/hole'
import { Tags } from '@/components/tags'
import { FormImage } from '@/components/form/FormImage'
import { useTheme } from 'react-native-paper'
import { useState } from 'react'
import { HolePostHeader } from '@/pages/hole/post/header'
import { HolePostForm } from '@/pages/hole/post/Form'
import { MyAvatar } from '@/components/UserAvatar'

export function HolePostBody() {
  const {
    tags,
    imgs,
    setImgs,
    form: { control },
  } = useHolePostContext()

  const [bottomHeight, setBottomHeight] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)

  return (
    <View>
      <View className={'px-2'}>
        <View
          onLayout={(e) => {
            setHeaderHeight(e.nativeEvent.layout.height)
          }}
        >
          <HolePostHeader />
        </View>
        <HolePostForm bottomHeight={bottomHeight} headerHeight={headerHeight} />
      </View>
      <View
        onLayout={(e) => {
          setBottomHeight(e.nativeEvent.layout.height)
        }}
        className={'bg-white'}
      >
        <BottomActions />
      </View>
    </View>
  )
}
