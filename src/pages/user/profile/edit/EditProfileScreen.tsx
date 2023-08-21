import { useUserProfile } from '@/swr/user/profile'
import { LoadingScreen } from '@/components/LoadingScreen'
import { EditProfileContent } from '@/pages/user/profile/edit/EditProfileContent'
import { useStatusBarStyle } from '@/shared/hooks/useStatusBarStyle'

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
