import { useNavigation } from '@react-navigation/native'
import { HoleClassification } from '@/shared/enums/category.enum'

export type HoleCategoryNavigationCtx = {
  main: HoleClassification
  sub?: string
}

export function useHoleCategoryRoute() {
  const navigation = useNavigation()

  // TODO 中文 or 英文路由名？
  const go = (ctx: HoleCategoryNavigationCtx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('hole', {
      screen: 'category',
      params: {
        screen: 'latest',
        params: {
          category: ctx.main,
          subCategory: ctx.sub,
        },
      },
    })
  }

  return {
    go,
  }
}
