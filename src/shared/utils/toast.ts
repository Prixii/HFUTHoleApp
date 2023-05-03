import RNToast from 'react-native-toast-message'
import type { ToastShowParams } from 'react-native-toast-message'
import { getQAQFont } from '@/shared/utils/utils'

export const Toast = {
  success(params: ToastShowParams) {
    RNToast.show({
      type: 'success',
      ...params,
      text1: `${params.text1}${getQAQFont('happy')}`,
    })
  },
  error(params: ToastShowParams) {
    RNToast.show({
      type: 'error',
      ...params,
      text1: `${params.text1}${getQAQFont('sadness')}`,
    })
  },
  info(params: ToastShowParams) {
    RNToast.show({
      type: 'info',
      ...params,
      text1: `${params.text1}${getQAQFont('happy')}`,
    })
  },
}
