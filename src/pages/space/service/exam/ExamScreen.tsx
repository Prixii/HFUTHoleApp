import { View, ScrollView } from 'react-native'
import { useSpaceData, type ExamInfo } from '@/shared/hooks/useSpaceData'
import { Text } from 'react-native-paper'
import { format, formatDistanceToNow } from 'date-fns'
import LocationSvg from '@/assets/svg/icons/location.svg'
import ClockSvg from '@/assets/svg/icons/clock.svg'
import { Svg } from '@/components/svg/Svg'
import { type ReactNode } from 'react'

export const Exam = () => {
  const { exams } = useSpaceData()

  return (
    <ScrollView className="w-full min-h-full ">
      <View className="w-full px-4 py-10 space-y-5">
        {exams.map((examInfo) => (
          <View key={examInfo.detail.name}>
            <Card examInfo={examInfo} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const Card = ({ examInfo }: { examInfo: ExamInfo }) => {
  return (
    <View
      className={`relative w-full rounded-md ${
        examInfo.isExpired ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      {!examInfo.isExpired && (
        <View className="absolute right-2 p-2">
          <Text className="text-red-500/80">
            {formatDistanceToNow(examInfo.startDate)}
          </Text>
        </View>
      )}

      <View className="space-y-3 p-3">
        <View className="flex flex-row justify-between">
          <CardText isExpired={examInfo.isExpired}>
            {examInfo.detail.name}
          </CardText>
          {examInfo.isExpired && (
            <CardText isExpired={examInfo.isExpired}>已考完</CardText>
          )}
        </View>
        <View className="flex flex-row">
          <Svg SvgComponent={ClockSvg} size={20} />
          <CardText isExpired={examInfo.isExpired}>
            {`${format(examInfo.startDate, 'MM-dd HH:mm')} - ${format(
              examInfo.endDate,
              'HH:mm'
            )}`}
          </CardText>
        </View>
        <View className="flex flex-row">
          <Svg SvgComponent={LocationSvg} size={20} />
          <CardText isExpired={examInfo.isExpired}>
            {examInfo.detail.position}
          </CardText>
        </View>
      </View>
    </View>
  )
}

interface CardTextProps {
  isExpired: boolean
  children: ReactNode
}

const CardText = ({ isExpired, children }: CardTextProps) => {
  return (
    <Text className={`${isExpired ? 'text-gray-500' : 'text-black/80'}`}>
      {children}
    </Text>
  )
}
