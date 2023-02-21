import {
  Control,
  Controller,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form'
import { PlainObject } from '@/shared/types/utils'
import { TextInput, TextInputProps } from 'react-native-paper'

type Props<T> = {
  name: FieldPath<T>
  control: Control<T>
  rules?: UseControllerProps<T>['rules']
} & TextInputProps

export function Input<T extends object = PlainObject>({
  name,
  control,
  rules,
  ...props
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextInput
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          value={field.value}
          outlineColor={'#CCD6E3'}
          placeholderTextColor={'#CCD6E3'}
          mode={'outlined'}
          {...props}
          style={{
            backgroundColor: 'white',
            fontSize: 13,
            height: 55,
            ...((props?.style as object) || {}),
          }}
        />
      )}
    />
  )
}
