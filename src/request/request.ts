import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios, { HttpStatusCode } from 'axios'
import { Config } from '@/shared/config'
import { getQAQFont, packStorageToken } from '@/shared/utils/utils'
import Toast from 'react-native-toast-message'
import { AuthStore } from '@/store/auth'

const instance = axios.create({
  baseURL: Config.request.baseURL,
})

instance.interceptors.response.use(
  (data) => {
    if (data.data.data) {
      return data.data.data
    } else {
      return data.data
    }
  },
  (error: AxiosError) => {
    const msg = (error.response.data as IMutationResponse).msg

    if (error.response.status === HttpStatusCode.Unauthorized) {
      AuthStore.logout()
    }

    Toast.show({
      type: 'error',
      text1: `请求失败了${getQAQFont('sadness')}`,
      text2: Array.isArray(msg) ? msg.map((i) => `${i}`).join('\n') : msg,
    })
    throw error
  }
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
    headers: {
      authorization: packStorageToken(),
      ...config.headers,
    },
  }) as Promise<T>
}
