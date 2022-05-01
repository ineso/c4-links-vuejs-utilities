// Copyright Carrefour(2022)
//

import map from 'lodash-es/map'
import filter from 'lodash-es/filter'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

/**
 * Test if a given date is a monday.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is a monday.
 */
const isMonday = (date) => {
  return date.day() === 1
}

/**
 * Test if a given date is a sunday.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is a sunday.
 */
const isSunday = (date) => {
  return date.day() === 0
}

/**
 * Test if a given date is after wednesday.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is after wednesday.
 */
const isAfterWednesday = (date) => {
  return date.isoWeekday() > 3
}

/**
 * Test if a given date is after the middle of the month.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is after the middle of the month.
 */
const isAfterMiddleMonth = (date) => {
  return date.date() > 14
}

/**
 * Test if a given date is the first day of the year.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the first day of the year.
 */
const isStartOfYear = (date) => {
  return date.isSame(date.startOf('year'), 'day')
}

/**
 * Test if a given date is the last day of the year.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the last day of the year.
 */
const isEndOfYear = (date) => {
  return date.isSame(date.endOf('year'), 'day')
}

/**
 * Test if a given date is the first day of the month.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the first day of the month.
 */
const isStartOfMonth = (date) => {
  return date.isSame(date.startOf('month'), 'day')
}

/**
 * Test if a given date is the last day of the month.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the last day of the month.
 */
const isEndOfMonth = (date) => {
  return date.isSame(date.endOf('month'), 'day')
}

/**
 * Test if a given date is the first day of the week.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the first day of the week.
 */
const isStartOfWeek = (date) => {
  return date.isSame(date.startOf('isoWeek'), 'day')
}

/**
 * Test if a given date is the last day of the week.
 * 
 * @param {Date} date A date to test.
 * @return {boolean} return true if date is the last day of the week.
 */
const isEndOfWeek = (date) => {
  return date.isSame(date.endOf('isoWeek'), 'day')
}

/**
 * Return the date corresponding to the first day of the previous month.
 * 
 * @param {Date} date A date to which to compute.
 * @return {Date} the date corresponding to the first day of the previous month.
 */
const startOfPreviousMonth = (date) => {
  return dayjs(new Date(
    date.year(),
    date.month(),
    1,
    date.hour(),
    date.minute(),
    date.second(),
    date.millisecond()
  )).subtract(1, 'day').startOf('month')
}

/**
 * Return the date corresponding to the last day of the previous month.
 * 
 * @param {Date} date A date to which to compute.
 * @return {Date} the date corresponding to the last day of the previous month.
 */
const endOfPreviousMonth = (date) => {
  return dayjs(new Date(
    date.year(),
    date.month(),
    1,
    date.hour(),
    date.minute(),
    date.second(),
    date.millisecond()
  )).subtract(1, 'day').endOf('month')
}

/**
 * Return the date corresponding to the first day of the available week.
 * 
 * @param {Date} date A date to which to compute.
 * @return {Date} the date corresponding to the first day of the available week.
 */
const backToStartOfWeek = (date) => {
  return date.subtract(isAfterWednesday(date) ? 1 : 2, 'week').startOf('isoWeek')
}

/**
 * Return the date corresponding to the last day of the available week.
 * 
 * @param {Date} date A date to which to compute.
 * @return {Date} the date corresponding to the last day of the available week.
 */
const backToEndOfWeek = (date) => {
  return date.subtract(isAfterWednesday(date) ? 1 : 2, 'week').endOf('isoWeek')
}

function computeDates (start, end, maxWeek) {
  const previousMonth = endOfPreviousMonth(end)

  let allStartOfMonths = []
  let allEndOfMonths = []
  let startOfAllMonths = start

  while (startOfAllMonths.isBefore(end)) {
    allStartOfMonths.push(startOfAllMonths.startOf('month'))
    allEndOfMonths.push(startOfAllMonths.endOf('month'))
    startOfAllMonths = startOfAllMonths.add(1, 'month')
  }

  allStartOfMonths = filter(
    allStartOfMonths,
    d => d.isBefore(previousMonth)
  )
  allEndOfMonths = filter(
    allEndOfMonths,
    d => d.isBefore(previousMonth) || d.isSame(previousMonth, 'day')
  )

  const allStartOfWeeks = []
  const allEndOfWeeks = []
  let startOfAllWeeks = start
  while (startOfAllWeeks.isBefore(maxWeek)) {
    allStartOfWeeks.push(startOfAllWeeks.startOf('isoWeek'))
    allEndOfWeeks.push(startOfAllWeeks.endOf('isoWeek'))
    startOfAllWeeks = startOfAllWeeks.add(1, 'week')
  }
  return {
    allStartOfMonths,
    allStartOfWeeks,
    allEndOfMonths,
    allEndOfWeeks
  }
}

/**
 * Compute the list of available dates for the start calendar.
 * 
 * @param {Date} startDate the start date on which to compute.
 * @param {Date} endDate the start date on which to compute.
 * @param {Date} maxWeek the date of the maximum week to jump.
 * @return {Date[]} the list of available dates for the start calendar.
 */
const computeStartAvailableDates = (startDate, endDate, maxWeek) => {
  const dates = computeDates(startDate, endDate, maxWeek)

  const monthsDay = map(dates.allStartOfMonths, d => {
    const toDate = d.toDate()
    return { start: toDate, end: toDate }
  })
  const weeksDays = map(dates.allStartOfWeeks, d => {
    const toDate = d.toDate()
    return { start: toDate, end: toDate }
  })
  return [
    ...monthsDay,
    ...weeksDays
  ]
}

/**
 * Compute the list of available dates for the end calendar.
 * 
 * @param {Date} startDate the start date on which to compute.
 * @param {Date} endDate the start date on which to compute.
 * @param {Date} maxWeek the date of the maximum week to jump.
 * @return {Date[]} the list of available dates for the end calendar.
 */
const computeEndAvailableDates = (startDate, endDate, maxWeek) => {
  const dates = computeDates(startDate, endDate, maxWeek)

  const days = []
  if (isStartOfMonth(startDate)) {
    const monthsDays = map(dates.allEndOfMonths, d => {
      const toDate = d.startOf('day').toDate()
      return { start: toDate, end: toDate }
    })
    days.push(...monthsDays)
  }
  if (isMonday(startDate)) {
    const weeksDays = map(dates.allEndOfWeeks, d => {
      const toDate = d.startOf('day').toDate()
      return { start: toDate, end: toDate }
    })
    days.push(...weeksDays)
  }
  return days.sort((a, b) => dayjs(a.start).isAfter(dayjs(b.start) ? 1 : -1))
}

export {
  isMonday,
  isSunday,
  isAfterWednesday,
  isAfterMiddleMonth,
  isStartOfYear,
  isEndOfYear,
  isStartOfMonth,
  isEndOfMonth,
  isStartOfWeek,
  isEndOfWeek,
  backToStartOfWeek,
  backToEndOfWeek,
  startOfPreviousMonth,
  endOfPreviousMonth,
  computeStartAvailableDates,
  computeEndAvailableDates
}
