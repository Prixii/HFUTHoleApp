import { Svg } from '@/components/svg/Svg'
import BilibiliSvg from '@/assets/svg/home/bilibili.svg'
import { IconButton } from '@/components/IconButton'
import React, { useState } from 'react'
import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/form/Input'
import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { HoleAddBilibliClassValidator } from '@/shared/validators/hole/post'
import { Button } from '@/components/button'
import { useHolePostContext } from '@/shared/context/hole'

export const HolePostBilibili = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HoleAddBilibliClassValidator>({
    resolver: classValidatorResolver(HoleAddBilibliClassValidator),
    mode: 'onChange',
  })

  const { setBilibili } = useHolePostContext()

  const [visible, setVisible] = useState(false)

  const close = () => {
    setVisible(false)
  }

  const onPress = () => {
    setVisible(true)
  }

  const onSubmit = (data: HoleAddBilibliClassValidator) => {
    setBilibili(data.body)
    close()
  }

  return (
    <>
      <Dialog
        title={'添加B站视频'}
        visible={visible}
        onDismiss={() => setVisible(false)}
        actionsBody={
          <>
            <Button
              onPress={() => {
                setBilibili(null)
                setValue('body', null, { shouldValidate: false })
                close()
              }}
              error={true}
            >
              删除
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>确定</Button>
          </>
        }
      >
        <Input name={'body'} control={control} label={'BV号'} />
      </Dialog>
      <IconButton
        icon={() => <Svg SvgComponent={BilibiliSvg} size={25} />}
        onPress={onPress}
      />
    </>
  )
}
