import { Keyboard } from 'react-native'
import { Toast } from '@/shared/utils/toast'
import * as Clipboard from 'expo-clipboard'

export function hideKeyboard() {
  Keyboard.dismiss()
}

export function showKeyboard() {
  Keyboard
}

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text)
  Toast.success({
    text1: '复制成功',
  })
}
