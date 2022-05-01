/* eslint-disable  no-console, no-undefined */
import dayjs from 'dayjs'
import * as common from '../utils/dates/common'

test('dates(common(isMonday))', () => {
  let date

  date = dayjs('2021-12-06T14:00:00.000Z')
  expect(common.isMonday(date)).toBeTruthy()

  date = dayjs('2021-12-07T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()

  date = dayjs('2021-12-08T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()

  date = dayjs('2021-12-09T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()

  date = dayjs('2021-12-10T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()

  date = dayjs('2021-12-11T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()

  date = dayjs('2021-12-12T14:00:00.000Z')
  expect(common.isMonday(date)).toBeFalsy()
})

test('dates(common(isSunday))', () => {
  let date

  date = dayjs('2021-12-06T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-07T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-08T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-09T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-10T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-11T14:00:00.000Z')
  expect(common.isSunday(date)).toBeFalsy()

  date = dayjs('2021-12-12T14:00:00.000Z')
  expect(common.isSunday(date)).toBeTruthy()
})

test('dates(common(isAfterWednesday))', () => {
  let date

  date = dayjs('2021-12-06T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeFalsy()

  date = dayjs('2021-12-07T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeFalsy()

  date = dayjs('2021-12-08T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeFalsy()

  date = dayjs('2021-12-09T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeTruthy()

  date = dayjs('2021-12-10T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeTruthy()

  date = dayjs('2021-12-11T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeTruthy()

  date = dayjs('2021-12-12T14:00:00.000Z')
  expect(common.isAfterWednesday(date)).toBeTruthy()
})

test('dates(common(isAfterMiddleMonth))', () => {
  let date

  date = dayjs('2021-12-01T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeFalsy()

  date = dayjs('2021-12-06T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeFalsy()

  date = dayjs('2021-12-14T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeFalsy()

  date = dayjs('2021-12-15T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeTruthy()

  date = dayjs('2021-12-16T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeTruthy()

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isAfterMiddleMonth(date)).toBeTruthy()
})

test('dates(common(isStartOfYear))', () => {
  let date

  date = dayjs('2021-12-30T14:00:00.000Z')
  expect(common.isStartOfYear(date)).toBeFalsy()

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isStartOfYear(date)).toBeFalsy()

  date = dayjs('2022-01-01T14:00:00.000Z')
  expect(common.isStartOfYear(date)).toBeTruthy()

  date = dayjs('2022-01-02T14:00:00.000Z')
  expect(common.isStartOfYear(date)).toBeFalsy()
})

test('dates(common(isEndOfYear))', () => {
  let date

  date = dayjs('2021-12-30T14:00:00.000Z')
  expect(common.isEndOfYear(date)).toBeFalsy()

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isEndOfYear(date)).toBeTruthy()

  date = dayjs('2022-01-01T14:00:00.000Z')
  expect(common.isEndOfYear(date)).toBeFalsy()

  date = dayjs('2022-01-02T14:00:00.000Z')
  expect(common.isEndOfYear(date)).toBeFalsy()
})

test('dates(common(isStartOfMonth))', () => {
  let date

  date = dayjs('2021-12-30T14:00:00.000Z')
  expect(common.isStartOfMonth(date)).toBeFalsy()

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isStartOfMonth(date)).toBeFalsy()

  date = dayjs('2022-01-01T14:00:00.000Z')
  expect(common.isStartOfMonth(date)).toBeTruthy()

  date = dayjs('2022-01-02T14:00:00.000Z')
  expect(common.isStartOfMonth(date)).toBeFalsy()
})

test('dates(common(isEndOfMonth))', () => {
  let date

  date = dayjs('2021-12-30T14:00:00.000Z')
  expect(common.isEndOfMonth(date)).toBeFalsy()

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isEndOfMonth(date)).toBeTruthy()

  date = dayjs('2022-01-01T14:00:00.000Z')
  expect(common.isEndOfMonth(date)).toBeFalsy()

  date = dayjs('2022-01-02T14:00:00.000Z')
  expect(common.isEndOfMonth(date)).toBeFalsy()
})

test('dates(common(isStartOfWeek))', () => {
  let date

  date = dayjs('2021-12-31T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-01T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-02T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-03T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeTruthy()

  date = dayjs('2022-01-04T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-05T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-06T14:00:00.000Z')
  expect(common.isStartOfWeek(date)).toBeFalsy()
})

test('dates(common(isEndOfWeek))', () => {
  let date

  date = dayjs('2021-12-31T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-01T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-02T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeTruthy()

  date = dayjs('2022-01-03T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-04T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-05T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()

  date = dayjs('2022-01-06T14:00:00.000')
  expect(common.isEndOfWeek(date)).toBeFalsy()
})

test('dates(common(backToStartOfWeek))', () => {
  let date

  date = dayjs('2022-01-04T14:00:00.000')
  expect(common.backToStartOfWeek(date).format()).toEqual('2021-12-20T00:00:00+01:00')

  date = dayjs('2022-01-06T14:00:00.000')
  expect(common.backToStartOfWeek(date).format()).toEqual('2021-12-27T00:00:00+01:00')
})

test('dates(common(backToEndOfWeek))', () => {
  let date

  date = dayjs('2022-01-04T14:00:00.000')
  expect(common.backToEndOfWeek(date).format()).toEqual('2021-12-26T23:59:59+01:00')

  date = dayjs('2022-01-06T14:00:00.000')
  expect(common.backToEndOfWeek(date).format()).toEqual('2022-01-02T23:59:59+01:00')
})

test('dates(common(startOfPreviousMonth))', () => {
  let date

  date = dayjs('2022-01-04T14:00:00.000')
  expect(common.startOfPreviousMonth(date).format()).toEqual('2021-12-01T00:00:00+01:00')

  date = dayjs('2022-03-04T14:00:00.000')
  expect(common.startOfPreviousMonth(date).format()).toEqual('2022-02-01T00:00:00+01:00')
})

test('dates(common(endOfPreviousMonth))', () => {
  let date

  date = dayjs('2022-01-04T14:00:00.000')
  expect(common.endOfPreviousMonth(date).format()).toEqual('2021-12-31T23:59:59+01:00')

  date = dayjs('2022-03-04T14:00:00.000')
  expect(common.endOfPreviousMonth(date).format()).toEqual('2022-02-28T23:59:59+01:00')
})

test('dates(computeStartAvailableDates)', () => {
  const date = dayjs('2022-01-11T14:00:00.000Z')
  console.log('date=', date)

  let dates = common.computeStartAvailableDates(
    dayjs('2019-01-07'),
    date,
    dayjs('1970-01-01T00:00:00.000Z')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(36)
  expect(dates[0].start).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[0].end).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[35].start).toEqual(new Date('2021-11-30T23:00:00.000Z'))
  expect(dates[35].end).toEqual(new Date('2021-11-30T23:00:00.000Z'))

  dates = common.computeStartAvailableDates(
    dayjs('2019-01-07'),
    date,
    date
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(194)
  expect(dates[0].start).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[0].end).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[193].start).toEqual(new Date('2022-01-09T23:00:00.000Z'))
  expect(dates[193].end).toEqual(new Date('2022-01-09T23:00:00.000Z'))

  dates = common.computeStartAvailableDates(
    dayjs('2019-01-07'),
    date,
    dayjs('2021-10-03T21:59:59.999Z')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(179)
  expect(dates[0].start).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[0].end).toEqual(new Date('2018-12-31T23:00:00.000Z'))
  expect(dates[178].start).toEqual(new Date('2021-09-26T22:00:00.000Z'))
  expect(dates[178].end).toEqual(new Date('2021-09-26T22:00:00.000Z'))
})

test('dates(computeEndAvailableDates)', () => {
  const date = dayjs('2022-01-11T14:00:00.000Z')
  console.log('date=', date)

  let startDate = dayjs('2021-11-01T14:00:00.000')
  let dates = common.computeEndAvailableDates(
    startDate,
    date,
    dayjs('1970-01-01T00:00:00.000Z')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(2)
  expect(dates[0].start).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[0].end).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[1].start).toEqual(new Date('2021-12-31T00:00:00.000'))
  expect(dates[1].end).toEqual(new Date('2021-12-31T00:00:00.000'))

  startDate = dayjs('2021-11-08T14:00:00.000')
  dates = common.computeEndAvailableDates(
    startDate,
    date,
    dayjs('1970-01-01T00:00:00.000Z')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(0)

  startDate = dayjs('2021-11-01T14:00:00.000')
  dates = common.computeEndAvailableDates(
    startDate,
    date,
    date
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(13)
  expect(dates[0].start).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[0].end).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[1].start).toEqual(new Date('2021-12-31T00:00:00.000'))
  expect(dates[1].end).toEqual(new Date('2021-12-31T00:00:00.000'))
  expect(dates[2].start).toEqual(new Date('2021-11-07T00:00:00.000'))
  expect(dates[2].end).toEqual(new Date('2021-11-07T00:00:00.000'))
  expect(dates[12].start).toEqual(new Date('2022-01-16T00:00:00.000'))
  expect(dates[12].end).toEqual(new Date('2022-01-16T00:00:00.000'))

  startDate = dayjs('2021-09-06T14:00:00.000')
  dates = common.computeEndAvailableDates(
    startDate,
    date,
    dayjs('2021-10-03T23:59:59.999')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(4)
  expect(dates[0].start).toEqual(new Date('2021-09-12T00:00:00.000'))
  expect(dates[0].end).toEqual(new Date('2021-09-12T00:00:00.000'))
  expect(dates[1].start).toEqual(new Date('2021-09-19T00:00:00.000'))
  expect(dates[1].end).toEqual(new Date('2021-09-19T00:00:00.000'))
  expect(dates[2].start).toEqual(new Date('2021-09-26T00:00:00.000'))
  expect(dates[2].end).toEqual(new Date('2021-09-26T00:00:00.000'))
  expect(dates[3].start).toEqual(new Date('2021-10-03T00:00:00.000'))
  expect(dates[3].end).toEqual(new Date('2021-10-03T00:00:00.000'))

  startDate = dayjs('2021-10-01T14:00:00.000')
  dates = common.computeEndAvailableDates(
    startDate,
    date,
    dayjs('2021-10-03T23:59:59.999')
  )
  console.log('dates=', dates)
  expect(dates.length).toEqual(3)
  expect(dates[0].start).toEqual(new Date('2021-10-31T00:00:00.000'))
  expect(dates[0].end).toEqual(new Date('2021-10-31T00:00:00.000'))
  expect(dates[1].start).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[1].end).toEqual(new Date('2021-11-30T00:00:00.000'))
  expect(dates[2].start).toEqual(new Date('2021-12-31T00:00:00.000'))
  expect(dates[2].end).toEqual(new Date('2021-12-31T00:00:00.000'))
})
