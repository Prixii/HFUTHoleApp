import { IconButton } from '@/components/IconButton'
import { Button } from 'react-native-paper'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { PostHoleValidator } from '@/shared/validators/hole'
import { PostHoleRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useHolePostContext } from '@/shared/context/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'

export function HolePostHeader() {
  const navigation = useNavigation()

  const {
    form: { handleSubmit },
  } = useHolePostContext()

  const mutation = useMutation({
    mutationFn: (data: PostHoleValidator) => PostHoleRequest(data),
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: data.msg,
      })
    },
  })

  const onSubmit = useDebounce((data: PostHoleValidator) => {
    mutation.mutate(data)
  })

  return (
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
  )
}
