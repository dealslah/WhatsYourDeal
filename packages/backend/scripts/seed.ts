import { faker } from '@faker-js/faker'
import { Deal } from 'db/entities/deal'
import { Merchant, MerchantCategory } from 'db/entities/merchant'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { DealRepository } from 'db/repositories/deal'
import _ from 'lodash'
import ormconfig from 'ormconfig'
import { createConnection, getCustomRepository, getRepository } from 'typeorm'
import { Point } from 'wkx'

const NUM_MERCHANTS = 100
const NUM_OUTLETS_PER_MERCHANT = 10
const NUM_DEALS_PER_OUTLET = 5
const CHUNK_SIZE = 20

async function main() {
  await createConnection(await ormconfig)

  console.log('Creating merchants')
  const merchants = await createMerchants()
  console.log(`Created ${merchants.length} merchants`)

  console.log('Creating outlets')
  const merchantOutlets = await createMerchantOutlets(merchants)
  console.log(`Created ${merchantOutlets.length} merchant outlets`)

  console.log('Creating deals')
  const deals = await createDeals(merchantOutlets)
  console.log(`Created ${deals.length} deals`)
}

async function createMerchants() {
  const usedCompanyNames = new Set<string>()
  const merchants: Merchant[] = []
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

  const savedMerchants = await Promise.all(
    _.chunk(merchants, CHUNK_SIZE).map((chunk) => {
      return getRepository(Merchant).save(chunk)
    })
  )
  return _.flatten(savedMerchants)
}

async function createMerchantOutlets(merchants: Merchant[]) {
  const merchantOutlets: MerchantOutlet[] = []
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

  const savedOutlets = await Promise.all(
    _.chunk(merchantOutlets, CHUNK_SIZE).map((chunk) => {
      return getRepository(MerchantOutlet).save(chunk)
    })
  )
  return _.flatten(savedOutlets)
}

async function createDeals(merchantOutlets: MerchantOutlet[]) {
  const deals: Deal[] = []
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
  const savedDeals = await Promise.all(
    _.chunk(deals, CHUNK_SIZE).map((chunk) => {
      return getCustomRepository(DealRepository).save(chunk)
    })
  )
  return _.flatten(savedDeals)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
