import { Appbar } from 'react-native-paper'

export function HoleHeader() {
  return (
    <Appbar.Header className={'bg-transparent fixed'}>
      <Appbar.Content title={'随机漫步'} subtitle={'时间轴'}></Appbar.Content>
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  )
}
