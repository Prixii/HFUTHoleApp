import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Platform, StyleSheet, View } from 'react-native'
import { getQAQFont, ScreenHeight } from '@/shared/utils/utils'
import { CommentPostFAB } from '@/pages/hole/detail/CommentPostFAB'
import { useState } from 'react'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/button'
import { Input } from '@/components/form/Input'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView } from 'native-base'

export function CommentForm() {
  const [open, setOpen] = useState(false)

  const y = useDerivedValue(() => {
    return open ? -(ScreenHeight / 3) : 0
  }, [open])
  const opacity = useDerivedValue(() => {
    return open ? 1 : 0
  }, [open])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(y.value) }],
      opacity: withSpring(opacity.value),
    }
  })

  const { control } = useForm<{ comment: string }>()

  const toggle = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      {!open && <CommentPostFAB onPress={() => setOpen(true)} />}

      <View
        className={`absolute bottom-0 w-full items-center ${!open && 'h-0'}`}
      >
        <Animated.View
          style={[animatedStyle, { elevation: 10 }]}
          className={
            'bg-white rounded-lg p-2 w-11/12 max-w-[350px] grid space-y-1'
          }
        >
          <View className={'flex w-full flex-row items-center justify-between'}>
            <IconButton
              icon={'close'}
              className={'bg-transparent'}
              onPress={toggle}
            />
            <Button mode={'contained'}>发送</Button>
          </View>
          <View>
            <Input
              name={'comment'}
              control={control}
              multiline={true}
              style={{
                height: ScreenHeight * 0.2,
              }}
              outlineStyle={{ borderWidth: 0 }}
              placeholder={`请友善发言，我相信大家不想失去这个平台${getQAQFont(
                'happy'
              )}`}
            />
            <View className={'w-screen justify-between'}>
              <IconButton icon={'camera'} />
            </View>
          </View>
        </Animated.View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 80,
    color: 'white',
  },
  buttons: {
    marginTop: 50,
  },
})
