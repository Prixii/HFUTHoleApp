import { Image, ImageProps, View } from 'react-native'
import { getQAQFont } from '@/shared/utils/utils'
import { SecondaryText } from '@/components/Text/SecondaryText'

interface Props extends Partial<ImageProps> {
  text?: string

  size?: number
}

export function ListEmpty({
  text = '今天没有安排哦，放松一下吧',
  ...props
}: Props) {
  return (
    <View className={'w-full grid items-center space-y-4'}>
      <Image
        source={require('@/assets/img/list-empty.png')}
        {...props}
        style={{
          width: props.size || 100,
          height: props.size || 100,
          ...props,
        }}
      />
      <View>
        <SecondaryText>{`${text}${getQAQFont('happy')}`}</SecondaryText>
      </View>
    </View>
  )
}
