import { faker } from '@faker-js/faker'
import { Deal } from 'db/entities/deal'
import { Merchant, MerchantCategory } from 'db/entities/merchant'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { DealRepository } from 'db/repositories/deal'
import _ from 'lodash'
import ormconfig from 'ormconfig'
import { createConnection, getCustomRepository, getRepository } from 'typeorm'
import { Point } from 'wkx'

const NUM_MERCHANTS = 10000
const NUM_OUTLETS_PER_MERCHANT = 5
const NUM_DEALS_PER_OUTLET = 2

async function main() {
  await createConnection(ormconfig)

  console.log('Creating merchants')
  const usedCompanyNames = new Set<string>()
  let merchants: Merchant[] = []
  for (let i = 0; i < NUM_MERCHANTS; i++) {
    let name = faker.company.companyName()
    for (let j = 0; j < 50; j++) {
      if (!usedCompanyNames.has(name)) break
      name = faker.company.companyName()
    }
    if (usedCompanyNames.has(name)) continue

    usedCompanyNames.add(name)
    merchants.push(
      new Merchant({
        name,
        category: _.sample(MerchantCategory),
      })
    )
  }
  merchants = await getRepository(Merchant).save(merchants)
  console.log(`Created ${merchants.length} merchants`)

  console.log('Creating outlets')
  let merchantOutlets: MerchantOutlet[] = []
  for (const merchant of merchants) {
    for (let i = 0; i < NUM_OUTLETS_PER_MERCHANT; i++) {
      merchantOutlets.push(
        new MerchantOutlet({
          merchant,
          imageUrl: 'https://picsum.photos/200',
          address: faker.address.streetAddress(),
          geoLocation: new Point(
            Number(faker.address.latitude(1.4, 1.3)),
            Number(faker.address.longitude(103.9, 103.5))
          ),
        })
      )
    }
  }
  merchantOutlets = await getRepository(MerchantOutlet).save(merchantOutlets, {
    chunk: 10,
  })
  console.log(`Created ${merchantOutlets.length} merchants`)

  console.log('Creating deals')
  let deals: Deal[] = []
  for (const merchantOutlet of merchantOutlets) {
    for (let i = 0; i < NUM_DEALS_PER_OUTLET; i++) {
      const originalPrice = Number(faker.commerce.price())
      const discountPrice = originalPrice * _.random(0.2, 0.8)

      const dealStartDate = faker.date.between(
        '2021-12-01T00:00:00.000Z',
        '2022-05-01T00:00:00.000Z'
      )
      const dealEndDate = faker.date.between(
        dealStartDate.toISOString(),
        '2022-05-02T00:00:00.000Z'
      )

      deals.push(
        new Deal({
          merchantOutlet,
          originalPrice,
          discountPrice,
          dealStartDate,
          dealEndDate,
          description: faker.lorem.paragraph(10),
        })
      )
    }
  }
  deals = await getCustomRepository(DealRepository).save(deals, { chunk: 20 })
  console.log(`Created ${deals.length} deals`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
