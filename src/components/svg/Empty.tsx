import { View } from 'react-native'
import EmptySvg from '@/assets/svg/empty.svg'
import { SvgProps } from 'react-native-svg'
import { getQAQFont } from '@/shared/utils/utils'
import { SecondaryText } from '@/components/Text/SecondaryText'

interface Props extends SvgProps {
  text?: string
}

export function Empty({ text = '没有更多数据了哦', ...props }: Props) {
  return (
    <View className={'w-full grid items-center space-y-4'}>
      <EmptySvg width={100} height={100} {...props} />
      <View>
        <SecondaryText>{`${text}${getQAQFont('happy')}`}</SecondaryText>
      </View>
    </View>
  )
}
