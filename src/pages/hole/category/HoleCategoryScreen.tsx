import { Image, ScrollView, StatusBar, View } from 'react-native'
import { Page } from '@/components/Page'
import { Button, TouchableRipple } from 'react-native-paper'
import { Svg } from '@/components/svg/Svg'
import { Text } from 'react-native-paper'
import { Categories, getCategoryByName } from '@/shared/constants/category'
import { useHoleCategoryRoute } from '@/shared/hooks/route/useHoleCategoryRoute'

export function HoleCategoryScreen() {
  const { go } = useHoleCategoryRoute()

  return (
    <Page>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={'flex space-y-2 pb-4'}>
          {Categories.map((category) => {
            const classification = getCategoryByName(category.name)!

            return (
              <TouchableRipple
                key={category.name}
                className={'rounded-lg bg-white overflow-hidden'}
                onPress={() =>
                  go({
                    name: classification.name,
                  })
                }
              >
                <>
                  <View className={'flex-row p-3 space-x-2 items-center'}>
                    <Svg SvgComponent={category.icon} size={32} />
                    <View className={'space-y-2'}>
                      <Text variant={'titleMedium'}>{category.name}</Text>
                    </View>
                  </View>
                  <View className={'flex-row flex-wrap'}>
                    {category.children.map((item) => (
                      <Button
                        key={item}
                        mode={'text'}
                        className={'w-1/4 p-1'}
                        textColor={'rgba(0,0,0,.7)'}
                        onPress={() => {
                          go({
                            name: classification.name,
                            subName: item,
                          })
                        }}
                      >
                        {item}
                      </Button>
                    ))}
                  </View>
                </>
              </TouchableRipple>
            )
          })}
        </View>
      </ScrollView>
    </Page>
  )
}
