import { ProfileScreen } from '@/pages/user/profile/ProfileScreen'
import { EditProfileScreen } from '@/pages/user/profile/edit/EditProfileScreen'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React from 'react'
import { Header } from '@/components/Header'
import { EditUsernameScreen } from '@/pages/user/profile/edit/EditProfileUsername'

const UserStack = createNativeStackNavigator()

export type Screen = {
  name: string
  component: React.FunctionComponent
  options?: NativeStackNavigationOptions
}

const UserScreens: Screen[] = [
  {
    name: 'profile',
    component: ProfileScreen,
    options: { headerShown: false },
  },
  {
    name: 'edit-profile',
    component: EditProfileScreen,
    options: {
      title: '编辑个人信息',
    },
  },
  {
    name: 'edit-username',
    component: EditUsernameScreen,
    options: {
      title: '更改用户名',
    },
  },
]

export const UserStacks = () => {
  return (
    <UserStack.Navigator screenOptions={{ header: Header }}>
      {UserScreens.map((screen) => (
        <UserStack.Screen
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </UserStack.Navigator>
  )
}
