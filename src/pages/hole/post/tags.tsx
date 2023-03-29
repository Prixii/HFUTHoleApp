import { useForm } from 'react-hook-form'
import { useHolePostContext } from '@/shared/context/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Limit } from '@/shared/config'
import { Button, Chip, Dialog, Portal } from 'react-native-paper'
import { View } from 'react-native'
import { Input } from '@/components/form/Input'
import React, { useState } from 'react'

enum InputError {
  MaximumExceeded = 'MaximumExceeded',
  Duplicate = 'Duplicate',
}

export function HolePostAddTags() {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<{ tag: string }>()

  const [visible, setVisible] = useState(false)

  const { tags, setTags } = useHolePostContext()

  const handleTagsInput = useDebounce(() => {
    if (tags.length > Limit.holeTagsMaxLength) {
      setError('tag', {
        message: `标签最多只能有${Limit.holeTagsMaxLength}个哦`,
        type: InputError.MaximumExceeded,
      })
    } else {
      if (errors?.tag?.type === InputError.MaximumExceeded) {
        clearErrors('tag')
      }
    }

    const tagValue = getValues('tag')
    const matchedAllIterator = Array.from(tagValue.matchAll(/(\S+)\s{1}/g))

    for (const matched of matchedAllIterator) {
      const matchedVal = matched[1]
      if (tags.length < Limit.holeTagsMaxLength) {
        if (!tags.includes(matchedVal)) {
          setTags((prev) => prev.concat(matchedVal))
          setValue('tag', '')
          clearErrors('tag')
        } else {
          setError('tag', {
            message: `标签#${matchedVal}重复了哦`,
            type: InputError.Duplicate,
          })
        }
      }
    }
  })

  const handleTagClose = useDebounce(
    (index: number) => {
      setTags((draft) => {
        draft.splice(index, 1)
      })
    },
    { wait: 50 }
  )

  return (
    <>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>添加标签</Dialog.Title>
          <Dialog.Content>
            <View className={'flex flex-row w-screen flex-wrap gap-2'}>
              {tags.map((tag, index) => (
                <Chip
                  icon="close"
                  onPress={() => handleTagClose(index)}
                  key={tag}
                >
                  {tag}
                </Chip>
              ))}
            </View>
            <Input
              name={'tag'}
              control={control}
              mode={'flat'}
              onTextInput={handleTagsInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Button mode={'contained'} onPress={() => setVisible(true)}>
        添加标签
      </Button>
    </>
  )
}
