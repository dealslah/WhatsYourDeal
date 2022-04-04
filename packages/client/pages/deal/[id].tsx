import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import { Deal } from '@whatsyourdeal/backend/types/models'
import Image from 'material-ui-image'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '../../api'
import TelegramButton from '../../components/TelegramButton'
import PriceFormatter from '../../util/PriceFormatter'
import { useGeoLocation } from '../../util/useGeoLocation'
import { formatDistance } from '../../util/util'
import styles from './Deal.module.css'

const DealPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { isLocationValid, userLatitude, userLongitude } = useGeoLocation()

  const [deal, setDeal] = useState<Deal | null>(null)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const data = await api.findDealById(Number(id))
      setDeal(data.deal)
    })()
  }, [id])

  const handleBack = () => {
    router.back()
  }

  return (
    <Container>
      {!deal ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ m: 3 }} />

          <Button
            variant="outlined"
            onClick={() => handleBack()}
            sx={{ borderRadius: 28 }}
          >
            Back
          </Button>
          <TelegramButton />

          <Box sx={{ m: 2 }} />

          <Image src={deal.merchantOutlet.imageUrl} className={styles.image} />

          <Box sx={{ m: 2 }} />

          <Typography variant="h4">
            {deal.merchantOutlet.merchant.name}
          </Typography>

          <Box sx={{ m: 1 }} />

          {isLocationValid ? (
            <Typography variant="h5">
              {formatDistance(
                userLatitude,
                deal.merchantOutlet.location.latitude,
                userLongitude,
                deal.merchantOutlet.location.longitude
              )}
            </Typography>
          ) : (
            <div />
          )}

          <Box sx={{ m: 1 }} />

          <Typography variant="h5" sx={{ display: 'inline-block' }}>
            {PriceFormatter.format(deal.currentPrice)}&nbsp;
          </Typography>
          <Typography
            variant="h5"
            className={styles.strikethrough}
            sx={{ display: 'inline-block' }}
          >
            {PriceFormatter.format(deal.originalPrice)}
          </Typography>

          <Box sx={{ m: 2 }} />

          <Typography>{deal.dealDescription}</Typography>

          <Box sx={{ m: 2 }} />

          <Button
            variant="outlined"
            onClick={() => handleBack()}
            sx={{ borderRadius: 28 }}
          >
            Back
          </Button>
          <TelegramButton />
        </>
      )}
    </Container>
  )
}

export default DealPage
