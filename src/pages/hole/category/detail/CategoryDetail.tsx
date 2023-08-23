import { useHoleCategoryList } from '@/swr/hole/category'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, StatusBar, View } from 'react-native'
import { CategoryDetailList } from '@/pages/hole/category/detail/CategoryDetailList'
import { Tabs } from 'react-native-collapsible-tab-view'

export function CategoryDetailScreen() {
  const { category, isLoading, name, subName } = useHoleCategoryList()
  const [activeClassification, setActiveClassification] = useState<string>(
    subName || category.children[0]
  )
  // const tabs = useMemo<
  //   (ITabViewTabs & { realComponent: React.FunctionComponent })[]
  // >(
  //   () =>
  //     category.children.map((item) => ({
  //       title: item,
  //       key: item,
  //       component: React.Fragment,
  //       realComponent: () => (
  //         <CategoryDetailList
  //           subClassification={item}
  //           enabled={item === activeClassification}
  //           onScroll={({ nativeEvent: { contentOffset } }) => {
  //             offsetY.value = contentOffset.y
  //           }}
  //           ListHeaderComponent={<></>}
  //         />
  //       ),
  //     })),
  //   [activeClassification, category.children]
  // )

  return (
    <LoadingScreen isLoading={isLoading}>
      <Tabs.Container
        renderHeader={CategoryDetailHeader}
        minHeaderHeight={StatusBar.currentHeight}
        onTabChange={(tab) => setActiveClassification(tab.tabName)}
        initialTabName={subName}
      >
        {category!.children.map((item) => (
          <Tabs.Tab name={item} key={item}>
            <CategoryDetailList
              subClassification={item}
              enabled={item === activeClassification}
              FlatListComponent={Tabs.FlatList}
            />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </LoadingScreen>
  )
}

// import { useHoleCategoryList } from '@/swr/hole/category'
// import { LoadingScreen } from '@/components/LoadingScreen'
// import { CategoryDetailHeader } from '@/pages/hole/category/detail/CategoryDetailHeader'
// import { ITabViewTabs } from '@/components/TabView'
// import React, { useMemo, useState } from 'react'
// import { CategoryDetailList } from '@/pages/hole/category/detail/CategoryDetailList'
// import { Tabs } from 'react-native-collapsible-tab-view'
//
// export function CategoryDetailScreen() {
//   const { category, isLoading, name, subName } = useHoleCategoryList()
//   const [activeClassification, setActiveClassification] = useState<string>(
//     subName || category.children[0]
//   )
//
//   const tabs = useMemo<ITabViewTabs[]>(
//     () =>
//       category.children.map((item) => ({
//         title: item,
//         key: item,
//         component: () => (
//           <CategoryDetailList
//             subClassification={item}
//             enabled={item === activeClassification}
//             FlatListComponent={Tabs.FlatList}
//           />
//         ),
//       })),
//     [activeClassification, category.children]
//   )
//
//   return (
//     <LoadingScreen isLoading={isLoading}>
//       <Tabs.Container
//         renderHeader={CategoryDetailHeader}
//         minHeaderHeight={50}
//         initialTabName={subName}
//       >
//         {tabs.map((item) => (
//           <Tabs.Tab name={item.title!} key={item.key}>
//             <item.component />
//           </Tabs.Tab>
//         ))}
//       </Tabs.Container>
//     </LoadingScreen>
//   )
// }
