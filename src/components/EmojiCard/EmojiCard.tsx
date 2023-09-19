/**
 * @author prixii
 * @date 2023-09-19 19
 */

import { View } from 'react-native'
import { useRef } from 'react'
import { AllEmoji } from './AllEmoji'
import { RecentEmoji } from './RecentEmoji'

export const EmojiCard = () => {
  const componentRef = useRef(null)

  return (
    <View
      ref={componentRef}
      style={{
        flexDirection: 'column',
        padding: 8,
        shadowColor: '#888',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        margin: '5%',
        width: '90%',
      }}
    >
      <RecentEmoji />
      <View
        style={{
          height: 0.2,
          backgroundColor: '#ccc',
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <AllEmoji />
    </View>
  )
}
