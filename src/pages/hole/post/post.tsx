import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { Input } from '@/components/form/Input'
import { FieldErrors, useForm } from 'react-hook-form'
import { PostHoleValidator } from '@/shared/validators/hole'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ScreenHeight } from '@/shared/utils/utils'
import { IconButton } from '@/components/IconButton'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { PostHoleRequest } from '@/request/apis/hole'
import Toast from 'react-native-toast-message'

export function HolePost() {
  const { control, handleSubmit } = useForm<PostHoleValidator>({
    resolver: classValidatorResolver(PostHoleValidator),
  })

  const navigation = useNavigation()

  const mutation = useMutation({
    mutationFn: (data: PostHoleValidator) => PostHoleRequest(data),
    onSuccess(data) {
      Toast.show({
        type: 'success',
        text1: data.msg,
      })
    },
  })

  const onSubmit = (data: PostHoleValidator) => {
    mutation.mutate(data)
  }

  const onErrors = (errors: FieldErrors<PostHoleValidator>) => {
    console.log(errors)
  }

  return (
    <View className={'min-h-screen bg-#EAE8FE space-y-2'}>
      <View className={'flex flex-row justify-between items-center'}>
        <IconButton
          icon={'close'}
          className={'bg-transparent'}
          onPress={() => navigation.goBack()}
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit, onErrors)}>
          发布
        </Button>
      </View>
      <View className={'p-5 rounded-lg bg-white'}>
        <Input
          name={'body'}
          control={control}
          multiline={true}
          style={{
            height: ScreenHeight * 0.6,
          }}
        />
        <View className={'flex flex-row justify-between items-center'}>
          <View>
            <Button mode={'contained'}>添加标签</Button>
          </View>
          <View className={'flex flex-row'}>
            <IconButton
              icon={'camera'}
              className={'bg-[#00AB55]/20'}
              iconColor={'#00AB55'}
            />
            <IconButton icon={'plus'} />
          </View>
        </View>
      </View>
    </View>
  )
}
