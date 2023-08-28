import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import { Dialog } from '@/components/Dialog'
import { getQAQFont } from '@/shared/utils/utils'
import { Button, Text } from 'react-native-paper'
import { useHolePostContext } from '@/shared/context/hole'
import { useAppDispatch } from '@/store/store'
import { addHoleDraft } from '@/store/reducer/hole'

export function PostLeaveDialog() {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const leaveEvent = useRef<any>()
  const { form } = useHolePostContext()
  const dispatch = useAppDispatch()

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        const body = form.getValues('body')

        if (body?.length) {
          e.preventDefault()
          setVisible(true)
          leaveEvent.current = e
        }
      }),
    [navigation]
  )

  const leave = useCallback(() => {
    navigation.dispatch(leaveEvent.current.data.action)
  }, [leaveEvent.current, navigation])

  const save = useCallback(() => {
    const body = form.getValues('body')

    leave()
    dispatch(addHoleDraft(body))
  }, [form, leave])

  return (
    <Dialog
      title={`内容没有保存，确定要离开吗？${getQAQFont('sadness')}`}
      visible={visible}
      actionsBody={
        <>
          <Button onPress={save}>保存到草稿箱</Button>
          <Button onPress={leave}>离开</Button>
        </>
      }
    >
      <Text>如果离开的话会导致内容丢失哦</Text>
    </Dialog>
  )
}
