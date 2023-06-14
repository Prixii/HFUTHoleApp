import React, { ReactNode } from 'react'
import { Button, Modal, Pressable, View } from 'react-native'
import { ModalProps } from 'react-native/Libraries/Modal/Modal'
import { Func } from '@/shared/types'
import { FullWindowOverlay } from 'react-native-screens'
import { useStatusBarContext } from '@/shared/context/statusbar'

type Props = {
  children: ReactNode
  visible: boolean
  onClose: Func
} & ModalProps

export function MaskModal({ children, visible, onClose, ...props }: Props) {
  return (
    <>
      <Modal
        visible={visible}
        animationType={'slide'}
        transparent={true}
        {...props}
      >
        <View className={'flex-1 justify-end'}>
          <Pressable
            className={'absolute w-full h-full bg-black/20 z-[0]'}
            onPress={onClose}
          />
          <View className={'absolute z-[1]'}>{children}</View>
        </View>
      </Modal>
    </>
  )
}
