import { View, Pressable } from 'react-native'
import { CARD_COLORS } from '@/pages/space/@utils/constant'
import { Colors } from '@/pages/space/@utils/types'

interface ColorPickerProps {
  activeColor: Colors
  onColorChange?: (color: Colors) => void
}

export const ColorPicker = ({
  activeColor,
  onColorChange,
}: ColorPickerProps) => {
  return (
    <View className="mx-auto flex flex-row flex-wrap">
      {(Object.entries(CARD_COLORS) as [Colors, string][]).map(
        ([colorKey, color]) => (
          // 撑不满父容器，闹鬼了😂
          <View key={colorKey} className="w-1/5 mt-2">
            <Pressable
              onPress={() => onColorChange?.(colorKey)}
              style={{
                backgroundColor: `rgba(${color}, 0.2)`,
              }}
              className={`w-[50px] h-[50px] rounded-full border-[2px] ${
                colorKey === activeColor
                  ? 'border-blue-400'
                  : 'border-transparent'
              }`}
            />
          </View>
        )
      )}
    </View>
  )
}
