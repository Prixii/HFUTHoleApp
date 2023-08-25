import { createStore } from 'hox'
import { useState } from 'react'

type SemesterId = number | string

export const [useCurrentSemester, CurrentSemesterContextProvider] = createStore(
  () => {
    const [currentSemesterId, setCurrentSemesterId] = useState<SemesterId>()
    const [selectedSemesterId, setSelectedSemesterId] = useState<SemesterId>()

    const initializeSemesterId = (semesterId: SemesterId) => {
      setSelectedSemesterId(semesterId)
      setCurrentSemesterId(semesterId)
    }

    return {
      currentSemesterId,
      selectedSemesterId,
      initializeSemesterId,
      setCurrentSemesterId,
      setSelectedSemesterId,
    }
  }
)
