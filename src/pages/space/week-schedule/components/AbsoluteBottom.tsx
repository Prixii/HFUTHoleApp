import { Pressable, View } from 'react-native'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'
import { Select } from 'native-base'
import { useSemesters } from '@/swr/space/chore'
import { useCurrentSemester } from '@/shared/context/space/semester'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { Button, Text, TouchableRipple } from 'react-native-paper'
import { MutableRefObject, useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export const AbsoluteBottom = () => {
  const { onPrev, onNext } = useChangeWeek('weekSchedule')
  const { selectedSemesterId, setSelectedSemesterId } = useCurrentSemester()
  const { data: semesters, isLoading } = useSemesters()

  const sheetRef = useRef<BottomSheetModal>()

  const handleValueChange = (itemValue: typeof selectedSemesterId) => {
    setSelectedSemesterId(itemValue)
    sheetRef.current?.close()
  }

  return (
    <View className="w-full absolute left-0 bottom-10 px-5 flex flex-row items-center justify-between">
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onPrev}
      >
        <AngleLeftIcon size={32} />
      </Pressable>
      <Button
        onPress={() => {
          sheetRef.current?.present()
        }}
      >
        {selectedSemesterId
          ? semesters?.find((item) => item.id === selectedSemesterId)?.name
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
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onNext}
      >
        <AngleRightIcon size={32} />
      </Pressable>
    </View>
  )
}
