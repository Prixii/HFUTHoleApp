import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'
import { configurePersistable, makePersistable } from 'mobx-persist-store'

interface Meta {
  token: string
  isLogin: boolean
}

export const AuthKey = 'auth'

export class Auth {
  meta: Meta = null

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: Auth.name,
      properties: ['meta'],
    })
  }

  login(token: string) {
    this.meta = {
      isLogin: true,
      token,
    }
  }

  async logout() {
    this.meta = {
      isLogin: false,
      token: null,
    }
  }
}

export const AuthStore = new Auth()

export const useAuthStore = () => useState(() => AuthStore)[0]
