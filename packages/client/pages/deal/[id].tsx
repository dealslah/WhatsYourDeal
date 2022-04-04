import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TelegramButton from '../../components/TelegramButton'
import { Deal } from '../../entities/deal'
import PriceFormatter from '../../util/PriceFormatter'
import {
  distance,
  formatDistance,
  getDealData,
  getDealIds,
} from '../../util/util'
import styles from './Deal.module.css'

export default function DealPage({ dealData }: { dealData: [Deal] }) {
  const deal = dealData[0]

  const router = useRouter()
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

      <Typography variant="h4">{deal.merchantOutlet.merchant.name}</Typography>

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
    </Container>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getDealIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: Deal }) {
  // Fetch necessary data for the blog post using params.id
  const dealData = getDealData(params.id)
  return {
    props: {
      dealData,
    },
  }
}
