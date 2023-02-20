import { View } from 'react-native'
import { Avatar, Button, Checkbox } from 'react-native-paper'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Text } from 'react-native'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { useNavigation } from '@react-navigation/native'

interface Inputs {
  username: string

  studentId: string

  password: string

  hfutPassword: string
}

const RegisterForm = () => {
  const { control } = useForm<Inputs>()

  return (
    <View className={'grid space-y-3'}>
      <Input<Inputs>
        control={control}
        name={'username'}
        label={'取一个好听的名字吧≖‿≖✧'}
      />
      <Input<Inputs> control={control} name={'studentId'} label={'学号'} />
      <View>
        <PasswordInput<Inputs>
          control={control}
          name={'password'}
          label={'密码'}
        />
      </View>

      <PasswordInput<Inputs>
        control={control}
        name={'hfutPassword'}
        label={'请输入信息门户密码'}
      />
      <View>
        <Button
          mode={'contained'}
          className={'p-1 rounded-lg shadow-none w-full'}
        >
          注册
        </Button>
      </View>
    </View>
  )
}

export function Register() {
  const navigation = useNavigation()

  return (
    <View
      className={'bg-white h-screen w-screen overflow-hidden pt-[20px] px-5'}
    >
      <View className={'grid gap-5'}>
        <Avatar.Image source={require('../../../assets/img.png')} size={100} />
        <View className={'grid space-y-2'}>
          <Text className={'font-bold text-2xl'}>注册HFUTHole</Text>
          <Text className={'text-gray-400'}>请输入你的账号和密码</Text>
        </View>
        <View className={'mt-2'}>
          <Snackbar text={'注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦'} icon={'info'} />
          <View className={'mt-2'}>
            <RegisterForm />
          </View>
        </View>
      </View>
    </View>
  )
}
