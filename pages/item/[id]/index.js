import {
  Box,
  Button,
  Input,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const Item = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const router = useRouter();
  const { id, data } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { exp_date, ...params } = data;
    const expire_date = dayjs(data.exp_date).format('DD/MM/YY');
    params.expire_date = expire_date;

    try {
      await axios.patch(`http://localhost:5000/fridgeitems/${id}`, params);
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/fridgeitems/${id}`);
      router.push('/');
    } catch (error) {}
  };

  return (
    <>
      <Box maxWidth={1400} margin='0 auto' marginTop='2rem'>
        {JSON.stringify(data)}
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align='flex-start' spacing='1rem'>
            <Input defaultValue={data.name} {...register('name')} />
            <Input defaultValue={data.location} {...register('location')} />

            <input
              defaultValue={dayjs(data.expire_date).format('YYYY-MM-DD')}
              type='date'
              {...register('exp_date')}
            />
            <Button type='submit'>ส่ง</Button>
            <Button onClick={() => setIsOpen(true)}>ลบ</Button>
          </VStack>
        </form>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Item;
export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const res = await axios.get(`http://localhost:5000/fridgeitems/${id}`);
  return {
    props: {
      data: res.data,
      id,
    },
  };
}
