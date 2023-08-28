import { MyAvatar } from '@/components/UserAvatar'
import { useImagePicker } from '@/shared/hooks/useImagePicker'
import { ProfileItemWithEventProps } from '@/pages/user/profile/edit/singal'
import { UploadHoleImgRequest } from '@/request/apis/hole'
import { useMutation } from 'react-query'
import { PostUserProfileRequest } from '@/request/apis/user'
import { Toast } from '@/shared/utils/toast'
import { useUserProfile } from '@/swr/user/profile'

export function EditProfileAvatar({ event }: ProfileItemWithEventProps) {
  const { refetch } = useUserProfile()

  const { onImageSelect } = useImagePicker({
    async onSuccess(imgs) {
      const result = await UploadHoleImgRequest(imgs.assets)

      console.log(result[0], result)
      mutation.mutate(result[0])
    },
    onError() {},
  })

  const mutation = useMutation({
    mutationFn: (avatar: string) =>
      PostUserProfileRequest({
        avatar,
      }),
    onSuccess() {
      Toast.success({
        text1: '成功修改头像！',
      })

      refetch()
    },
  })

  event.useSubscription((type) => type === 'avatar' && onImageSelect())

  return <MyAvatar size={50} />
}
