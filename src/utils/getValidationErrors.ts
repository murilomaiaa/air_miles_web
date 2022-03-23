import { ValidationError } from 'yup'

type Errors = {
  [key: string]: string
}

export default function getValidationErrors(error: ValidationError): Errors {
  const validationErrors: Errors = {}

  error.inner.forEach(err => {
    validationErrors[err.path!] = err.message
  })

  return validationErrors
}
