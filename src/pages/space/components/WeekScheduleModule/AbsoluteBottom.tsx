import { View } from 'react-native'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'
import { useSemesters } from '@/swr/space/chore'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { Button, Text, TouchableRipple } from 'react-native-paper'
import { MutableRefObject, ReactNode, useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface RoundedTouchableRippleProps {
  children: ReactNode
  onPress?: () => void
}

const RoundedTouchableRipple = ({
  children,
  onPress,
}: RoundedTouchableRippleProps) => (
  <View className="w-16 h-16 rounded-full bg-gray-300/60 overflow-hidden">
    <TouchableRipple
      className="w-full h-full flex items-center justify-center"
      onPress={onPress}
    >
      {children}
    </TouchableRipple>
  </View>
)

interface AbsoluteBottomProps {
  semesters?: ISemestersResponse
  currentSemesterId?: number
  onPrev: () => void
  onNext: () => void
  onSemesterChange?: (semesterId: number) => void
}

export const AbsoluteBottom = ({
  semesters,
  currentSemesterId,
  onNext,
  onPrev,
  onSemesterChange,
}: AbsoluteBottomProps) => {
  const sheetRef = useRef<BottomSheetModal>()

  const handleValueChange = (itemValue: number) => {
    onSemesterChange?.(itemValue)
    sheetRef.current?.close()
  }

  return (
    <View className="w-full absolute left-0 bottom-10 px-5 flex flex-row items-center justify-between">
      <RoundedTouchableRipple onPress={onPrev}>
        <AngleLeftIcon size={32} />
      </RoundedTouchableRipple>
      <Button
        onPress={() => {
          sheetRef.current?.present()
        }}
      >
        {currentSemesterId
          ? semesters?.find((item) => item.id === currentSemesterId)?.name
          : '选择学期'}
      </Button>
      <BottomActionSheet
        ref={sheetRef as MutableRefObject<BottomSheetModal>}
        backgroundStyle={{ backgroundColor: '#fff' }}
      >
        {semesters?.map((item) => (
          <View className={'rounded-lg overflow-hidden px-2'} key={item.id}>
            <TouchableRipple
              className={'p-4'}
              onPress={() => handleValueChange(item.id)}
            >
              <Text>{item.name}</Text>
            </TouchableRipple>
          </View>
        ))}
      </BottomActionSheet>
      <RoundedTouchableRipple onPress={onNext}>
        <AngleRightIcon size={32} />
      </RoundedTouchableRipple>
    </View>
  )
}
