import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

export function ReactQueryProvider(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
