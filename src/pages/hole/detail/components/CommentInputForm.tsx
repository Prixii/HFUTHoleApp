import { View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { CameraIcon, EmojiIcon } from '@/components/icon'
import { NativeInput } from '@/components/form/NativeInput'
import { EmojiItem } from '@/assets/emoji'
import { EmojiArea } from '@/components/emoji/EmojiArea'
import React, { useState } from 'react'
import { Button } from '@/components/button'
import { hideKeyboard } from '@/shared/utils/keyboard'
import { useMutation } from 'react-query'
import { UploadHoleImgRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'
import { useSelectImage } from '@/shared/hooks/useSelectImage'
import { FormImage } from '@/components/form/FormImage'
import { useHoleDetailId } from '@/shared/hooks/useHoleDetailId'
import { useBottomCommentContext } from '@/shared/context/hole/comment'

interface Props {
  onCommentSuccess: () => void
}

export function CommentInputForm(props: Props) {
  const id = useHoleDetailId()
  const {
    form: {
      setValue,
      getValues,
      control,
      formState: { isDirty },
      handleSubmit,
    },
    isReply,
    data,
    reqFunc,
  } = useBottomCommentContext()

  const [showEmojiArea, setShowEmojiArea] = useState(false)

  const mutation = useMutation({
    mutationFn: reqFunc,
    onSuccess() {
      Toast.show({
        type: 'success',
        text1: '留言成功哦',
      })
      hideKeyboard()
      props.onCommentSuccess()
    },
  })

  const onEmojiSelect = (emoji: EmojiItem) => {
    setValue('body', `${getValues('body') || ''}${emoji.name}`, {
      shouldDirty: true,
    })
  }

  const toggleEmojiArea = () => {
    setShowEmojiArea((prev) => {
      if (!prev) {
        hideKeyboard()
      }
      return !prev
    })
  }

  const { onSelectImage, imgs, setImgs } = useSelectImage({
    selectionLimit: 2,
  })

  const onSubmit = async (data: { body: string }) => {
    const result = await UploadHoleImgRequest(imgs)
    mutation.mutate({
      body: data.body,
      imgs: result,
      id,
    })
  }

  return (
    <View className={'border-t-[1px] border-t-black/5 bg-white'}>
      <View
        className={'p-2 flex flex-row items-center justify-between space-x-2'}
      >
        <View className={'px-2 flex-1 bg-[#F3F3F3] rounded-2xl'}>
          <View className={'px-2 pt-2'}>
            <NativeInput
              control={control}
              name={'body'}
              placeholder={
                isReply
                  ? `回复 ${data.user!.username}：`
                  : '你若安不好，屁股给你拍八瓣'
              }
              multiline={true}
              style={{
                maxHeight: 16 * 4,
              }}
              onFocus={() => setShowEmojiArea(false)}
              autoFocus={true}
            />
          </View>
          <View
            className={
              'flex flex-row space-x-2 justify-between items-center py-2'
            }
          >
            <IconButton
              icon={() => <CameraIcon size={24} />}
              onPress={onSelectImage}
            />
            <FormImage
              imgs={imgs}
              onCloseable={(index) =>
                setImgs((draft) => {
                  draft!.splice(index, 1)
                })
              }
            />
            <View className={'flex flex-row space-x-4'}>
              {/*<AtIcon size={24} />*/}
              <IconButton
                icon={() => <EmojiIcon size={24} />}
                onPress={toggleEmojiArea}
              />
            </View>
          </View>
        </View>
        <Button
          mode={'contained'}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          发送
        </Button>
      </View>
      <View className={'py-2'}>
        <EmojiArea onEmojiSelect={onEmojiSelect} expandArea={showEmojiArea} />
      </View>
    </View>
  )
}
