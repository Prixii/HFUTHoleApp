import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'
import {
  configurePersistable,
  hydrateStore,
  makePersistable,
} from 'mobx-persist-store'

interface Meta {
  token: string
}

export class Auth {
  isLogin = false

  meta: Meta = null

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: Auth.name,
      properties: ['meta', 'isLogin'],
    })
  }

  login(meta: Meta) {
    this.isLogin = true
    this.meta = meta
  }

  async logout() {
    this.isLogin = false
    this.meta = null
  }
}

configurePersistable({
  storage: {
    setItem: async (key, value) => {
      await AsyncStorage.setItem(key, value)
      return Promise.resolve()
    },
    getItem: async (key) => {
      const value = await AsyncStorage.getItem(key)
      return Promise.resolve(value)
    },
    removeItem: async (key) => {
      await AsyncStorage.removeItem(key)
      return Promise.resolve()
    },
  },
})

export const AuthStore = new Auth()

export const useAuthStore = () => useState(() => AuthStore)[0]
