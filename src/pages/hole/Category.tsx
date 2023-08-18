import HFUTLifeSvg from '@/assets/svg/home/hfutLife.svg'
import SecondHandSvg from '@/assets/svg/home/secondHand.svg'
import LostAndFoundSvg from '@/assets/svg/home/lostAndFound.svg'
import StudySvg from '@/assets/svg/home/study.svg'
import CatSvg from '@/assets/svg/home/cat.svg'
import YourNameSvg from '@/assets/svg/home/love.svg'
import HobbySvg from '@/assets/svg/home/hobby.svg'
import { ArticleCategoryEnum } from '@/shared/enums'
import { View } from 'react-native'
import { Svg } from '@/components/svg/Svg'
import { Text, TouchableRipple } from 'react-native-paper'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'
import { HoleClassification } from '@/shared/enums/category.enum'

export const Categories = [
  {
    route: 'hfut-life',
    name: HoleClassification.hfutLife,
    description: '学习已经很苦了 😩，来看看水贴娱乐放松一下吧 🎉🎈',
    children: ['工大广场', '身边趣事', '镜头下的工大', '今天win了吗'],
    color: { primary: '#619E68', secondary: '#E3F6E0' },
  },
  {
    route: 'study',
    name: HoleClassification.study,
    description: '学习是一种态度！一起探索知识的海洋吧！ 📚🧠',
    children: ['学在工大', '考研', '竞赛', '讲座', '书籍资料'],
    color: { primary: '#BE7AAC', secondary: '#FFECF5' },
  },
  {
    route: 'partner',
    name: HoleClassification.partner,
    description:
      '来这找人一起约球 🏀，干饭 🍽️，学习 📚，旅游 ✈️ 多是一件美事！',
    children: ['约球', '约饭', '娱乐', '学习', '旅游'],
    color: { primary: '#CA7792', secondary: '#FFEDF0' },
  },
  {
    route: 'little-creature',
    name: HoleClassification.littleCreature,
    description: '校园的猫猫 🐱 狗狗 🐶，蛇蛇 🐍，鼠鼠 🐭 多可爱！',
    children: ['屯', '翠', '宣'],
    color: { primary: '#5297C3', secondary: '#DCF6F2' },
  },
  {
    route: 'club-activities',
    name: HoleClassification.clubActivities,
    description:
      '闲暇时光，你是否渴望加入一个充满活力和创造力的社团？这里有各种各样的社团活动等待着你的参与，让你的大学生活更加精彩纷呈！ 😄✨',
    children: ['屯', '翠', '宣'],
    color: { primary: '#369F97', secondary: '#DCF6F2' },
  },
  {
    route: 'love-story',
    name: HoleClassification.loveStory,
    description:
      '在这里分享你的情感故事或者小丑经历 🤡，让大家一起陪你度过高兴或者低落的时刻 ❤️😢。',
    children: ['你 & Ta的故事', '小丑故事'],
    color: { primary: '#CB7D4B', secondary: '#FFEDE4' },
  },
  {
    route: 'music',
    name: HoleClassification.music,
    description:
      '来这里分享你的歌单/歌曲 🎵，让大家一起沉浸在音乐的海洋里，放松心情。 🎧🎶',
    children: ['网抑云'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
  {
    route: 'game',
    name: HoleClassification.game,
    description: '游戏是人生的一部分！原神，启动！ 🎮🔥',
    children: ['王者荣耀', '原神', '主机游戏', '手机游戏', '音游', 'galgame'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
  {
    route: 'animation',
    name: HoleClassification.animation,
    description: '动漫，让我们一起进入奇妙的二次元世界！ 🌸🌟',
    children: ['动漫交流'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
  {
    route: 'lost-and-found',
    name: HoleClassification.lostAndFound,
    description: '哎呀，谁的东西丢了，快来看看有没有被别人捡到 🕵️‍♂️🔍',
    children: ['屯', '翠', '宣'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
  {
    route: 'tao-second-hand',
    name: HoleClassification.taoSecondHand,
    description: '一手太贵，还是来看看二手吧 QWQ',
    children: ['屯', '翠', '宣'],
    color: { primary: '#D07775', secondary: '#FFECEB' },
  },
]

export function HomeCategories() {
  const { go } = useHoleCategoryRoute()

  return (
    <View className={'bg-white p-2 rounded-lg'}>
      <View className={'flex flex-row flex-wrap space-y-6 items-center'}>
        {Categories.map((category) => {
          return (
            <View
              className={'overflow-hidden rounded-lg w-1/5'}
              key={category.name}
            >
              <TouchableRipple
                onPress={() =>
                  go({
                    main: category.name!,
                  })
                }
              >
                <View
                  className={
                    'flex flex-col justify-center items-center space-y-2 py-2'
                  }
                >
                  {/*<Svg size={30} SvgComponent={category.svg} />*/}
                  <Text variant={'bodySmall'}>{category.name}</Text>
                </View>
              </TouchableRipple>
            </View>
          )
        })}
      </View>
    </View>
  )
}
