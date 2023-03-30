import { Text, useTheme } from 'react-native-paper'

interface Props {
  id: number
}

export function IdText(props: Props) {
  const theme = useTheme()

  return (
    <Text
      className={'font-bold'}
      variant={'titleSmall'}
      style={{ color: theme.colors.primary }}
    >
      #{props.id}
    </Text>
  )
}
