import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { AuthView } from '@/pages/auth/AuthView'

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
  return (
    <AuthView
      title={'注册HFUTHole'}
      secondary={'请输入你的账号密码'}
      snackbar={'注册之前需要绑定一下你的信息门户账号来证明你是工大学子哦'}
    >
      <RegisterForm />
    </AuthView>
  )
}
