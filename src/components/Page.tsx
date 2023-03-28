import { View, ViewProps } from 'react-native'

export function Page(props: ViewProps) {
  return (
    <View
      {...props}
      style={{
        backgroundColor: '#EAE8FE',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
