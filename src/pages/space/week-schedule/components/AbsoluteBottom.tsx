import { Pressable, View } from 'react-native'
import { AngleLeftIcon, AngleRightIcon } from '@/components/icon'
import { useChangeWeek } from '@/pages/space/@utils/useWeekChange'
import { Select } from 'native-base'
import { useSemesters } from '@/swr/space/chore'
import { useCurrentSemester } from '@/shared/context/space/semester'

export const AbsoluteBottom = () => {
  const { onPrev, onNext } = useChangeWeek('weekSchedule')
  const { selectedSemesterId, setSelectedSemesterId } = useCurrentSemester()
  console.log(selectedSemesterId)

  const { data: semesters, isLoading } = useSemesters()

  const handleValueChange = (itemValue: string) => {
    setSelectedSemesterId(itemValue)
  }

  return (
    <View className="w-full absolute left-0 bottom-10 px-5 flex flex-row items-center justify-between">
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onPrev}
      >
        <AngleLeftIcon color="#00000099" size={32} />
      </Pressable>
      {!isLoading ? (
        <Select
          // 为了使文字看起来是居中的
          width={165}
          selectedValue={selectedSemesterId + ''}
          dropdownIcon={<View />}
          className="bg-gray-300/60 rounded-lg"
          variant="filled"
          onValueChange={handleValueChange}
        >
          {semesters?.map((semester) => (
            <Select.Item
              key={semester.id}
              label={semester.name}
              value={semester.id + ''}
            />
          ))}
        </Select>
      ) : null}
      <Pressable
        className="w-16 h-16 rounded-full bg-gray-300/60 flex items-center justify-center"
        onPress={onNext}
      >
        <AngleRightIcon color="00000099" size={32} />
      </Pressable>
    </View>
  )
}
