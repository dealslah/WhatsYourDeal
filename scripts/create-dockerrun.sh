#!/bin/bash
sed "s/\${AWS_ACCOUNT_ID}/$AWS_ACCOUNT_ID/g" Dockerrun.template.aws.json > Dockerrun.aws.json