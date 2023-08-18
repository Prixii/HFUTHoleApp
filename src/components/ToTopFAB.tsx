import { FAB, FABProps, useTheme } from 'react-native-paper'

export function ToTopFAB(props: Partial<FABProps>) {
  const theme = useTheme()

  return (
    <FAB
      style={{
        backgroundColor: theme.colors.primary,
      }}
      icon={'arrow-up'}
      color={'white'}
      mode={'flat'}
      {...props}
      className={`rounded-full ${props.className}`}
    />
  )
}
