import {
  Control,
  Controller,
  FieldPath,
  get,
  UseControllerProps,
} from 'react-hook-form'
import { PlainObject } from '@/shared/types/utils'
import {
  HelperText,
  TextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper'
import { isNotEmptyObject } from 'class-validator'

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
  const theme = useTheme()

  const error = get(control._formState.errors, name)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <TextInput
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
            outlineColor={'#CCD6E3'}
            placeholderTextColor={'#CCD6E3'}
            mode={'outlined'}
            error={isNotEmptyObject(error)}
            {...props}
            style={{
              backgroundColor: 'transparent',
              fontSize: 13,
              height: 55,
              ...((props?.style as object) || {}),
            }}
          />
          <HelperText
            type="error"
            visible={error}
            style={{ color: theme.colors.error }}
          >
            {error?.message}
          </HelperText>
        </>
      )}
    />
  )
}
