import { HoleDetailHeader } from '@/pages/hole/detail/DetailHeader'
import { HoleDetail } from '@/pages/hole/detail/detail'
import { HoleReply } from '@/pages/hole/detail/reply/HoleReply'
import React from 'react'
import { HoleStack } from './hole-nested.stacks'

export const HoleDetailStacks = () => {
  return (
    <HoleStack.Navigator
      initialRouteName={'index'}
      screenOptions={{ header: () => <HoleDetailHeader /> }}
    >
      <HoleStack.Screen name={'index'} component={HoleDetail} />
      <HoleStack.Screen name={'reply'} component={HoleReply} />
    </HoleStack.Navigator>
  )
}
