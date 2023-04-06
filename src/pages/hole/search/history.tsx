import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { SecondaryText } from '@/components/Text/SecondaryText'
import { DeleteIcon } from '@/components/icon'

export function HoleSearchHistory() {
  const data = [
    '合工大',
    'win',
    '中科大',
    '大专',
    '安徽第一高校',
    '输',
    '战地V',
  ]

  const theme = useTheme()

  return (
    <View className={'grid gap-4'}>
      <Text variant={'titleMedium'}>搜索历史</Text>
      <View className={'flex flex-row gap-2 flex-wrap'}>
        {data.map((tag) => (
          <View key={tag} className={'bg-gray-400/20 py-2 px-4 rounded-[5px]'}>
            <Text className={'text-xs'}>{tag}</Text>
          </View>
        ))}
      </View>
      <View
        className={'w-screen justify-center flex-row items-center text-center'}
      >
        <View>
          <DeleteIcon color={theme.colors.surfaceVariant} size={16} />
        </View>
        <SecondaryText>清空搜索历史</SecondaryText>
      </View>
    </View>
  )
}
