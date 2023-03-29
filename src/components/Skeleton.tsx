import { Skeleton, VStack, Center } from 'native-base'
import { View } from 'react-native'

interface Props {
  nums: number
}

export function SkeletonLoading(props: Props) {
  return (
    <View className={'grid gap-2'}>
      {Array.from({ length: props.nums }).map((_, index) => (
        <VStack
          key={index}
          w="100%"
          maxW="400"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          pb={5}
          px={5}
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton size="16" rounded={'full'} />
          <Skeleton h="20" rounded={'lg'} />
          <Skeleton.Text px="4" />
        </VStack>
      ))}
    </View>
  )
}
