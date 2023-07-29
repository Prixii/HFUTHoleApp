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

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={24}>
          <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
            <TouchableRipple onPress={onFooterPress || close}>
              <View className={'p-4'}>
                <Text style={styles.footerText}>{footerText || '取消'}</Text>
              </View>
            </TouchableRipple>
          </View>
        </BottomSheetFooter>
      ),
      []
    )

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
        footerComponent={renderFooter}
        {...props}
      >
        <StatusBar backgroundColor={'transparent'} translucent />
        {props.children}
      </BottomSheetModal>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#80f',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
  },
})
