const normalizeDate = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 4) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4) + '-'
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4)
  }
  return onlyNums.slice(0, 4) + '-' + onlyNums.slice(4, 6) + '-' + onlyNums.slice(6, 8)
}

export default normalizeDate