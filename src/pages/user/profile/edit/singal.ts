import { EventEmitter } from 'ahooks/lib/useEventEmitter'

export type ProfileItemType = 'avatar' | 'username'

export interface ProfileItemWithEventProps {
  event: EventEmitter<ProfileItemType>
}
