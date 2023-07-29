import { Pressable, View, StyleProp, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

export interface ButtonOptions<T> {
  key: T
  title: string
}

export interface ToggleButtonProps<T> {
  buttonOptions: ButtonOptions<T>[]
  currentKey: T
  style?: StyleProp<ViewStyle>
  onChange?: (key: T) => void
}

export function ToggleButton<T extends string>({
  buttonOptions,
  currentKey,
  style,
  onChange,
}: ToggleButtonProps<T>) {
  return (
    <View className="flex flex-row" style={style}>
      {buttonOptions.map((button) => (
        <Pressable
          key={button.key}
          onPress={() => onChange?.(button.key)}
          className={`py-1 px-4 rounded-md ${
            button.key === currentKey ? 'bg-[#4e73f6]' : ''
          }`}
        >
          <Text className="text-white">{button.title}</Text>
        </Pressable>
      ))}
    </View>
  )
}
