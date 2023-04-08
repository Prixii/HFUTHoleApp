import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

export function ReactQueryProvider(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
