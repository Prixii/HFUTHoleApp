import * as React from 'react'
import { BottomNavigation, Button, Text } from 'react-native-paper'
import { View } from 'react-native'
import { useLocation, useNavigate } from 'react-router'
import { Avatar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icons from 'react-native-vector-icons/MaterialIcons'

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

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', '1')
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    alert(await AsyncStorage.getItem('@storage_Key'))
  }

  return (
    <View>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <Button icon="camera" mode="contained" onPress={() => navigate('/app')}>
        Press mes
      </Button>
      <Avatar.Image
        size={50}
        source={{
          uri: `https://api.dicebear.com/5.x/identicon/jpg?seed=${Math.random()}`,
        }}
      />
      <Button icon="camera" mode="contained" onPress={() => saveData()}>
        Press mess
      </Button>
      <Button icon="camera" mode="contained" onPress={() => getData()}>
        get data
      </Button>
      <Icons name={'add'}/>
    </View>
  )
}

export default MyComponent
