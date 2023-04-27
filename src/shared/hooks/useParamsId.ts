import { useParams } from '@/shared/hooks/useParams'

export function useParamsId<T extends string | number = string>() {
  const params = useParams<{ id: T }>()

  return params.id
}
