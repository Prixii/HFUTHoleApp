import {
  makePersistable,
  PersistenceStorageOptions,
  ReactionOptions,
} from 'mobx-persist-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function makeAutoPersistObservable<
  T extends {
    [key: string]: any
  },
  P extends keyof T
>(
  target: T,
  storageOptions: Omit<PersistenceStorageOptions<T, P>, 'name'> & {
    name?: string
  },
  reactionOptions?: ReactionOptions
) {
  makePersistable(
    target,
    {
      ...storageOptions,
      name: target.name,
    },
    reactionOptions
  )
}
