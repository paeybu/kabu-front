import { Box, Button, Input, VStack, Select } from '@chakra-ui/react';
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
      await axios.post('http://localhost:5000/fridgeitems', params);
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
            <label htmlFor='name'>ชื่อ</label>
            <Input {...register('name')} />
            <label htmlFor='location'>ตำแหน่ง</label>
            <Select {...register('location')}>
              <option value='ช่องฟรีซ'>ช่องฟรีซ</option>
              <option value='รองฟรีซ'>รองฟรีซ</option>
              <option value='ปกติ'>ปกติ</option>
              <option value='ช่องผัก'>ช่องผัก</option>
            </Select>

            <input
              defaultValue={dayjs().format('YYYY-MM-DD')}
              type='date'
              {...register('exp_date')}
            />
            <Button type='submit'>ส่ง</Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default Item;
