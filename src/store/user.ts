import { makeAutoPersistObservable } from '@/store/utils'
import { useState } from 'react'
import { makeAutoObservable } from 'mobx'

class User {
  constructor() {
    makeAutoObservable(this)
  }
}

export const UserStore = new User()

export const useUserStore = () => useState(() => UserStore)[0]
