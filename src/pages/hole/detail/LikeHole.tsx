import React from 'react'
import { useHoleDetail } from '@/swr/hole'
import { useMutation } from 'react-query'
import { DeleteLikeHoleRequest, PostLikeHoleRequest } from '@/request/apis/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { LikeIcon } from '@/components/icon'
import { Text } from 'react-native-paper'

export const LikeHole = () => {
  const { toggleIsLike, data } = useHoleDetail()

  const mutation = useMutation(
    ['like', data],
    (id: number) => {
      const reqFunc = data!.isLiked
        ? DeleteLikeHoleRequest
        : PostLikeHoleRequest

      return reqFunc({ id })
    },
    {
      async onSuccess() {
        await toggleIsLike()
      },
    }
  )

  const likeHole = useDebounce(
    async () => {
      mutation.mutate(data!.id)
    },
    { wait: 50 }
  )

  return (
    <View className={'flex justify-center items-center'}>
      <IconButton
        icon={() => <LikeIcon active={data!.isLiked} size={20} />}
        transparent={true}
        onPress={likeHole}
      />
      <Text className={'text-xs text-black/50'}>{data!.favoriteCounts}</Text>
    </View>
  )
}
