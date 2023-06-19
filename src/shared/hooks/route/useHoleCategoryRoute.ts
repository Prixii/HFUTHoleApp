import { useNavigation } from '@react-navigation/native'
import { ArticleCategoryEnum } from '@/shared/enums'

export function useHoleCategoryRoute() {
  const navigation = useNavigation()

  const go = (category: ArticleCategoryEnum) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'category',
      params: {
        screen: 'latest',
        params: {
          category: category,
        },
      },
    })
  }

  return {
    go,
  }
}
