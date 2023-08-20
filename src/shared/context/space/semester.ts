import { createStore } from 'hox'
import { useState } from 'react'

export const [useCurrentSemester, CurrentSemesterContextProvider] = createStore(
  () => {
    const [currentSemesterId, setCurrentSemesterid] = useState<
      number | string
    >()
    const [selectedSemesterId, setSelectedSemesterId] = useState<
      number | string
    >()

    return {
      currentSemesterId,
      selectedSemesterId,
      setCurrentSemesterid,
      setSelectedSemesterId,
    }
  }
)
