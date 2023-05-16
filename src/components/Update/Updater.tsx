import { ReactNode, useState } from 'react'
import { useMount } from 'ahooks'
import * as Updates from 'expo-updates'
import { Toast } from '@/shared/utils/toast'
import { Dialog, Portal } from 'react-native-paper'
import { Text } from 'react-native'
import { Button } from '@/components/button'

export function Updater({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(true)

  useMount(() => {
    onFetchUpdateAsync()
  })

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await downloadLatestVersion()
      }
    } catch (error) {
      Toast.error({
        text1: '获取最新版本失败了',
        text2: error?.toString() || '',
      })
      hideDialog()
    }
  }

  const hideDialog = () => {
    setVisible(false)
  }

  const downloadLatestVersion = async () => {
    try {
      await Updates.fetchUpdateAsync()
      setLoading(false)
      await Updates.reloadAsync()
    } catch (error) {
      Toast.error({
        text1: '获取最新版本失败了',
        text2: error?.toString() || '',
      })
      hideDialog()
    }
  }

  return (
    <>
      <Portal>
        <Dialog visible={visible} style={{ backgroundColor: '#fff' }}>
          <Dialog.Title>新版本</Dialog.Title>
          <Dialog.Content>
            <Text>新版本已发布，正在自动更新哦</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => downloadLatestVersion()} loading={loading}>
              确定
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {children}
    </>
  )
}
