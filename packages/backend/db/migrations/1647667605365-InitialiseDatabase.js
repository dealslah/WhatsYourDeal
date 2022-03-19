const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class InitialiseDatabase1647667605365 {
  name = 'InitialiseDatabase1647667605365'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`merchant\` (\`name\` varchar(255) NOT NULL, \`category\` enum ('Restaurants', 'Entertainment', 'Hotel') NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`merchant_outlet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`geoLocation\` point NOT NULL, \`merchantName\` varchar(255) NULL, SPATIAL INDEX \`IDX_e36c9f3fd65d5a090cd75bf5e3\` (\`geoLocation\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`deal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`originalPrice\` float(2) NOT NULL, \`discountPrice\` float(2) NOT NULL, \`description\` varchar(255) NOT NULL, \`dealStartDate\` datetime NOT NULL, \`dealEndDate\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`merchantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`merchant_outlet\` ADD CONSTRAINT \`FK_e4a83f40bd1a34e6d6c7bd1e060\` FOREIGN KEY (\`merchantName\`) REFERENCES \`merchant\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`deal\` ADD CONSTRAINT \`FK_923c073af7415a3fdb57500f2f4\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant_outlet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`deal\` DROP FOREIGN KEY \`FK_923c073af7415a3fdb57500f2f4\``
    )
    await queryRunner.query(
      `ALTER TABLE \`merchant_outlet\` DROP FOREIGN KEY \`FK_e4a83f40bd1a34e6d6c7bd1e060\``
    )
    await queryRunner.query(`DROP TABLE \`deal\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_e36c9f3fd65d5a090cd75bf5e3\` ON \`merchant_outlet\``
    )
    await queryRunner.query(`DROP TABLE \`merchant_outlet\``)
    await queryRunner.query(`DROP TABLE \`merchant\``)
  }
}
