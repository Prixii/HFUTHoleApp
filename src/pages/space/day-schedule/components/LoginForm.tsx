import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { LoginFormValidator } from '@/shared/validators/space/auth'
import { useMutation } from 'react-query'
import { LoginRequest } from '@/request/spaceApis/auth'
import { useAuth } from '@/pages/space/@utils/useSpaceAuth'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { AxiosError } from 'axios'
import { getQAQFont } from '@/shared/utils/utils'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Input } from '@/components/form/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { Button } from '@/components/button'

interface Props {
  onLogin?: () => void
}

export const LoginForm = ({ onLogin }: Props) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<LoginFormValidator>({
    resolver: classValidatorResolver(LoginFormValidator),
    mode: 'onChange',
  })

  const { login } = useAuth()

  const mutation = useMutation({
    retry: false,
    mutationFn: (data: LoginFormValidator) => LoginRequest(data),
    onError(error: AxiosError) {
      if (error.code) {
        setError('reqFailedError', {
          message:
            (error?.response?.data as any)?.msg ||
            `网络连接失败，可能是服务器炸了${getQAQFont('sadness')}`,
        })
      }
    },
    onSuccess({ data }) {
      login(data.data.token)
      onLogin?.()
    },
  })

  const onSubmit = useDebounce((data: LoginFormValidator) => {
    mutation.mutate({
      ...data,
      studentId: +data.studentId,
    })
  })

  return (
    <View className={'grid space-y-3'}>
      {errors?.reqFailedError && (
        <View className={'py-3'}>
          <Snackbar text={errors.reqFailedError.message} icon={'info'} error />
        </View>
      )}

      <View>
        <Input<LoginFormValidator>
          control={control}
          name={'studentId'}
          label={'学号'}
        />
      </View>

      <View>
        <PasswordInput<LoginFormValidator>
          control={control}
          name={'password'}
          label={'密码'}
        />
      </View>

      <View className={'mt-2'}>
        <Button
          mode={'contained'}
          className={`shadow-none w-full`}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          登录
        </Button>
      </View>
    </View>
  )
}
