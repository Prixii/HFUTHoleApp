import { Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'

interface RangePickerProps {
  dataSource: (number | string)[]
  range: [number, number]
  onChange?: (range: [number, number]) => void
}

export const RangePicker = ({
  dataSource,
  range,
  onChange,
}: RangePickerProps) => {
  const handlePress = (index: number) => {
    const [left, right] = range
    if (index < left || index > right) {
      onChange?.([index < left ? index : left, index > right ? index : right])
    }
    // 点击中间，重置
    if (index > left && index < right) {
      onChange?.([index, index])
    }
    if (index > left && index > right) {
      onChange?.([left, index])
    }
    if (index < left && index < right) {
      onChange?.([index, right])
    }
  }

  return (
    <View className="flex flex-row flex-wrap mx-auto">
      {dataSource.map((item, index) => (
        <View
          key={item}
          className={`
          ${isWithinRange(index, range) ? 'bg-blue-200' : ''} 
          ${index === range[0] ? 'rounded-l-full' : ''} 
          ${index === range[1] ? 'rounded-r-full' : ''}`}
        >
          <Pressable
            className={`w-8 h-8 rounded-full flex justify-center 
            ${isEdge(index, range) ? 'bg-blue-400' : ''}`}
            onPress={() => handlePress(index)}
          >
            <Text
              className={`text-center ${
                isEdge(index, range) ? 'text-white' : ''
              }`}
            >
              {item}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

const isWithinRange = (index: number, range: number[]) =>
  index >= range[0] && index <= range[1]

const isEdge = (index: number, range: number[]) =>
  index === range[0] || index === range[1]
