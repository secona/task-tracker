export default function isEmptyObject(obj: object) {
  for (let i in obj) return false;
  return true
}
