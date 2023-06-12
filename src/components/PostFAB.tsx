import { FAB, FABProps, useTheme } from 'react-native-paper'

export function PostFAB(props: Partial<FABProps>) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: theme.colors.primary,
      }}
      icon={'plus'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`absolute top-3/4 right-5 rounded-full ${props.className}`}
    />
  )
}
