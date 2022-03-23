import { Box, Button, Container, Typography } from "@mui/material";
import Image from "material-ui-image";
import { useRouter } from "next/router";
import TelegramButton from "../../components/TelegramButton";
import { Deal } from "../../entities/deal";
import PriceFormatter from "../../util/PriceFormatter";
import { getDealData, getDealIds } from "../../util/util";
import styles from "./Deal.module.css";

export default function DealPage({ dealData }: { dealData: [Deal] }) {
  const deal = dealData[0];
  console.log(deal);

  const router = useRouter();
  const handleBack = () => {
    router.back();
  }

  return (
    <Container>
      <Box sx={{ m: 3 }} />

      <Image src={deal.merchantOutlet.imageUrl} className={styles.image} />

      <Box sx={{ m: 2 }} />

      <Typography variant="h4">{deal.merchantOutlet.merchant.name}</Typography>

      <Box sx={{ m: 1 }} />

      <Typography variant="h5"
                  sx={{ display: 'inline-block' }}>{PriceFormatter.format(deal.currentPrice)}&nbsp;</Typography>
      <Typography variant="h5" className={styles.strikethrough}
                  sx={{ display: 'inline-block' }}>{PriceFormatter.format(deal.originalPrice)}</Typography>

      <Box sx={{ m: 2 }} />

      <Typography>{deal.dealDescription}</Typography>

      <Box sx={{ m: 2 }} />

      <Button variant="outlined" onClick={() => handleBack()} sx={{ borderRadius: 28 }}>Back</Button>
      <TelegramButton />
    </Container>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getDealIds();
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: Deal }) {
  // Fetch necessary data for the blog post using params.id
  const dealData = getDealData(params.id);
  console.log("params", params);
  return {
    props: {
      dealData
    }
  }
}
