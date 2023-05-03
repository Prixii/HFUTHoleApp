import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Popover from 'react-native-popover-view'
import { IconButton } from '@/components/IconButton'
import { MoreIcon } from '@/components/icon'
import { Dialog, List, Modal, Portal } from 'react-native-paper'
import { Button } from '@/components/button'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/form/Input'
import { ReportValidator } from '@/shared/validators/report'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ScreenHeight } from '@/shared/utils/utils'
import { useMutation } from 'react-query'
import { ReportRequest } from '@/request/apis/report'
import { Toast } from '@/shared/utils/toast'

interface Props
  extends Pick<ReportValidator, 'commentId' | 'holeId' | 'replyId' | 'type'> {}

// TODO 重构Dialog为白色或者暗黑色
export function ReportAction(props: Props) {
  const [visible, setVisible] = useState(false)
  const [popoverVisible, setPopoverVisible] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ReportValidator>({
    mode: 'all',
    resolver: classValidatorResolver(ReportValidator),
  })

  const mutation = useMutation(
    (reason: string) =>
      ReportRequest({
        reason,
        ...props,
      }),
    {
      onSuccess() {
        Toast.success({
          text1: '举报成功',
        })
        closeDialog()
      },
    }
  )

  const openDialog = () => setVisible(true)

  const closeDialog = () => setVisible(false)

  const onSubmit = (data: Pick<ReportValidator, 'reason'>) => {
    mutation.mutate(data.reason)
  }

  return (
    <>
      <Popover
        from={
          <TouchableOpacity onPress={() => setPopoverVisible(true)}>
            <IconButton
              icon={() => <MoreIcon size={20} />}
              transparent={true}
            />
          </TouchableOpacity>
        }
        isVisible={popoverVisible}
        onRequestClose={() => setPopoverVisible(false)}
      >
        <View className={'p-3 min-w-[50vw]'}>
          <List.Section>
            <List.Item
              title={'举报'}
              onPress={() => {
                openDialog()
                setPopoverVisible(false)
              }}
            />
          </List.Section>
        </View>
      </Popover>

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={closeDialog}
          style={{ backgroundColor: '#fff' }}
        >
          <Dialog.Title>举报</Dialog.Title>
          <Dialog.Content>
            <Input
              name={'reason'}
              style={{ height: ScreenHeight * 0.2 }}
              control={control}
              placeholder={'请输入举报理由'}
              transparent
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleSubmit(onSubmit)}
              loading={mutation.isLoading}
            >
              确定
            </Button>
            <Button onPress={closeDialog}>取消</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
