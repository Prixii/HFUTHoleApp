import RNToast from 'react-native-toast-message'
import { ToastShowParams } from 'react-native-toast-message/lib/src/types'
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
}
