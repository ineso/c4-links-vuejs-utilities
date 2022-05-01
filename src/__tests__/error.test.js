import useError from '../features/useError'

test('useError', () => {
  const {
    addError,
    clearError,
    isError,
    lastError,
    allErrors
  } = useError()


  expect(isError.value).toEqual(false)
  expect(lastError.value).toBeNull()

  expect(addError('this is an error')).toEqual(true)

  expect(isError.value).toEqual(true)

  expect(lastError.value).toEqual({
    "message": "this is an error",
    "details": null
  })

  expect(addError({
    message: 'this is another error',
    details: 'nore details here'
  })).toEqual(true)

  expect(lastError.value).toEqual({
    message: 'this is another error',
    details: 'nore details here'
  })

  expect(addError([
    {
      message: 'this is error 1',
      details: 'nore details here'
    },
    {
      message: 'this is error 2',
      details: 'nore details here'
    },
  ])).toEqual(true)

  expect(lastError.value).toEqual({
    message: 'this is error 2',
    details: 'nore details here'
  })

  expect(allErrors.value).toEqual('this is an error, nore details here, nore details here, nore details here')

  clearError()

  expect(isError.value).toEqual(false)

  expect(addError(null)).toEqual(false)
  expect(isError.value).toEqual(false)

  expect(addError(1)).toEqual(false)
  expect(isError.value).toEqual(false)

  expect(addError({
    a: 'this is another error',
    b: 'nore details here'
  })).toEqual(false)
  expect(isError.value).toEqual(false)
})