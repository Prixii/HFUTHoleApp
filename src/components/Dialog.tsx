import { Dialog as RNPDialog, Portal } from 'react-native-paper'
import React from 'react'
import type { DialogProps } from 'react-native-paper'

type Props = {
  title: string
  children: React.ReactNode
  actionsBody?: React.ReactNode
} & DialogProps

export function Dialog({ title, children, actionsBody, ...props }: Props) {
  return (
    <>
      <Portal>
        <RNPDialog {...props} style={{ backgroundColor: 'white' }}>
          <RNPDialog.Title>{title}</RNPDialog.Title>
          <RNPDialog.Content>{children}</RNPDialog.Content>
          <RNPDialog.Actions>{actionsBody}</RNPDialog.Actions>
        </RNPDialog>
      </Portal>
    </>
  )
}
