import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { ArticleCategoryEnum } from '@/shared/enums'
import { View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import { Text } from 'react-native-paper'

const Categories = [
  { name: ArticleCategoryEnum.hfutLife, svg: HFUTLifeSvg },
  { name: ArticleCategoryEnum.taoSecondHand, svg: SecondHandSvg },
  { name: ArticleCategoryEnum.lostAndFound, svg: LostAndFoundSvg },
  { name: ArticleCategoryEnum.study, svg: StudySvg },
  { name: ArticleCategoryEnum.cat, svg: CatSvg },
  { name: ArticleCategoryEnum.love, svg: YourNameSvg },
  { name: ArticleCategoryEnum.ACG, svg: BilibiliSvg },
]

export function HomeCategories() {
  return (
    <View className={'bg-white p-2 rounded-lg'}>
      <View className={'flex flex-row flex-wrap space-y-4 items-center'}>
        {Categories.map((category) => {
          return (
            <View
              key={category.name}
              className={
                'w-1/5 flex flex-col justify-center items-center space-y-2'
              }
            >
              <Svg size={26} SvgComponent={category.svg} />
              <Text variant={'bodySmall'}>{category.name}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
