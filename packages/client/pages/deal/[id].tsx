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
import { formatDistance } from '../../util/util'
import styles from './Deal.module.css'

const DealPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [deal, setDeal] = useState<Deal | null>(null)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      const data = await api.findDealById(Number(id))
      setDeal(data.deal)
    })()
  })

  const handleBack = () => {
    router.back()
  }

  const [isLocationValid, setIsLocationValid] = useState(false)
  const [userLatitude, setUserLatitude] = useState(-1)
  const [userLongitude, setUserLongitude] = useState(-1)

  const success = (pos: GeolocationPosition) => {
    const crd = pos.coords
    setUserLatitude(crd.latitude)
    setUserLongitude(crd.longitude)
    setIsLocationValid(true)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(success)
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            success,
            (err) => {
              console.log(`ERROR(${err.code}): ${err.message}`)
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          )
        } else if (result.state === 'denied') {
          console.log('User denied geolocation position')
        }
      })
    } else {
      console.log('geolocation not available')
    }
  }, [])

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
