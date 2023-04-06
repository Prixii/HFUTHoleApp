import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import produce from 'immer'
import { AwaitAble } from '@/shared/types'
import { useState } from 'react'

export class SearchHistory {
  data: string[] = []

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: SearchHistory.name,
      properties: ['data'],
      storage: AsyncStorage,
    })
  }

  operate(producer: (draft: string[]) => AwaitAble<string[] | void>) {
    this.data = produce(this.data, producer)
  }
}

const SearchHistoryStore = new SearchHistory()

export const useSearchHistoryStore = () => useState(() => SearchHistoryStore)[0]
