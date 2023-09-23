import { ScheduleSheetContent } from '@/pages/space/components/ScheduleSheet/ScheduleSheetContent'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { forwardRef, MutableRefObject, useMemo } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSpaceCourseRoute } from '@/shared/hooks/route/useSpaceCourseRoute'
import { CustomScheduleBottomButton } from './CustomScheduleBottomButton'
import { useSpaceCourse } from '@/swr/space/course'
import { deleteScheduleRequest } from '@/request/space/user'
import { useCurrentSemester } from '@/shared/context/space/semester'
import type { UnitSchedule } from '@/pages/space/@utils/types'

interface Props {
  schedule?: UnitSchedule
  onUpdate?: (schedule: UnitSchedule) => void
}

export const ScheduleSheet = forwardRef<BottomSheetModal, Props>(
  ({ schedule, onUpdate }, ref) => {
    const sheetRef = ref as MutableRefObject<BottomSheetModal>
    const route = useSpaceCourseRoute()
    const { selectedSemesterId } = useCurrentSemester()
    const { refetch } = useSpaceCourse()

    const snapPoints = useMemo(
      () =>
        schedule
          ? schedule.type === 'Diy'
            ? ['40%', '60%']
            : ['60%', '80%']
          : ['60%', '80%'],
      [schedule]
    )

    const closeSheet = () => {
      sheetRef.current.close()
    }

    const goCourseFailureRatePage = () => {
      route.goCourseFailureRatePage(schedule?.courseName)
      closeSheet()
    }

    const handleDelete = () => {
      deleteScheduleRequest(schedule!.diyId, selectedSemesterId)
      closeSheet()
      refetch()
    }

    const onUpdateSchedule = () => {
      onUpdate?.(schedule!)
      sheetRef.current.dismiss()
    }

    return (
      <BottomActionSheet
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: 'white' }}
        footerText={'查看挂科率'}
      >
        {schedule ? (
          <>
            <ScheduleSheetContent schedule={schedule} />
            {schedule.type === 'Diy' ? (
              <CustomScheduleBottomButton
                onDelete={handleDelete}
                onUpdate={onUpdateSchedule}
              />
            ) : (
              <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
                <TouchableRipple onPress={goCourseFailureRatePage}>
                  <View className={'p-4'}>
                    <Text className={'text-center text-white font-[800]'}>
                      查看挂科率
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            )}
          </>
        ) : null}
      </BottomActionSheet>
    )
  }
)
