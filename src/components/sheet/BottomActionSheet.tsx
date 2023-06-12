import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { TouchableRipple, useTheme } from 'react-native-paper'

interface Props {
  children: React.ReactNode
}

export const BottomActionSheet = forwardRef<BottomSheetModal, Props>(
  (props, ref) => {
    const theme = useTheme()

    const snapPoints = useMemo(() => ['25%', '50%'], [])

    const renderBackdrop = useCallback(
      (props) => (
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
      (props) => (
        <BottomSheetFooter {...props} bottomInset={24}>
          <View className={'mx-4 rounded-lg overflow-hidden bg-[#80f]'}>
            <TouchableRipple onPress={close}>
              <View className={'p-4'}>
                <Text style={styles.footerText}>取消</Text>
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
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        footerComponent={renderFooter}
      >
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
