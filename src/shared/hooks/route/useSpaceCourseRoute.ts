import { useNavigation } from '@react-navigation/native'

export function useSpaceCourseRoute() {
  const navigation = useNavigation()

  const goCourseFailureRatePage = (courseName: string) => {
    navigation.navigate('space-nested', {
      screen: 'course-failure-query',
      params: {
        courseName,
      },
    })
  }

  return {
    goCourseFailureRatePage,
  }
}
