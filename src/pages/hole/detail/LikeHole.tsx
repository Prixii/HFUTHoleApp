import { useHoleDetail } from '@/swr/hole'
import { useMutation } from 'react-query'
import { DeleteLikeHoleRequest, PostLikeHoleRequest } from '@/request/apis/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { LikeIcon } from '@/components/icon'
import { Text } from 'react-native-paper'
import React from 'react'

export const LikeHole = () => {
  const { invalidate, data } = useHoleDetail()

  const mutation = useMutation(
    ['like', data],
    (id: number) => {
      const reqFunc = data.isLiked ? DeleteLikeHoleRequest : PostLikeHoleRequest

      return reqFunc({ id })
    },
    {
      async onSuccess() {
        await invalidate()
      },
    }
  )

  const likeHole = useDebounce(async () => {
    mutation.mutate(data.id)
  })

  return (
    <View className={'flex justify-center items-center'}>
      <IconButton
        icon={() => (
          <LikeIcon {...(data.isLiked ? {} : { color: 'gray' })} size={20} />
        )}
        transparent={true}
        onPress={likeHole}
      />
      <Text className={'text-xs text-black/50'}>{data.favoriteCounts}</Text>
    </View>
  )
}
