import * as React from 'react'
import { BottomNavigation, Button, Text } from 'react-native-paper'
import { Provider as PaperProvider } from 'react-native-paper'
import { View } from 'react-native'
import { useLocation, useNavigate } from 'react-router'

const MusicRoute = () => <Text>Music</Text>

const AlbumsRoute = () => <Text>Albums</Text>

const RecentsRoute = () => <Text>Recents</Text>

const NotificationsRoute = () => <Text>Notifications</Text>

const MyComponent = () => {
  const [index, setIndex] = React.useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ])

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  })

  return (
    <View>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <Button icon="camera" mode="contained" onPress={() => navigate('/app')}>
        Press me
      </Button>
    </View>
  )
}

export default MyComponent
