import RNToast from 'react-native-toast-message'
import { ToastShowParams } from 'react-native-toast-message/lib/src/types'

export const Toast = {
  success(params: ToastShowParams) {
    RNToast.show({
      type: 'success',
      ...params,
    })
  },
  error(params: ToastShowParams) {
    RNToast.show({
      type: 'error',
      ...params,
    })
  },
}
