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

  const handleValueChange = (itemValue: string) => {
    setSelectedSemesterId(itemValue)
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
        mode={'text'}
        textColor={'rgb(209 213 219 / 0.6)'}
        onPress={() => {
          sheetRef.current?.present()
        }}
      >
        选择学期
      </Button>
      <BottomActionSheet ref={sheetRef as MutableRefObject<BottomSheetModal>}>
        {semesters?.map((item) => (
          <View className={'p-4 rounded-lg overflow-hidden'} key={item.id}>
            <TouchableRipple onPress={() => handleValueChange(item.name)}>
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
