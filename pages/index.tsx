import { Box, Button, Container, Flex, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Header } from '../src/components'

const Home: NextPage = () => {
  const router = useRouter()
  const cards = [
    { id: '321321', brand: 'Master Card', digits: '4231' },
    { id: '3asdf21321', brand: 'Visa', digits: '1235' },
    { id: '32asdf1321', brand: 'Master Card', digits: '0556' }
  ]


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
        <Table colorScheme="blue" size="md" bg="gray.50">
          {cards.map(card => (
            <Th display={'flex'} justifyContent={'space-between'} key={`row-${card.id}`} _hover={{ bg: 'blue.50' }}>
              <Text>{card.brand}</Text>
              <Flex>
                <Text mx={2} my={'auto'}>Final {card.digits}</Text>
                <Button
                  variant="solid"
                  size={'sm'}
                  colorScheme="red"
                  // onClick={() => handleOpenModal(doctor)}
                >
                  Excluir
                </Button>
              </Flex>
            </Th>
          ))}
        </Table>
      </Container>
    </>
  )
}

export default Home
