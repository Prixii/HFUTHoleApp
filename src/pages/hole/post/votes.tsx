import { View } from 'react-native'
import { IconButton } from '@/components/IconButton'
import { Button, Dialog, Portal } from 'react-native-paper'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMount } from 'ahooks'
import { Input } from '@/components/form/Input'
import { AddIcon, CloseIcon } from '@/components/icon'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { formatDate } from '@/shared/utils/utils'
import { Snackbar } from '@/components/snackbar/snackbar'
import { add } from 'date-fns'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { HolePostVoteClassValidator } from '@/shared/validators/hole/post'
import { useHolePostContext } from '@/shared/context/hole'

export function HolePostVote() {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState<Date>(add(new Date(), { days: 1 }))
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const { setVotes } = useHolePostContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HolePostVoteClassValidator>({
    mode: 'all',
    resolver: classValidatorResolver(HolePostVoteClassValidator),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const appendField = () => {
    fields.length !== 5 && append({ value: '' })
  }

  useMount(() => {
    appendField()
  })

  const close = () => {
    setVisible(false)
  }

  const onSubmit = (data: HolePostVoteClassValidator) => {
    setVotes((draft) => {
      draft.items = data.items
      draft.endTime = date
    })
    close()
  }

  const onCreateVote = () => {
    setVisible(true)
  }

  const handleDelete = () => {
    remove(fields.map((_, index) => index))
    append({ value: '' })
    setVotes((draft) => {
      draft.items = []
    })
  }

  console.log(errors)

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          style={{ backgroundColor: '#fff' }}
          onDismiss={close}
        >
          <Dialog.Title>添加投票</Dialog.Title>
          <Dialog.Content>
            <View className={'p-0 grid space-y-2'}>
              <View className={'grid space-y-2'}>
                <Snackbar
                  text={`该投票将在 ${formatDate(date.toDateString())} 结束`}
                  icon={'info'}
                />
                <View>
                  {errors.items?.length > 0 ||
                    (errors.items?.message.length > 0 && (
                      <Snackbar
                        text={
                          errors.items[0]?.message ||
                          errors.items?.message ||
                          '请确保自己填写正确哦'
                        }
                        icon={'info'}
                        error={true}
                      />
                    ))}
                </View>
              </View>
              {fields.map((field, index) => {
                return (
                  <View
                    key={field.id}
                    className={'flex flex-row justify-between items-center'}
                  >
                    <View className={'w-10/12'}>
                      <Input
                        key={field.id}
                        control={control}
                        name={`items.${index}.value`}
                        label={`选项${index + 1}`}
                      />
                    </View>
                    {index === fields.length - 1 && fields.length !== 5 && (
                      <IconButton
                        icon={() => <AddIcon active={true} size={20} />}
                        onPress={() => appendField()}
                        transparent={true}
                      />
                    )}
                  </View>
                )
              })}
            </View>

            <View className={'mt-2'}>
              <Button
                icon={'calendar'}
                onPress={() => setDatePickerVisibility(true)}
              >
                选择时间
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={'datetime'}
                onConfirm={(date) => {
                  setDate(date)
                }}
                date={date}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDelete}>删除投票</Button>
            <Button onPress={handleSubmit(onSubmit)}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <IconButton icon={'vote'} onPress={onCreateVote} />
    </View>
  )
}
