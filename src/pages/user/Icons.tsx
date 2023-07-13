import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { Svg } from '@/components/svg/Svg'
import LikeSvg from '@/assets/svg/like.svg'
import DenoSvg from '@/assets/svg/deno.svg'

export function UserIcons() {
  return (
    <View className={'space-y-4'}>
      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index} className={'bg-white px-2 py-4 rounded-xl'}>
          <View className={'flex-row items-center space-x-2 px-2'}>
            <Svg SvgComponent={DenoSvg} size={25} color={'#000'} />
            <Text variant={'titleMedium'}>课表服务</Text>
          </View>
          <View className={'flex-row space-y-2 flex-wrap items-center'}>
            {Array.from({ length: 7 }).map((_, index) => (
              <View className={'w-1/4 rounded-lg overflow-hidden'} key={index}>
                <TouchableRipple onPress={() => {}}>
                  <View className={'flex space-y-2 items-center py-2'}>
                    <Svg size={40} SvgComponent={LikeSvg} />
                    <Text>我的收藏</Text>
                  </View>
                </TouchableRipple>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  )
}
