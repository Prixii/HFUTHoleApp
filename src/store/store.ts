import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserReducer } from '@/store/reducer/user'
import { SearchReducer } from '@/store/reducer/search'
import { SpaceUserReducer } from '@/store/reducer/spaceUser'
import { SpaceScoreReducer } from '@/store/reducer/spaceScore'
import { SpaceCourseReducer } from '@/store/reducer/spaceCourse'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import createSecureStore from 'redux-persist-expo-securestore'
import { HoleReducer } from '@/store/reducer/hole'

const SecureStorage = createSecureStore()

const userPersistReducer = persistReducer(
  {
    key: 'user',
    storage: SecureStorage,
  },
  UserReducer
)

const searchPersistReducer = persistReducer(
  {
    key: 'search',
    storage: AsyncStorage,
  },
  SearchReducer
)

const spaceUserPersistReducer = persistReducer(
  {
    key: 'spaceUser',
    storage: SecureStorage,
  },
  SpaceUserReducer
)

const spaceCoursePersistReducer = persistReducer(
  {
    key: 'spaceCourse',
    storage: AsyncStorage,
  },
  SpaceCourseReducer
)

const spaceScorePersistReducer = persistReducer(
  {
    key: 'spaceScore',
    storage: AsyncStorage,
  },
  SpaceScoreReducer
)

const holePersistReducer = persistReducer(
  {
    key: 'hole',
    storage: AsyncStorage,
  },
  HoleReducer
)

const rootReducer = combineReducers({
  user: userPersistReducer,
  search: searchPersistReducer,
  spaceUser: spaceUserPersistReducer,
  spaceCourse: spaceCoursePersistReducer,
  spaceScore: spaceScorePersistReducer,
  hole: holePersistReducer,
})

export const store = createStore(rootReducer)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const { dispatch } = store
