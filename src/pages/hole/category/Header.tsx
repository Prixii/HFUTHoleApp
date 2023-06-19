import { Image, Text, View } from 'react-native'

export function HoleCategoryHeader() {
  return (
    <View className={'rounded-lg overflow-hidden'}>
      <Image
        source={{
          uri: 'https://c-ssl.duitang.com/uploads/blog/202106/15/20210615110214_81507.jpg',
        }}
        className={'w-full h-32'}
        resizeMode={'cover'}
      />
      <View
        className={
          'absolute px-3 bg-black/20 left-0 right-0 top-0 bottom-0 flex justify-center'
        }
      >
        <Text className={'text-white text-2xl'}>吃喝玩乐</Text>
        <Text className={'text-white'}>学习已经很累了，吃点好的吧</Text>
      </View>
    </View>
  )
}
