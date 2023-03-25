import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Meta {
  token: string
}

class Auth {
  isLogin = false

  meta: Meta = null

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: Auth.name,
      properties: ['isLogin', 'meta'],
      storage: AsyncStorage,
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

export const AuthStore = new Auth()

export const useAuthStore = () => useState(() => AuthStore)[0]
