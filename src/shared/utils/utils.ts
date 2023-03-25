import { getRandomQAQ, type IQAQ } from 'qaq-font'
import { AuthStore } from '@/store/auth'

export const getQAQFont = (key: keyof IQAQ) => getRandomQAQ(key)[0]

export const packStorageToken = () => `Bearer ${AuthStore.meta.token}`
