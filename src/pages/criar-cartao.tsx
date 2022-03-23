import {  Button, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useCallback, useRef } from 'react'
import * as Yup from 'yup'


import { Header, Input, Select } from '../components'
import getValidationErrors from '../utils/getValidationErrors'
import InputMask from '../components/InputMask'

type FormData = {
  number: string
  cvv: string
  holder_name: string
  expiration_date: string
  brand: string
}

const Home: NextPage = () => {
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()

  const handleSubmit = useCallback((formData: FormData) =>{
    formRef.current?.setErrors({})

    function onlyNumbers(value?: string) {
      const onlyNumbers = /^[0-9]+$/
      const isValid = value?.match(onlyNumbers)
      return !!isValid
    }

    const data = {
      ...formData,
      // remove spaces
      number: formData.number.replace(/\D/g, ''),
      cvv: formData.cvv.replace(/\D/g, ''),
      // remove underscore _
      expiration_date: formData.expiration_date.replace(/\_/g ,'')
    }

    const schema = Yup.object().shape({
      holder_name: Yup.string()
        .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, 'Insira apenas letras')
        .required('Informe o nome no cartão'),
      number: Yup.string()
        .length(16, 'O cartão precisa ter 16 dígitos')
        .required('Número é obrigatório'),
      expiration_date: Yup.string()
        .required('Informe a data de expiração do cartão')
        .length(5, 'Digite uma data de expiração no formato mm/aa')
        .test('test-month', 'Insira um mês válido', value => {
          const month = Number(value?.substr(0, 2))
          if (month < 1 || month > 12) return false
          return true
        })
        .test('expired-card', 'Data de expiração inválida', value => {
          const year = Number(value?.substr(3, 2))
          const atualYear = Number(new Date().getFullYear().toString().substr(2, 2))

          if (year < atualYear) return false

          if (year === atualYear) {
            const month = Number(value?.substr(0, 2))
            const atualMonth = new Date().getMonth() + 1

            if (month < atualMonth) return false
          }
          return true
        }),
      cvv: Yup.string().length(3, 'O CVV deve conter no mínimo 3 dígitos').required('Informe o CVV do cartão')
    })

    schema.validate(data, { abortEarly: false }).catch((e: Yup.ValidationError) => {
      const err = getValidationErrors(e)
      formRef.current?.setErrors(err)
    })
  }, [])

  const goToIndex = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <>
      <Header />
      <Container  maxW="840px" mx='auto' mt={10}>
        <Form noValidate ref={formRef} onSubmit={handleSubmit}>
          <Flex pb={'2'} justifyContent={'space-between'} mx={6}>
            <Text>Cadastrar cartão</Text>
            <Button
              variant="outline"
              colorScheme="blue"
              size={'sm'}
              onClick={goToIndex}
              >
              Voltar
            </Button>
          </Flex>
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            }}
            gap={4}
          >
            <GridItem colSpan={{ base: 2 }}>
              <InputMask label='Número' name='number' mask="9999 9999 9999 9999" maskPlaceholder={''} />
            </GridItem>
            <GridItem colSpan={{ base: 2 }}>
              <Input label='Nome' name='holder_name'/>
            </GridItem>
            <GridItem colSpan={{ base: 2 }}>
              <InputMask mask={'99/99'} maskPlaceholder={''} label='Validade' name='expiration_date' />
            </GridItem>
            <GridItem colSpan={{ base: 2 }}>
              <InputMask mask={'999'} maskPlaceholder={''} label='CVV' name='cvv' />
            </GridItem>
            <GridItem colSpan={{ base: 2 }}>
              <Select label='Bandeira' name='brand'>
                <option value="Mastercard">Mastercard</option>
                <option value="Visa">Visa</option>
                <option value="American Express">American Express</option>
                <option value="Elo">Elo</option>
              </Select>
            </GridItem>
          </Grid>
          <Button colorScheme='green' mt={2} size='sm' type='submit'>Criar</Button>
        </Form>
      </Container>
    </>
  )
}

export default Home
