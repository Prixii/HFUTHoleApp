import { ArticleCategoryEnum } from '@/shared/enums'
import { Pressable, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RightIcon } from '@/components/icon'
import { useHolePostContext } from '@/shared/context/hole'

const keys = Object.keys(ArticleCategoryEnum)

export function PostCategorySelector() {
  const { category, setCategory } = useHolePostContext()

  return (
    <View className={'flex-row items-center space-x-2'}>
      <View
        className={
          'flex-row border-[1px] border-[#004DFF] px-2 items-center justify-center rounded-full h-8'
        }
      >
        <Text className={'text-[#004DFF]'}>板块</Text>
        <View>
          <RightIcon color={'#004dff'} />
        </View>
      </View>
      <ScrollView
        className={'flex-row p-2 space-x-2'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {keys.map((key) => {
          const isSelected = ArticleCategoryEnum[key] === category

          return (
            <Pressable
              className={`px-2 py-1 items-center justify-center rounded-full h-8 ${
                isSelected ? 'border-[1px] border-[#004DFF]' : 'bg-surface/50'
              }`}
              onPress={() => setCategory(ArticleCategoryEnum[key])}
            >
              <Text
                className={`${
                  isSelected ? 'text-[#004DFF]' : 'text-onSurface/60'
                }`}
              >
                #{ArticleCategoryEnum[key]}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
