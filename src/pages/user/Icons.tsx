import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { Svg } from '@/components/svg/Svg'
import StarSvg from '@/assets/svg/user/star.svg'
import PostSvg from '@/assets/svg/user/post.svg'
import ReplySvg from '@/assets/svg/user/reply.svg'
import DraftSvg from '@/assets/svg/user/draft.svg'
import DenoSvg from '@/assets/svg/deno.svg'
import AppDenoSvg from '@/assets/svg/app_deno.svg'
import CourseSearchSvg from '@/assets/svg/space/course_search.svg'
import BusSvg from '@/assets/svg/space/bus.svg'
import TeachingEvaluationSvg from '@/assets/svg/space/teaching_evaluation.svg'
import FailedCourseSearchSvg from '@/assets/svg/space/failed_course_search.svg'
import CultureSvg from '@/assets/svg/space/culture.svg'

import SettingSvg from '@/assets/svg/setting.svg'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { RightIcon } from '@/components/icon'
import { MoreServiceList } from '@/pages/user/MoreServiceList'

const List = [
  {
    title: '树洞',
    icon: AppDenoSvg,
    children: [
      {
        title: '我的喜欢',
        route: '',
        svg: StarSvg,
      },
      {
        title: '我的发表',
        route: '',
        svg: PostSvg,
      },
      {
        title: '我的回复',
        route: '',
        svg: ReplySvg,
      },
      {
        title: '草稿箱',
        route: '',
        svg: DraftSvg,
      },
    ],
  },
  // {
  //   title: '课表',
  //   icon: DenoSvg,
  //   children: [
  //     {
  //       title: '全校课表',
  //       route: '',
  //       svg: CourseSearchSvg,
  //     },
  //     {
  //       title: '培养方案',
  //       route: '',
  //       svg: CultureSvg,
  //     },
  //     {
  //       title: '评教',
  //       route: '',
  //       svg: TeachingEvaluationSvg,
  //     },
  //     {
  //       title: '挂科率查询',
  //       route: '',
  //       svg: FailedCourseSearchSvg,
  //     },
  //     {
  //       title: '校车查询',
  //       route: '',
  //       svg: BusSvg,
  //     },
  //   ],
  // },
]

export function UserIcons() {
  return (
    <View className={'space-y-4'}>
      {List.map((item, index) => (
        <View key={index} className={'bg-white px-2 py-4 rounded-xl space-y-2'}>
          <View className={'flex-row items-center space-x-2 px-2'}>
            <Svg SvgComponent={item.icon} size={25} color={'#000'} />
            <Text variant={'titleMedium'}>{item.title}</Text>
          </View>
          <View className={'flex-row space-y-2 flex-wrap items-center'}>
            {item.children.map((childItem, index) => (
              <View className={'w-1/4 rounded-lg overflow-hidden'} key={index}>
                <TouchableRipple onPress={() => {}}>
                  <View className={'flex space-y-2 items-center py-2'}>
                    <Svg size={30} SvgComponent={childItem.svg} />
                    <Text variant={'bodySmall'}>{childItem.title}</Text>
                  </View>
                </TouchableRipple>
              </View>
            ))}
          </View>
        </View>
      ))}
      <MoreServiceList />
    </View>
  )
}
