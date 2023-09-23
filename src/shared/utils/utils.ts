import { getRandomQAQ, type IQAQ } from 'qaq-font'
import { formatDistanceToNow, differenceInDays, format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Dimensions } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { Toast } from '@/shared/utils/toast'
import * as FileSystem from 'expo-file-system'
import { store } from '@/store/store'
import { StatusBar } from 'react-native'

export const getQAQFont = (key: keyof IQAQ) => getRandomQAQ(key)[0]

export const packStorageToken = (isSpace?: boolean) =>
  isSpace
    ? `Bearer ${store.getState().spaceUser?.meta?.token}`
    : `Bearer ${store.getState().user?.meta?.token}`

export function formatDate(time: string) {
  const date = new Date(time)
  const now = new Date()
  const diffInDays = differenceInDays(now, date)

  if (diffInDays < 1) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: zhCN,
    })
      .toString()
      .replace('大约 ', '')
  } else if (diffInDays < 3) {
    return `${diffInDays}天前`
  } else if (diffInDays < 365) {
    return format(date, 'MM/dd', { locale: zhCN }).toString()
  } else {
    return format(date, 'YYYY/MM/DD', { locale: zhCN }).toString()
  }
}

export const { width: ScreenWidth, height: ScreenHeight } =
  Dimensions.get('screen')

export const { width: WindowWidth, height: WindowHeight } =
  Dimensions.get('window')

export const greetingText = () => {
  const currentDate = new Date()
  // 凌晨 早上 中午 晚上
  const dayPeriod = currentDate.getHours()
  const qaq = getRandomQAQ('happy')[0]
  return dayPeriod < 6
    ? ['凌晨了', `要记得休息噢，${qaq}`]
    : dayPeriod > 6 && dayPeriod < 12
    ? ['早上好呀', `今天又是充满希望的一天${qaq}`]
    : dayPeriod < 18
    ? ['下午好', `快来喝一杯下午茶吧${qaq}`]
    : ['晚上好', '不要熬夜到太晚哦٩(ˊ〇ˋ*)و']
}

export const saveToAlbum = async (url: string) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      const localUri = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + 'a.jpg'
      )
      await MediaLibrary.saveToLibraryAsync(localUri.uri)
      Toast.success({ text1: '保存图片成功' })
    }
  } catch (error: any) {
    Toast.error({ text1: '保存图片失败', text2: error.stack.toString() })
  }
}

export const isNullOrUndefined = (val: unknown): val is null | undefined =>
  val === null || val === undefined

export function JSONDeepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function floatFixed(num: number, fractionDigits = 2) {
  return parseFloat(num.toFixed(fractionDigits))
}

export function objectMap<T extends object, K = keyof T>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callback: (value: T[K], key: string, obj: T) => any
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, callback(value, key, obj)])
  )
}

export const isEqualArray = (arr1: any[], arr2: any[]) =>
  arr1.every((item, index) => item === arr2[index]) &&
  arr2.every((item, index) => item === arr1[index])
