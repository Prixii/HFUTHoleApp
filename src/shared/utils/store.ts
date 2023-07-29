export function changeStoreState(state: any, stateChange: any) {
  Object.keys(stateChange).forEach((key) => {
    state[key] = stateChange[key]
  })
}
