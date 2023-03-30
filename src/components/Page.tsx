import { View, ViewProps } from 'react-native'

export function Page(props: ViewProps) {
  return (
    <View
      {...props}
      className={`min-h-screen w-full bg-[#E0E9E0] px-2 ${props.className}`}
    />
  )
}
