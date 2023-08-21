import { PlainObject } from '@/shared/types/utils'
import { useTheme } from 'react-native-paper'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'
import { MutableRefObject, useEffect, useRef } from 'react'

type Props<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  rules?: UseControllerProps<T>['rules']
  transparent?: boolean
} & TextInputProps

export const NativeInput = <T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
  ...props
}: Props<T>) => {
  const theme = useTheme()
  const inputRef = useRef<TextInput>()

  useEffect(() => {
    if (props.autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [props.autoFocus])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextInput
            onChangeText={field.onChange}
            value={field.value}
            placeholderTextColor={theme.colors.surfaceVariant}
            cursorColor={theme.colors.primary}
            textAlignVertical={'top'}
            ref={inputRef as MutableRefObject<TextInput>}
            {...props}
            style={{
              fontSize: 16,
              ...(props.style as object),
            }}
            autoFocus={false}
            focusable={false}
          />
        </>
      )}
    />
  )
}
