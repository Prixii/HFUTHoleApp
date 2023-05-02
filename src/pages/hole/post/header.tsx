import { useMutation } from 'react-query'
import { PostHoleValidator } from '@/shared/validators/hole'
import { PostHoleRequest, UploadHoleImgRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useHolePostContext } from '@/shared/context/hole'
import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'

export function HolePostHeader() {
  const navigation = useNavigation()

  const {
    form: { handleSubmit },
    imgs,
    votes,
  } = useHolePostContext()

  const mutation = useMutation({
    mutationFn: async (data: PostHoleValidator) => {
      const resultImage = await UploadHoleImgRequest(imgs)

      return PostHoleRequest({
        ...data,
        imgs: resultImage,
        ...(votes.items.length > 0
          ? {
              vote: {
                endTime: format(votes.endTime, 'yyyy-MM-dd HH:mm:ss'),
                items: votes.items.map((i) => i.value),
              },
            }
          : ({} as any)),
      })
    },
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: (data.msg as string) || '成功发布树洞',
      })
      navigation.goBack()
    },
  })

  const onSubmit = async (data: PostHoleValidator) => {
    mutation.mutate(data)
  }

  return (
    <BackAndButtonHeader
      onPress={handleSubmit(onSubmit)}
      loading={mutation.isLoading}
      submitText={'发布'}
    />
  )
}
