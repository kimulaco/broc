export const hasOwnProperty = (obj: object, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export const hasOwnProperties = (obj: object, props: string[]): boolean => {
  let prop: string
  for (prop of props) {
    if (!hasOwnProperty(obj, prop)) return false
  }
  return true
}
