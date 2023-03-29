import React, { SetStateAction } from 'react'

export interface PortalDialogProps {
  visible: boolean
  setVisible: React.Dispatch<SetStateAction<boolean>>
}
