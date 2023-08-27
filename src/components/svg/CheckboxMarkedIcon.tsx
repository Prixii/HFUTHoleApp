import { SvgProps } from 'react-native-svg'
import { Svg } from '@/components/svg/Svg'
import CheckboxMarkedSvg from '@/assets/svg/checkbox_marked.svg'

export function CheckboxMarkedIcon({
  size,
  ...props
}: SvgProps & { size?: number }) {
  return <Svg SvgComponent={CheckboxMarkedSvg} size={size || 24} {...props} />
}
