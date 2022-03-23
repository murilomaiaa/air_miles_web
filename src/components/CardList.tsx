import { Box, Button, Flex, Table, Text, Th } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { api } from "../services/api"

export type Card = {
  id: string
  brand: string
  digits: string
}

export type Props = {
  cards: Card[]
  setCards: (cards: Card[]) => void
}

export const CardList = ({ cards, setCards }: Props) => {
  const [list, setList] = useState(<Box>Nenhum cartão cadastrado</Box>)

  const deleteCard = useCallback(async (id: string) => {
    api.delete('/cards/'+ id).then(() => {
      setCards(cards.filter(c=> c.id !== id))
    })
  }, [cards, setCards])

  useEffect(() => {
    if (cards.length === 0) {
      setList(<Box>Nenhum cartão cadastrado</Box>)
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
              onClick={() => deleteCard(card.id)}
            >
              Excluir
            </Button>
          </Flex>
        </Th>
      ))
    }</>)
  }, [cards, deleteCard])

  return <Table variant={'striped'} colorScheme="blue" size="md" bg="gray.50">
    {list}
  </Table>
}
