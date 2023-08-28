import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
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

type Props<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  rules?: UseControllerProps<T>['rules']
  transparent?: boolean
} & TextInputProps

export function Input<T extends object = PlainObject>({
  name,
  control,
  rules,
  transparent,
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
            placeholderTextColor={theme.colors.surfaceVariant}
            mode={'outlined'}
            error={isNotEmptyObject(error)}
            {...props}
            style={{
              backgroundColor: transparent ? 'transparent' : 'white',
              ...((props?.style as object) || {}),
            }}
          />
          {error?.message && (
            <HelperText
              type="error"
              visible={error}
              style={{ color: theme.colors.error }}
            >
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  )
}
