import { Control, Controller, FieldPath } from 'react-hook-form'
import { PlainObject } from '@/shared/types/utils'
import { TextInput, TextInputProps } from 'react-native-paper'
import { useState } from 'react'
import { Input } from '@/components/form/Input'

type Props<T> = {
  name: FieldPath<T>
  control: Control<T>
} & TextInputProps

export function PasswordInput<T extends object = PlainObject>({
  name,
  control,
  ...props
}: Props<T>) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <Input<T>
      name={name}
      control={control}
      secureTextEntry={!isShowPassword}
      right={
        <TextInput.Icon
          onPress={(e) => setIsShowPassword((prev) => !prev)}
          icon={isShowPassword ? 'eye' : 'eye-off'}
        />
      }
      {...props}
    />
  )
}
