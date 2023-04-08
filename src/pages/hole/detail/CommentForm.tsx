import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { View } from 'react-native'
import { getQAQFont, ScreenHeight } from '@/shared/utils/utils'
import { CommentPostFAB } from '@/pages/hole/detail/CommentPostFAB'
import { useState } from 'react'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/button'
import { Input } from '@/components/form/Input'
import { useForm } from 'react-hook-form'
import { Func } from '@/shared/types'
import { HoleDetailPostComment } from '@/shared/validators/hole.detail'
import { useMutation } from 'react-query'
import { PostHoleDetailCommentRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useHoleDetailId } from '@/shared/hooks/useHoleDetailId'
import { hideKeyboard } from '@/shared/utils/keyboard'
import { useHoleComment } from '@/swr/hole'

// TODO KeyboardAvoidingView
const Form = ({ toggle }: { toggle: Func }) => {
  const id = useHoleDetailId()
  const { control, handleSubmit } = useForm<HoleDetailPostComment>()
  const { refetch } = useHoleComment()

  const mutation = useMutation({
    mutationFn: (data: HoleDetailPostComment) =>
      PostHoleDetailCommentRequest(data),
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: '留言成功哦',
      })
      toggle()
      hideKeyboard()
      refetch<IHoleCommentListResponse>({
        refetchPage: (page, index) => {
          return Math.max(page.meta.totalPages - 1, 0) === index
        },
      })
    },
  })

  const onSubmit = (data: { body: string }) => {
    mutation.mutate({
      ...data,
      id,
    })
  }

  return (
    <>
      <View className={'flex w-full flex-row items-center justify-between'}>
        <IconButton
          icon={'close'}
          className={'bg-transparent'}
          onPress={toggle}
        />
        <Button mode={'contained'} onPress={handleSubmit(onSubmit)}>
          发送
        </Button>
      </View>
      <View>
        <Input
          name={'body'}
          control={control}
          multiline={true}
          outlineStyle={{ borderWidth: 0 }}
          style={{
            height: ScreenHeight * 0.2,
          }}
          placeholder={`请友善发言，我相信大家不想失去这个平台${getQAQFont(
            'happy'
          )}`}
        />
        <View className={'w-screen justify-between'}>
          <IconButton icon={'camera'} />
        </View>
      </View>
    </>
  )
}

export function CommentForm() {
  const [open, setOpen] = useState(false)

  const y = useDerivedValue(() => {
    return open ? -(ScreenHeight / 3) : 0
  }, [open])
  const opacity = useDerivedValue(() => {
    return open ? 1 : 0
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(y.value) }],
      opacity: withSpring(opacity.value),
    }
  })

  const toggle = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      {!open && <CommentPostFAB onPress={() => setOpen(true)} />}

      <View
        className={`absolute bottom-0 w-full items-center ${!open && 'h-0'}`}
      >
        <Animated.View
          style={[animatedStyle, { elevation: 3 }]}
          className={
            'bg-white rounded-lg p-2 w-11/12 max-w-[350px] grid space-y-1'
          }
        >
          {open && <Form toggle={toggle} />}
        </Animated.View>
      </View>
    </>
  )
}
