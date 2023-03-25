import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Config } from '@/shared/config'
import { packStorageToken } from '@/shared/utils/utils'

const instance = axios.create({
  baseURL: Config.request.baseURL,
})

instance.interceptors.response.use(
  (data) => data.data,
  (error: AxiosError) => {
    throw error
  }
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
    headers: {
      authorization: packStorageToken(),
    },
  }) as Promise<T>
}
