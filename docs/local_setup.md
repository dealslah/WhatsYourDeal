# Connecting to the production database

## Install AWS CLI

1. Install the CLI using the instructions in https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
2. Create an IAM user for the root account using the guide in https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html
3. Setup your cli by running `aws configure`
4. Enter the access key id and secret access key that was provided to you when you created the IAM user
5. Set the region to `us-west-1`
6. Set the output format to `json`

## Connecting to database

1. Run `aws secretsmanager get-secret-value --secret-id=wydpassword`
2. Use the database credentials stored in the secrets to connect to the production database
