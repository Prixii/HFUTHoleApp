import { SearchHeader } from '@/components/search/header'
import { SearchHistory } from '@/components/search/history'
import { View } from 'react-native'
import { useSpaceCourseFailureSearchQuery } from '@/swr/space/course/failure'
import { useState, FC, PropsWithChildren } from 'react'
import { ScrollView } from 'react-native'
import { TouchableRipple, Text, ActivityIndicator } from 'react-native-paper'
import { useSpaceCourseRoute } from '@/shared/hooks/route/useSpaceCourseRoute'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { operateFailureSearchData } from '@/store/reducer/search'

const Loading = ({
  loading,
  children,
}: PropsWithChildren<{ loading: boolean }>) => {
  return (
    <View className="w-full items-center">
      {loading ? <ActivityIndicator /> : children}
    </View>
  )
}

export const CourseFailureSearch = () => {
  const [keyword, setKeyword] = useState('')
  const serachHistory = useAppSelector((state) => state.search.failure)
  const dispatch = useAppDispatch()
  const { goCourseFailureRatePage } = useSpaceCourseRoute()

  const { data, isLoading } = useSpaceCourseFailureSearchQuery(keyword)

  const deleteAllHistory = () => {
    dispatch(operateFailureSearchData(() => []))
  }

  const deleteHistory = (index: number) => {
    dispatch(operateFailureSearchData((draft) => draft.splice(index, 1)))
  }

  const handlePress = (courseName: string) => {
    dispatch(
      operateFailureSearchData((draft) => {
        draft.unshift(courseName)
      })
    )
    goCourseFailureRatePage(courseName)
  }

  const onDeleteInput = () => setKeyword('')

  return (
    <View className="flex-1">
      <SearchHeader
        onSubmit={(data) => setKeyword(data.keywords)}
        onDeleteInput={onDeleteInput}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {keyword ? (
          <View className="px-4 w-full">
            <Loading loading={isLoading}>
              {data?.options.map((item) => (
                <TouchableRipple
                  key={item}
                  className="py-3 w-full border-b border-gray-300"
                  onPress={() => handlePress(item)}
                >
                  <Text>{item}</Text>
                </TouchableRipple>
              ))}
            </Loading>
          </View>
        ) : (
          <View className="px-2">
            <SearchHistory
              searchHistroyList={serachHistory}
              onDeleteAllHistory={deleteAllHistory}
              onDeleteHistory={deleteHistory}
              onHistoryItemClick={(courseName) =>
                goCourseFailureRatePage(courseName)
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}
