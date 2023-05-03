import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { View } from 'react-native'
import { FieldErrors, useForm } from 'react-hook-form'
import { HoleSearchValidator } from '@/shared/validators/hole/search'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useParams } from '@/shared/hooks/useParams'
import { useTheme } from 'react-native-paper'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { CloseIcon, SearchIcon } from '@/components/icon'
import { SearchInput } from '@/components/form/Search'
import { Toast } from '@/shared/utils/toast'
import { useSearchHistoryStore } from '@/store/hole/search'
import { useSearchNavigation } from '@/shared/hooks/useSearchNavigation'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { operateSearchData } from '@/store/reducer/search'

export function HoleSearchHeader() {
  const theme = useTheme()
  const params = useParams<ISearchResultParams>()
  const { searchWithKeywords } = useSearchNavigation()

  const data = useAppSelector((state) => state.search.data) as string[]

  const {
    control,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = useForm<HoleSearchValidator>({
    defaultValues: {
      keywords: params?.keywords || '',
    },
  })

  const dispatch = useAppDispatch()

  const onSubmit = useDebounce((data: HoleSearchValidator) => {
    dispatch(
      operateSearchData((draft) => {
        draft.unshift(data.keywords)
      })
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    searchWithKeywords(data.keywords)
  })

  const onError = (error: FieldErrors<HoleSearchValidator>) => {
    Toast.error({
      text1: error.keywords.message,
    })
  }

  const deleteInput = () => {
    setValue('keywords', '', { shouldDirty: true })
  }

  const onHandleSubmit = handleSubmit(onSubmit, onError)

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <BackAndButtonHeader
        onPress={onHandleSubmit}
        loading={false}
        submitText={'搜索'}
        buttonMode={'text'}
      >
        <View
          className={
            'flex flex-[5] flex-row space-x-2 rounded-full items-center px-2 py-1'
          }
          style={{
            backgroundColor: theme.colors.onBackground,
          }}
        >
          <SearchIcon size={16} />
          <View className={'h-6 flex-1'}>
            <SearchInput
              name={'keywords'}
              control={control}
              className={'text-xs'}
              cursorColor={theme.colors.primary}
              placeholder={'搜索正文内容、#标签、#树洞号'}
              maxLength={100}
              onSubmitEditing={onHandleSubmit}
            />
          </View>
          {dirtyFields.keywords && (
            <CloseIcon size={16} onPress={deleteInput} />
          )}
        </View>
      </BackAndButtonHeader>
    </View>
  )
}
