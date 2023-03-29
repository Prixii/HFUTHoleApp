import { useForm } from 'react-hook-form'
import { useHolePostContext } from '@/shared/context/hole'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Limit } from '@/shared/config'
import { Button, Dialog, Portal } from 'react-native-paper'
import { Input } from '@/components/form/Input'
import React, { useState } from 'react'
import { IsString, MaxLength } from 'class-validator'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { Tags } from '@/components/tags'
import { getQAQFont } from '@/shared/utils/utils'

enum InputError {
  MaximumExceeded = 'MaximumExceeded',
  Duplicate = 'Duplicate',
}

class Validator {
  @MaxLength(Limit.holeVoteOptionLength, {
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @IsString()
  tag: string
}

export function HolePostAddTags() {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<Validator>({
    resolver: classValidatorResolver(Validator),
  })

  const [visible, setVisible] = useState(false)

  const {
    tags,
    setTags,
    form: { setValue: setRootValue },
  } = useHolePostContext()

  // TODO 抽象成组件
  const handleTagsInput = useDebounce(
    () => {
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
    },
    { wait: 100 }
  )

  const handleTagClose = useDebounce(
    (index: number) => {
      setTags((draft) => {
        draft.splice(index, 1)
      })
    },
    { wait: 50 }
  )

  const closeDialog = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    closeDialog()
    setRootValue('tags', tags)
  }

  return (
    <>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>添加标签</Dialog.Title>
          <Dialog.Content>
            <Tags tags={tags} onTagClick={handleTagClose} icon={'close'} />
            <Input
              name={'tag'}
              control={control}
              mode={'flat'}
              onTextInput={handleTagsInput}
              placeholder={`输入标签按空格就能添加了哦${getQAQFont('happy')}`}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>确定</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Button mode={'contained'} onPress={() => setVisible(true)}>
        选择标签
      </Button>
    </>
  )
}
