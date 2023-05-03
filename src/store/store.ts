import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserReducer } from './reducer/user'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from '@reduxjs/toolkit'
import { SearchReducer } from '@/store/reducer/search'

const userPersistReducer = persistReducer(
  {
    key: 'user',
    storage: AsyncStorage,
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

const rootReducer = combineReducers({
  user: userPersistReducer,
  search: searchPersistReducer,
})

export const store = createStore(rootReducer)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
