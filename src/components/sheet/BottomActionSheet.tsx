import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useMemo,
} from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet'
import type {
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet'
import { TouchableRipple, useTheme } from 'react-native-paper'
import { Func } from '@/shared/types'

interface Props extends BottomSheetModalProps {
  children: React.ReactNode
  footerText?: string
  onFooterPress?: Func
}

export const BottomActionSheet = forwardRef<BottomSheetModal, Props>(
  (
    { snapPoints, backgroundStyle, footerText, onFooterPress, ...props },
    ref
  ) => {
    const theme = useTheme()

    const memoSnapPoints = useMemo(
      () => snapPoints || ['25%', '50%'],
      [snapPoints]
    )

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    )

    const close = () =>
      (ref as MutableRefObject<BottomSheetModal>).current?.close()

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={memoSnapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: theme.colors.background,
          ...(backgroundStyle as object),
        }}
        {...props}
      >
        {props.children}
      </BottomSheetModal>
    )
  }
)
