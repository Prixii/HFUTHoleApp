import { ScheduleSheetContent } from '@/pages/space/day-schedule/components/ScheduleSheetContent'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import React, { forwardRef, MutableRefObject } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { CourseSchedule, Schedule } from '@/pages/space/@utils/types'
import { useSpaceCourseRoute } from '@/shared/hooks/route/useSpaceCourseRoute'

interface Props {
  schedule: CourseSchedule | Schedule
}

export const ScheduleSheet = forwardRef<BottomSheetModal, Props>(
  ({ schedule }, ref) => {
    const sheetRef = ref as MutableRefObject<BottomSheetModal>

    const route = useSpaceCourseRoute()

    const closeSheet = () => {
      sheetRef.current.close()
    }

    const goCourseFailureRatePage = () => {
      route.goCourseFailureRatePage(schedule.courseName)
      closeSheet()
    }
    return (
      <BottomActionSheet
        ref={ref}
        snapPoints={['60%', '80%']}
        backgroundStyle={{ backgroundColor: 'white' }}
        footerText={'查看挂科率'}
      >
        <ScheduleSheetContent schedule={schedule} />
        <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
          <TouchableRipple onPress={goCourseFailureRatePage}>
            <View className={'p-4'}>
              <Text className={'text-center text-white font-[800]'}>
                查看挂科率
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </BottomActionSheet>
    )
  }
)
