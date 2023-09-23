import { forwardRef, MutableRefObject } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { BottomActionSheet } from '@/components/sheet/BottomActionSheet'
import { CustomScheduleFormValidator } from '@/shared/validators/space/schedule'
import { NativeInput } from '@/components/form/NativeInput'
import { RangePicker } from '@/components/picker/RangePicker'
import { UnitSchedule } from '@/pages/space/@utils/types'
import { Snackbar } from '@/components/snackbar/snackbar'
import { Button } from '@/components/button'
import { ColorPicker } from '@/pages/space/components/ColorPicker'
import { useCustomScheduleSheet } from './useCustomScheduleSheet'

interface DiyScheduleSheetProps {
  /**
   * @description 第一项是周几，第二项是 lessonIndex
   */
  weekLayoutIndex: number[]
  currentWeekIndex: number
  customSchedule?: UnitSchedule
  onAddScheduleSuccess?: () => void
}

export const CustomScheduleSheet = forwardRef<
  BottomSheetModal,
  DiyScheduleSheetProps
>((props, ref) => {
  const sheetRef = ref as MutableRefObject<BottomSheetModal>

  const {
    activeColor,
    control,
    errors,
    isUpdateSchedule,
    mutation,
    onSubmit,
    timeRange,
    setTimeRange,
    handleColorPress,
    handleSubmit,
  } = useCustomScheduleSheet(props)

  return (
    <BottomActionSheet
      ref={sheetRef}
      snapPoints={['60%', '80%']}
      backgroundStyle={{ backgroundColor: 'white' }}
    >
      <View className="h-full px-4 pb-4 flex justify-between">
        <View className="space-y-4">
          <Text variant="titleMedium" className="text-center">
            自定义行程
          </Text>

          {errors?.reqFailedError && (
            <View className={'py-3'}>
              <Snackbar
                text={errors.reqFailedError?.message || '出错了'}
                icon={'info'}
                error
              />
            </View>
          )}

          <View>
            <NativeInput<CustomScheduleFormValidator>
              control={control}
              name="title"
              textAlignVertical="center"
              placeholder="标题"
              style={styleSheet.input}
            />
          </View>

          <View>
            <NativeInput<CustomScheduleFormValidator>
              control={control}
              name="location"
              textAlignVertical="center"
              placeholder="地点"
              style={styleSheet.input}
            />
          </View>

          <View>
            <NativeInput<CustomScheduleFormValidator>
              control={control}
              name="mark"
              textAlignVertical="center"
              placeholder="备注"
              style={styleSheet.input}
            />
          </View>

          <View className="flex space-y-3">
            <Text variant="titleSmall">选择时间</Text>
            <View>
              <RangePicker
                dataSource={dataSource}
                range={timeRange}
                onChange={setTimeRange}
              />
            </View>
          </View>

          <View className="flex space-y-3">
            <Text variant="titleSmall">选择颜色</Text>
            <ColorPicker
              activeColor={activeColor}
              onColorChange={handleColorPress}
            />
          </View>
        </View>

        <Button
          mode={'contained'}
          className={`shadow-none w-full`}
          onPress={handleSubmit(onSubmit)}
          loading={mutation.isLoading}
        >
          {isUpdateSchedule ? '更新' : '添加'}
        </Button>
      </View>
    </BottomActionSheet>
  )
})

const dataSource = Array.from({ length: 11 }, (_, i) => i + 1)

const styleSheet = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
})
