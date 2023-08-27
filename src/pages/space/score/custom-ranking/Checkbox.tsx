import { Pressable } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Svg } from '@/components/svg/Svg'
import CheckboxMarkedSvg from '@/assets/svg/checkbox_marked.svg'
import CheckBlankOutlineSvg from '@/assets/svg/check_blank_outline.svg'

interface Props {
  checked?: boolean
  onChange?: () => void
}

export const Checkbox = ({ checked = false, onChange }: Props) => {
  const theme = useTheme()

  return (
    <Pressable onPress={onChange}>
      {checked ? (
        <Svg
          SvgComponent={CheckboxMarkedSvg}
          size={24}
          color={theme.colors.primary}
        />
      ) : (
        <Svg
          SvgComponent={CheckBlankOutlineSvg}
          size={24}
          color={theme.colors.primary}
        />
      )}
    </Pressable>
  )
}
