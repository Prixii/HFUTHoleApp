import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { AuthView } from '@/pages/auth/AuthView'
import { useMutation } from 'react-query'
import { RegisterRequest } from '@/request/apis/auth'
import { RegisterFormValidator } from '@/shared/validators/auth'
import { AxiosError } from 'axios'
import { useDebounceFn } from 'ahooks'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ScreenWrapper } from '@/components/ScrollWrapper'

interface Inputs {
  username: string

  studentId: string

  password: string

  hfutPassword: string
}

const RegisterForm = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<Inputs>({
    resolver: classValidatorResolver(RegisterFormValidator),
    mode: 'onChange',
  })

  const mutation = useMutation(
    (data: RegisterFormValidator) => RegisterRequest(data),
    {
      onError(error: AxiosError) {
        console.log(error)
      },
    }
  )

  const { run: onSubmit } = useDebounceFn((data: RegisterFormValidator) => {
    console.log(data)
  })

  return (
    <View className={''}>
      <Input<Inputs>
        control={control}
        name={'username'}
        label={'取一个好听的名字吧≖‿≖✧'}
      />
      <Input<Inputs> control={control} name={'studentId'} label={'学号'} />

      <PasswordInput<Inputs>
        control={control}
        name={'password'}
        label={'密码'}
      />

      <PasswordInput<Inputs>
        control={control}
        name={'hfutPassword'}
        label={'请输入信息门户密码'}
      />

      <Button
        mode={'contained'}
        className={'shadow-none w-full'}
        onPress={handleSubmit(onSubmit)}
      >
        注册
      </Button>
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
