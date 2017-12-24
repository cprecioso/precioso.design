// Both these functions lifted and adapted from [date-fns](https://date-fns.org/)
function compareAsc(dateLeft, dateRight) {
  var diff = dateLeft.getTime() - dateRight.getTime()
  if (diff < 0) {
    return -1
  } else if (diff > 0) {
    return 1
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff
  }
}

function differenceInYears(dateLeft, dateRight) {
  var difference = dateLeft.getFullYear() - dateRight.getFullYear()
  dateLeft.setFullYear(dateLeft.getFullYear() - difference)
  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -1
  return difference - isLastYearNotFull
}

module.exports = differenceInYears(
  new Date(),
  new Date(1996, 4, 28)
)
