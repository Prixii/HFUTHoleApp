import { Image, View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import { Text } from 'react-native-paper'
import { useHoleCategoryList } from '@/swr/hole/category'

export function CategoryDetailHeader() {
  const { category } = useHoleCategoryList()

  return (
    <>
      <View className={'h-48'}>
        <Image className={'h-48 w-full'} source={{ uri: category?.url }} />
      </View>
      <View className={'bg-white rounded-lg mt-[-10] px-2 py-4 space-y-2'}>
        <View className={'flex-row mt-[-5] space-x-2'}>
          <View className={'mt-[-30]'}>
            <Svg SvgComponent={category.icon} size={60} />
          </View>
          <Text variant={'titleMedium'} className={'self-start'}>
            {category.name}
          </Text>
        </View>
        <Text variant={'bodySmall'}>{category.description}</Text>
      </View>
    </>
  )
}
