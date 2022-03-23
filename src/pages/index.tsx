import { Button, Container, Flex,  Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Card, CardList, Header } from '../components'
import { api } from '../services/api'

type CardsResponse = {
  creditCards: Array<{
    id: string
    brand: string
    holder_name: string
    last_digits: string
  }>
}

const Home: NextPage = () => {
  const router = useRouter()
  const [cards, setCards]= useState<Card[]>([])

  useEffect(() => {
    async function fetch() {
      const response = await api.get<CardsResponse>('/cards')
      console.log({response})
      setCards(response.data.creditCards.map(c=> ({
        id: c.id,
        brand: c.brand,
        digits: c.last_digits
      })))
    }
    fetch()
  }, [])

  const handleAddNewUser = useCallback(() => {
    router.push('/criar-cartao')
  }, [router])

  return (
    <>
      <Header />
      <Container maxW="840px" mx='auto' mt={10}>
        <Flex pb={'2'} justifyContent={'space-between'} mx={6}>
          <Text>Cartões cadastrados</Text>
          <Button
            variant="solid"
            colorScheme="green"
            size={'sm'}
            onClick={handleAddNewUser}
          >
            Novo +
          </Button>
        </Flex>
        <CardList cards={cards}/>
      </Container>
    </>
  )
}

export default Home
