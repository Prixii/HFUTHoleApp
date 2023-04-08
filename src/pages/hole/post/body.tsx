import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useHolePostContext } from '@/shared/context/hole'
import { Tags } from '@/components/tags'
import { MyAvatar } from '@/components/MyAvatar'
import { Image } from 'react-native'
import { Closeable } from '@/components/Closeable'

export function HolePostBody() {
  const {
    tags,
    imgs,
    setImgs,
    form: { control },
  } = useHolePostContext()

  return (
    <View className={'rounded-lg bg-white p-3 grid space-y-3 mt-3 relative'}>
      <MyAvatar />
      <View>
        <Tags tags={tags} />
      </View>
      <View className={'flex flex-row space-x-2'}>
        {imgs.map((img, index) => (
          <View>
            <Image
              source={{ uri: img.uri }}
              resizeMode={'cover'}
              className={'w-20 h-20 rounded-lg'}
            />
            <Closeable
              onPress={() => {
                setImgs((draft) => {
                  draft.splice(index, 1)
                })
              }}
            />
          </View>
        ))}
      </View>
      <View>
        <Input
          name={'body'}
          control={control}
          multiline={true}
          style={{
            height: ScreenHeight * 0.5,
          }}
        />
      </View>
      <BottomActions />
    </View>
  )
}
