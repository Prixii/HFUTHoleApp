import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
})

instance.interceptors.response.use(
  (data) => data.data,
  (error) => {
    console.log(error)
  }
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance<T>({
    method: 'GET',
    ...config,
  }) as Promise<T>
}
