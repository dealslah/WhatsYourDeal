import { useEffect, useState } from 'react'

export function useGeoLocation() {
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

  return { isLocationValid, userLatitude, userLongitude }
}
