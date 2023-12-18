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
import { SafeAreaView } from 'react-native-safe-area-context'

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
      [schedule],
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
          <SafeAreaView className={'flex-1'} edges={['bottom']}>
            <ScheduleSheetContent schedule={schedule} />
            {schedule.type === 'Diy' ? (
              <CustomScheduleBottomButton
                onDelete={handleDelete}
                onUpdate={onUpdateSchedule}
              />
            ) : (
              <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
                <TouchableRipple onPress={goCourseFailureRatePage}>
                  <View className={'p-5'}>
                    <Text className={'text-center text-white font-[800]'}>
                      查看挂科率
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            )}
          </SafeAreaView>
        ) : null}
      </BottomActionSheet>
    )
  },
)
