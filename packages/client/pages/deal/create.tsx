import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { CreateDealRequest } from '@whatsyourdeal/backend/types/interfaces'
import { Merchant, MerchantOutlet } from '@whatsyourdeal/backend/types/models'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import api from '../../api'
import styles from '../styles/ContactUs.module.css'

type FormInputs = CreateDealRequest

const CreateDealPage: NextPage = () => {
  const router = useRouter()
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [merchantOutlets, setMerchantOutlets] = useState<MerchantOutlet[]>([])

  useEffect(() => {
    ;(async () => {
      const data = await api.listMerchants()
      setMerchants(data.merchants)
    })()
  }, [])

  const onSelectMerchantName = useCallback(async (merchantName: string) => {
    setMerchantOutlets([])
    const data = await api.listMerchantOutlets(merchantName)
    setMerchantOutlets(data.outlets)
  }, [])

  const { register, handleSubmit, control } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    async (data) => {
      console.log(`Submitting: `, data)
      let hasSucceeded = false
      try {
        await api.createDeal(data)
        hasSucceeded = true
      } catch (e) {
        console.error(e)
      }

      if (hasSucceeded) {
        setTimeout(() => router.push('/'), 3000)
      }
    },
    [router]
  )

  return (
    <Container>
      <Box sx={{ m: 3 }} />
      <Typography variant="h3">Contact Us</Typography>

      <Box sx={{ m: 2 }} />

      <Typography>
        Hi Merchants! If you are interested in listing a deal on WhatsYourDeal,
        please fill up the form below and we will add your deal into
        WhatsYourDeal soon!
      </Typography>

      <form>
        <FormControl fullWidth margin="normal" className={styles.textField}>
          <InputLabel>Merchant Name</InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => onSelectMerchantName(e.target.value as string)}
          >
            {merchants.map((merchant) => (
              <MenuItem key={merchant.name} value={merchant.name}>
                {merchant.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" className={styles.textField}>
          <InputLabel>Outlet</InputLabel>
          <Select defaultValue="" {...register('merchantOutletId')}>
            {merchantOutlets.map((outlet) => (
              <MenuItem key={outlet.id} value={outlet.id}>
                {outlet.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Deal Description"
          margin="normal"
          className={styles.textField}
          {...register('dealDescription')}
        />
        <TextField
          fullWidth
          label="Original Price"
          margin="normal"
          className={styles.textField}
          {...register('originalPrice')}
        />
        <TextField
          fullWidth
          label="Current Price"
          margin="normal"
          className={styles.textField}
          {...register('currentPrice')}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name="promotionStartDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Promotion Start Date"
                value={value}
                onChange={(date: Date | null) => {
                  onChange(date?.toISOString())
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    className={styles.textField}
                    {...params}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            control={control}
            name="promotionEndDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Promotion End Date"
                value={value}
                onChange={(date: Date | null) => {
                  onChange(date?.toISOString())
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    className={styles.textField}
                    {...params}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        <Box sx={{ m: 3 }} />
        <Button
          variant="contained"
          sx={{ borderRadius: 28 }}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default CreateDealPage
