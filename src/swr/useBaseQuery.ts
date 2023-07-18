import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'

interface Options<T> extends UseQueryOptions<T> {}

export function useBaseQuery<T>(options: Options<T>) {
  const query = useQuery<T>(options)

  const client = useQueryClient()

  const invalidateData = () => client.invalidateQueries(options.queryKey)

  return {
    ...query,
    invalidateData,
  }
}
