import { Box, Button, Container, TextField, Typography } from '@mui/material'
import styles from '../styles/ContactUs.module.css'

const ContactUs = () => {
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

      <TextField
        fullWidth
        id="merchant-name"
        label="Merchant Name"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="merchant-category"
        label="Merchant Category"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="merchant-address"
        label="Merchant Address"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="merchant-location"
        label="Merchant Location"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="deal-description"
        label="Deal Description"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="deal-image"
        label="Deal Image"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="original-price"
        label="Original Price"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="current-price"
        label="Current Price"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="promo-start-date"
        label="Promotion Start Date"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />
      <TextField
        fullWidth
        id="promo-end-date"
        label="Promotion End Date"
        variant="outlined"
        margin="normal"
        className={styles.textField}
      />

      <Box sx={{ m: 3 }} />
      <Button variant="contained" sx={{ borderRadius: 28 }}>
        Submit
      </Button>
    </Container>
  )
}

export default ContactUs
