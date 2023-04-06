import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { View } from 'react-native'
import { Input } from '@/components/form/Input'
import { useForm } from 'react-hook-form'
import { HoleSearchValidator } from '@/shared/validators/hole/search'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useNavigation } from '@react-navigation/native'
import { useParams } from '@/shared/hooks/useParams'
import { useTheme } from 'react-native-paper'
import { ISearchResultParams } from '@/pages/hole/search/result/result'

export function HoleSearchHeader() {
  const params = useParams<ISearchResultParams>()

  const { control, handleSubmit } = useForm<HoleSearchValidator>({
    defaultValues: {
      keywords: params?.keywords || '',
    },
  })
  const navigation = useNavigation()

  const onSubmit = useDebounce((data: HoleSearchValidator) => {
    navigation.navigate('result', { keywords: data.keywords })
  })

  const theme = useTheme()

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <BackAndButtonHeader
        onPress={handleSubmit(onSubmit)}
        loading={false}
        submitText={'搜索'}
      />
      <Input
        name={'keywords'}
        control={control}
        placeholder={'搜索内容、#标签、#树洞号'}
        outlineStyle={{
          borderWidth: 0,
          borderBottomWidth: 1,
        }}
      />
    </View>
  )
}
