import { FieldErrors, useForm } from 'react-hook-form'
import { CommentReplyValidator } from '@/shared/validators/hole/reply'
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator'
import { useHoleComment } from '@/swr/hole'
import { useMutation } from 'react-query'
import { SWRKeys } from '@/swr/utils'
import { PostHoleCommentReplyRequest } from '@/request/apis/hole'
import { Toast } from '@/shared/utils/toast'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { View } from 'react-native'
import { Input } from '@/components/form/Input'
import { ScreenHeight } from '@/shared/utils/utils'
import { Button } from 'react-native-paper'
import React from 'react'
import { AwaitAble, AwaitFunc, Func } from '@/shared/types'

interface Props {
  data: IHoleCommentListItem
  closeModal: Func
  reqFunc: (body: string) => AwaitAble
  invalidAll: AwaitFunc
}

export function ReplyForm({ data, closeModal, reqFunc, invalidAll }: Props) {
  const { control, handleSubmit } = useForm<CommentReplyValidator>({
    mode: 'all',
    resolver: classValidatorResolver(CommentReplyValidator),
  })

  const mutation = useMutation({
    mutationKey: SWRKeys.hole.mutateCommentReply,
    mutationFn: ({ body }: CommentReplyValidator) => reqFunc(body),
    onSuccess() {
      Toast.success({
        text1: '回复成功',
      })
      closeModal()
      invalidAll()
    },
  })

  const onSubmit = useDebounce((data: CommentReplyValidator) => {
    mutation.mutate(data)
  })

  const onError = (error: FieldErrors<CommentReplyValidator>) => {
    Toast.error({
      text1: error.body.message,
    })
  }

  return (
    <View className={'w-full flex flex-row justify-between items-center'}>
      <View className={'flex-1'}>
        <Input
          control={control}
          name={'body'}
          multiline={true}
          numberOfLines={4}
          autoFocus={true}
          style={{
            height: ScreenHeight * 0.2,
            fontSize: 14,
          }}
          outlineStyle={{ borderWidth: 0 }}
          placeholder={`回复 @${data?.user?.username}:`}
        />
      </View>
      <Button
        mode={'contained'}
        onPress={handleSubmit(onSubmit, onError)}
        loading={mutation.isLoading}
      >
        回复
      </Button>
    </View>
  )
}
