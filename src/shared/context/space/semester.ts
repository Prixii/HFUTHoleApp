import { createStore } from 'hox'
import { useState } from 'react'

export const [useCurrentSemester, CurrentSemesterContextProvider] = createStore(
  () => {
    const [currentSemesterId, setCurrentSemesterId] = useState<number>()
    const [selectedSemesterId, setSelectedSemesterId] = useState<number>()

    const initializeSemesterId = (semesterId: number) => {
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
