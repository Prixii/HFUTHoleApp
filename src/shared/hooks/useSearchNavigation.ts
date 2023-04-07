import { useNavigation } from '@react-navigation/native'

export function useSearchNavigation() {
  const navigation = useNavigation()

  const navigate = (keywords: string) => {
    // TODO 解决never类型问题
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('search', {
      screen: 'result',
      params: { keywords },
    })
  }

  const searchWithKeywords = (keywords: string) => {
    navigate(keywords)
  }

  return {
    searchWithKeywords,
  }
}
