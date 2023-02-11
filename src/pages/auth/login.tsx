import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'

export function Login() {
  return (
    <View
      className={'bg-white h-screen w-screen overflow-hidden pt-[20px] px-5'}
    >
      <View className={'grid gap-2'}>
        <Avatar.Image source={require('../../../assets/img.png')} size={100} />
        <Text className={'font-bold text-2xl'}>登录HFUTHole</Text>
        <Text className={'text-gray-400'}>请输入你的信息门户账号和密码</Text>
        <View className={'mt-2'}>
          <Snackbar>
            <Text>1</Text>
          </Snackbar>
        </View>
      </View>
    </View>
  )
}
