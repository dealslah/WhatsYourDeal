#!/bin/bash

set -e

# Install mysql.
if ! brew ls --versions mysql > /dev/null; then
  echo "Installing mysql"
  brew install mysql
fi

# Create local db.
echo "Creating local db"

DB_NAME="wyd"
DB_USER="wydu" # Creates user with no password.

mysql -uroot -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql -uroot -e "CREATE USER IF NOT EXISTS ${DB_USER}@localhost;"
mysql -uroot -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
mysql -uroot -e "FLUSH PRIVILEGES;"
