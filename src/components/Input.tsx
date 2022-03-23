import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as CInput,
  InputGroup,
  InputGroupProps,
  InputProps
} from '@chakra-ui/react'

interface Props extends InputProps {
  name: string
  label: string
  inputGroupProps?: InputGroupProps
}

export const Input = ({ name, label, inputGroupProps,...rest }: Props) => {
 
  const inputRef = useRef(null)

  const { fieldName, registerField, error, defaultValue } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <InputGroup {...inputGroupProps}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={fieldName} _disabled={{ color: 'gray.700' }}>
          {label}
        </FormLabel>
        <CInput
          type="text"
          defaultValue={defaultValue}
          id={fieldName}
          ref={inputRef}
          _disabled={{ bg: 'gray.100' }}
          {...rest}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </InputGroup>
  )
}
