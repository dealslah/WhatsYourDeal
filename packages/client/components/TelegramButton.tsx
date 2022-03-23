import { Button } from "@mui/material";
import styles from "../styles/TelegramButton.module.css";
import TelegramIcon from '@mui/icons-material/Telegram';


const TelegramButton = () => {
  return (
    <Button variant="contained" sx={{ borderRadius: 28 }} className={styles.tbutton} endIcon={<TelegramIcon />}>
      Get Notified
    </Button>
  );
}

export default TelegramButton;
