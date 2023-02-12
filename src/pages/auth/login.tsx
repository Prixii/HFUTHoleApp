import { View } from 'react-native'
import { Avatar, Button, Checkbox } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Text } from 'react-native'
import { Link } from '@/components/Link'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { useNavigation } from '@react-navigation/native'

interface Inputs {
  studentId: string

  password: string
}

const LoginForm = () => {
  const { control } = useForm<Inputs>()

  return (
    <View className={'grid space-y-3'}>
      <Input<Inputs> control={control} name={'studentId'} label={'学号'} />
      <View>
        <PasswordInput<Inputs>
          control={control}
          name={'password'}
          label={'密码'}
        />
      </View>

      <View className={'flex flex-row justify-between items-center'}>
        <Checkbox status={'checked'} />
        <Link url={'https://baidu.com'}>忘记密码？点我找回</Link>
      </View>

      <View className={'pt-2'}>
        <Button mode={'contained'} className={'p-1 rounded-lg shadow-none'}>
          登录
        </Button>
      </View>

      <View className={'pt-10'}>
        <Text className={'text-center'}>还没有账号？点我注册</Text>
      </View>
    </View>
  )
}

export function Login() {
  const navigation = useNavigation()

  return (
    <View
      className={'bg-white h-screen w-screen overflow-hidden pt-[20px] px-5'}
    >
      <View className={'grid gap-5'}>
        <Avatar.Image source={require('../../../assets/img.png')} size={100} />
        <View className={'grid space-y-2'}>
          <Text className={'font-bold text-2xl'}>登录HFUTHole</Text>
          <Text className={'text-gray-400'}>请输入你的账号和密码</Text>
        </View>
        <View className={'mt-2'}>
          <Snackbar
            text={
              '第一次登录时并不需要注册，若无账号则直接输入好学号以及预设密码点击登录即可，也可点击下方的注册文字前往注册页面'
            }
            icon={'info'}
          />
          <View className={'mt-2'}>
            <LoginForm />
          </View>
        </View>
      </View>
    </View>
  )
}
