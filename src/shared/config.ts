import { configurePersistable } from 'mobx-persist-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

export const Config = {
  request: {
    baseURL: 'http://172.21.76.49:8000/',
  },
}

export const Limit = {
  holeBodyMaxLength: 4096,
  holeVoteMaxLength: 5,
  holeVoteOptionLength: 20,
}

export function setupGlobalConfig() {
  configurePersistable({
    storage: AsyncStorage,
  })

  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')
}
