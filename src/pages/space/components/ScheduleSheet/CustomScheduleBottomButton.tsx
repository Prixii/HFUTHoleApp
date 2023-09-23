import type { UnitSchedule } from '@/pages/space/@utils/types'
import { useState } from 'react'
import { View } from 'react-native'
import { Text, Button, Dialog, Portal } from 'react-native-paper'

interface CustomScheduleBottomProps {
  schedule?: UnitSchedule
  onDelete?: () => void
  onUpdate?: () => void
}

export const CustomScheduleBottomButton = ({
  onDelete,
  onUpdate,
}: CustomScheduleBottomProps) => {
  const [visible, setVisible] = useState(false)

  const openDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const handleDelete = () => {
    hideDialog()
    onDelete?.()
  }

  return (
    <View className="mb-4 px-5 flex flex-row justify-between">
      <Button mode="contained" className="w-[45%]" onPress={onUpdate}>
        更新
      </Button>
      <Button
        mode="contained"
        className="w-[45%]"
        buttonColor="#ff4d4f"
        onPress={openDialog}
      >
        删除
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">确定要删除行程吗？</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>取消</Button>
            <Button onPress={handleDelete}>确认</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
