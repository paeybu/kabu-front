/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ fridgeItems }) {
  const router = useRouter();
  const freeze = fridgeItems.filter((item) => item.location === 'ช่องฟรีซ');

  const rongFreeze = fridgeItems.filter((item) => item.location === 'รองฟรีซ');

  const renderItem = (arr) =>
    arr.map(({ id, name, expire_date, location }) => (
      <Box
        key={id}
        boxShadow='0px 2px 5px rgba(0,0,0,0.1)'
        borderRadius='4px'
        padding='1rem'
      >
        <HStack justify='space-between'>
          <p>{name}</p>
          <Link href={`/item/${id}`}>
            <ChakraLink color='blue.400'>แก้ไข</ChakraLink>
          </Link>
        </HStack>
        <p>{location}</p>
        <p>หมดอายุ {dayjs(expire_date).format('DD/MM/YYYY')}</p>
      </Box>
    ));
  return (
    <Box maxWidth={1400} margin='0 auto' marginTop='2rem'>
      <VStack align='stretch' spacing='1rem'>
        <HStack justify='space-between'>
          <Heading marginBottom='1rem'>ของในตู้เย็น</Heading>
          <Button onClick={() => router.push('/item/create')}>สร้าง</Button>
        </HStack>
        <Heading
          marginBottom='1rem'
          size='lg'
          backgroundColor='greenPastel'
          color='blackAlpha.700'
          padding='0.5rem 1rem'
          borderRadius='4px'
        >
          ฟรีซ
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing='1rem'>
          {renderItem(freeze)}
        </SimpleGrid>
        <Heading
          marginBottom='1rem'
          size='lg'
          backgroundColor='limePastel'
          color='blackAlpha.700'
          padding='0.5rem 1rem'
          borderRadius='4px'
        >
          รองฟรีซ
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing='1rem'>
          {renderItem(rongFreeze)}
        </SimpleGrid>
        <Heading
          marginBottom='1rem'
          size='lg'
          backgroundColor='creamPastel'
          color='blackAlpha.700'
          padding='0.5rem 1rem'
          borderRadius='4px'
        >
          ปกติ
        </Heading>
        <Heading
          marginBottom='1rem'
          size='lg'
          backgroundColor='pinkPastel'
          color='blackAlpha.700'
          padding='0.5rem 1rem'
          borderRadius='4px'
        >
          ช่องผัก
        </Heading>
      </VStack>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const res = await axios.get('http://localhost:5000/fridgeitems');
  return {
    props: {
      fridgeItems: res.data,
    }, // will be passed to the page component as props
  };
}
