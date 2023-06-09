import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { Image, View } from 'react-native'
import { BottomActions } from '@/pages/hole/post/BottomActions'
import { useHolePostContext } from '@/shared/context/hole'
import { Tags } from '@/components/tags'
import { MyAvatar } from '@/components/MyAvatar'
import { FormImage } from '@/components/form/FormImage'

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
      <FormImage
        imgs={imgs}
        onCloseable={(index) =>
          setImgs((draft) => {
            draft.splice(index, 1)
          })
        }
      />
      <View>
        <Image
          source={require('@/assets/emoji/0_[微笑]_weixiao.png')}
          style={{ resizeMode: 'cover' }}
          className={'w-6 h-6'}
        />
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
