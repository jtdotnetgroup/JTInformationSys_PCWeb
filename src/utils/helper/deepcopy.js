export const deepcopy = (obj) => {
  const keys = Object.keys(obj)
  const result = {}
  keys.forEach(k => {
    if (typeof obj[k] === 'object' && !!obj[k]) {
      result[k] = deepcopy(obj[k])
    } else {
      result[k] = obj[k]
    }
  })
  return result
}
