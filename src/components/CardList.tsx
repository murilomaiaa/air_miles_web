import { Box, Button, Flex, Table, Text, Th } from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"

export type Card = {
  id: string
  brand: string
  digits: string
}

export type Props = {
  cards: Card[]
}

export const CardList = ({ cards }: Props) => {
  const [list, setList] = useState(() => {
    if (cards.length === 0) {
      return <Box>Nenhum cartão cadastrado</Box>
    }
    return <>{
      cards.map(card => (
        <Th display={'flex'} justifyContent={'space-between'} key={`row-${card.id}`} _hover={{ bg: 'blue.50' }}>
          <Text>{card.brand}</Text>
          <Flex>
            <Text mx={2} my={'auto'}>Final {card.digits}</Text>
            <Button
              variant="solid"
              size={'sm'}
              colorScheme="red"
            >
              Excluir
            </Button>
          </Flex>
        </Th>
      ))
    }</>
  })

  useEffect(() => {
    if (cards.length === 0) {
      setList( <Box>Nenhum cartão cadastrado</Box>)
    }
    setList(<>{
      cards.map(card => (
        <Th display={'flex'} justifyContent={'space-between'} key={`row-${card.id}`} _hover={{ bg: 'blue.50' }}>
          <Text>{card.brand}</Text>
          <Flex>
            <Text mx={2} my={'auto'}>Final {card.digits}</Text>
            <Button
              variant="solid"
              size={'sm'}
              colorScheme="red"
            >
              Excluir
            </Button>
          </Flex>
        </Th>
      ))
    }</>)

  }, [cards])

  return <Table colorScheme="blue" size="md" bg="gray.50">
    {list}
  </Table>
}
