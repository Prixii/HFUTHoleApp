import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { IconButton } from '@/components/IconButton'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { PostHoleRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useDebounceFn } from 'ahooks'
import { HolePostBody } from '@/pages/hole/post/body'
import { HolePostContextProvider } from '@/shared/context/hole'

export function HolePost() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostHoleValidator>({
    resolver: classValidatorResolver(PostHoleValidator),
  })

  const navigation = useNavigation()

  const mutation = useMutation({
    mutationFn: (data: PostHoleValidator) => PostHoleRequest(data),
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: data.msg,
      })
    },
  })

  const { run: onSubmit } = useDebounceFn(
    (data: PostHoleValidator) => {
      mutation.mutate(data)
    },
    { wait: 200 }
  )

  return (
    <HolePostContextProvider>
      <View className={'min-h-screen bg-#EAE8FE space-y-2'}>
        <View className={'flex flex-row justify-between items-center'}>
          <IconButton
            icon={'close'}
            className={'bg-transparent'}
            onPress={() => navigation.goBack()}
          />
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            发布
          </Button>
        </View>
        <HolePostBody control={control} />
      </View>
    </HolePostContextProvider>
  )
}
