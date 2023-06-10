import MineSvg from '@/assets/svg/mine.svg'
import HomeSvg from '@/assets/svg/home.svg'
import CourseSvg from '@/assets/svg/deno.svg'
import NotifySvg from '@/assets/svg/notify.svg'
import { Svg } from '@/components/svg/Svg'

interface Props {
  route: string
  isFocused: boolean
}

const IconsMap = {
  home: HomeSvg,
  course: CourseSvg,
  notify: NotifySvg,
  user: MineSvg,
}

export function BottomTabBarIcon(props: Props) {
  const route = props.route.split('-')[0]
  return (
    <Svg SvgComponent={IconsMap[route]} size={24} active={props.isFocused} />
  )
}
