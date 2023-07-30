import { StatusBar } from 'react-native'
import { useUserProfile } from '@/swr/user/profile'
import { LoadingScreen } from '@/components/LoadingScreen'
import { EditProfileContent } from '@/pages/user/profile/edit/EditProfileContent'

export function EditProfileScreen() {
  const { isLoading } = useUserProfile()

  return (
    <>
      <StatusBar translucent={false} />
      <LoadingScreen isLoading={isLoading}>
        <EditProfileContent />
      </LoadingScreen>
    </>
  )
}
