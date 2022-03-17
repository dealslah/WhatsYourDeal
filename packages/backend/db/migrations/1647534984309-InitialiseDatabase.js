const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class InitialiseDatabase1647534984309 {
  name = 'InitialiseDatabase1647534984309'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`merchant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category\` enum ('Restaurants', 'Entertainment', 'Hotel') NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `CREATE TABLE \`deal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imageUrl\` varchar(255) NOT NULL, \`originalPrice\` float(2) NOT NULL, \`discountPrice\` float(2) NOT NULL, \`location\` point NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`merchantId\` int NULL, SPATIAL INDEX \`IDX_85589b5d64764af4a4c29e6ccb\` (\`location\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    )
    await queryRunner.query(
      `ALTER TABLE \`deal\` ADD CONSTRAINT \`FK_923c073af7415a3fdb57500f2f4\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`deal\` DROP FOREIGN KEY \`FK_923c073af7415a3fdb57500f2f4\``
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_85589b5d64764af4a4c29e6ccb\` ON \`deal\``
    )
    await queryRunner.query(`DROP TABLE \`deal\``)
    await queryRunner.query(`DROP TABLE \`merchant\``)
  }
}
