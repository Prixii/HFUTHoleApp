import { useDebounceFn } from 'ahooks'
import { Func } from '@/shared/types'

export function useDebounce<T extends Func>(
  ...args: Parameters<typeof useDebounceFn<T>>
) {
  return useDebounceFn(args[0], { wait: 250, ...args[1] }).run
}
