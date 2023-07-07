export function resetStoreState<T extends object>(state: T, initialState: T) {
  Object.keys(state).forEach((key) => {
    state[key] = initialState[key]
  })
}
