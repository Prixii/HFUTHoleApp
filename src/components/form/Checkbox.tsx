import { Checkbox as NativeCheckbox, ICheckboxProps } from 'native-base'

import {
  Control,
  Controller,
  FieldPath,
  get,
  UseControllerProps,
} from 'react-hook-form'

export function Checkbox() {
  return <NativeCheckbox.Group />
}
