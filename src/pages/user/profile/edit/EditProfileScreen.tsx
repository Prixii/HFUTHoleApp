import { useUserProfile } from '@/swr/user/profile'
import { LoadingScreen } from '@/components/LoadingScreen'
import { EditProfileContent } from '@/pages/user/profile/edit/EditProfileContent'
import { SafeAreaView } from 'react-native-safe-area-context'

export function EditProfileScreen() {
  const { isLoading } = useUserProfile()

  return (
    <>
      <LoadingScreen isLoading={isLoading}>
        <EditProfileContent />
      </LoadingScreen>
    </>
  )
}
