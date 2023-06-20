import { FlatList, Image, View } from 'react-native'
import { Avatar, List, Text, TouchableRipple } from 'react-native-paper'
import { AtIcon, CommentIcon, NotifyIcon } from '@/components/icon'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { UserAvatar } from '@/components/UserAvatar'

export function Notify() {
  const list = [
    {
      color: '#717DFE',
      title: '@我',
      body: '亚里士多德等50人@了你',
      icon: AtIcon,
    },
    {
      color: '#2FCC7E',
      title: '回复',
      body: '亚里士多德等50人回复了你的评论',
      icon: CommentIcon,
    },
    {
      color: '#FF9F23',
      title: '通知',
      body: '你今天18:30p.m.有一场考试，请不要忘记',
      icon: NotifyIcon,
    },
    {
      title: '班级团支书',
      body: '做一下青年大学习啊',
      img: 'https://c-ssl.duitang.com/uploads/blog/202208/08/20220808165611_1ba7f.jpeg',
    },
    {
      title: 'newbee',
      body: '教我暴富啊',
      img: 'https://c-ssl.duitang.com/uploads/item/201711/04/20171104131321_Xtr2A.jpeg',
    },
    {
      title: 'Alice',
      body: '你好啊',
      img: 'https://c-ssl.duitang.com/uploads/blog/202305/18/wgSJWbBph9bdy2g.png',
    },
  ]

  return (
    <View className={'bg-white h-full'}>
      <FlatList
        data={list}
        ListFooterComponent={() => (
          <View className={'flex-1 items-center py-4'}>
            <SecondaryText>- 没有更多了 -</SecondaryText>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableRipple onPress={() => {}}>
            <View className={'py-2 px-4 flex-row space-x-4 items-center'}>
              <View
                className={'rounded-full flex items-center justify-center'}
                style={{ backgroundColor: item.color, width: 60, height: 60 }}
              >
                {item.icon ? (
                  <Avatar.Icon
                    icon={item.icon}
                    style={{
                      backgroundColor: item.color,
                    }}
                    color={'#fff'}
                    size={50}
                  />
                ) : (
                  <Avatar.Image source={{ uri: item.img }} size={60} />
                )}
              </View>
              <View className={'flex-1'}>
                <Text variant={'bodyLarge'} className={'font-bold'}>
                  {item.title}
                </Text>
                <View>
                  <SecondaryText
                    variant={'bodyMedium'}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {item.body}
                  </SecondaryText>
                </View>
              </View>
            </View>
          </TouchableRipple>
        )}
      />
    </View>
  )
}
