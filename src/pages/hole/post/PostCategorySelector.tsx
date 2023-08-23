import { Pressable, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RightIcon } from '@/components/icon'
import { useHolePostContext } from '@/shared/context/hole'
import { HoleClassification } from '@/shared/enums/category.enum'
import React, { useMemo } from 'react'

interface CategorySelectorProps {
  category: HoleClassification | string
  setCategory: React.Dispatch<React.SetStateAction<HoleClassification | string>>
  title: string
  categories: string[]
  isSub?: boolean
}

const CategorySelector = ({
  category,
  setCategory,
  title,
  categories,
  isSub = false,
}: CategorySelectorProps) => {
  return (
    <View className={'flex-row items-center space-x-2'}>
      <View
        className={
          'flex-row border-[1px] border-[#004DFF] px-2 items-center justify-center rounded-full h-8'
        }
      >
        <Text className={'text-[#004DFF]'}>{title}</Text>
        <View>
          <RightIcon color={'#004dff'} />
        </View>
      </View>
      <ScrollView
        className={'flex-row p-2 space-x-2'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      >
        {categories.map((key) => {
          const classification = isSub
            ? key
            : HoleClassification[key as keyof typeof HoleClassification]
          const isSelected = classification === category

          return (
            <Pressable
              className={`px-2 py-1 items-center justify-center rounded-full h-8 ${
                isSelected ? 'border-[1px] border-[#004DFF]' : 'bg-surface/50'
              }`}
              onPress={() => setCategory(classification)}
              key={key}
            >
              <Text
                className={`${
                  isSelected ? 'text-[#004DFF]' : 'text-onSurface/60'
                }`}
              >
                #{classification}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const mainCategories = Object.keys(HoleClassification)

export function PostCategorySelector() {
  const { category, setCategory, subCategory, setSubCategory, subCategories } =
    useHolePostContext()

  return (
    <View>
      <CategorySelector
        category={category}
        setCategory={setCategory as any}
        title={'板块'}
        categories={mainCategories}
      />
      <CategorySelector
        category={subCategory!}
        setCategory={setSubCategory}
        title={'分区'}
        categories={subCategories}
        isSub={true}
      />
    </View>
  )
}
