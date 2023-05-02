import { makeAutoPersistObservable } from '@/store/utils'
import { useState } from 'react'
import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class User {
  meta: IUserProfile

  constructor() {
    makeAutoObservable(this)

    makeAutoPersistObservable(this, {
      name: User.name,
      properties: ['meta'],
      storage: AsyncStorage,
    })
  }

  setMeta(meta: IUserProfile) {
    this.meta = meta
  }
}

export const UserStore = new User()

export const useUserStore = () => useState(() => UserStore)[0]
