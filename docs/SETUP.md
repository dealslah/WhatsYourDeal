# Deployment Guide

We will be using these AWS technology to host our application:

1. Docker
2. AWS Elastic Beanstalk
3. AWS RDS
4. AWS Secrets Manager
5. AWS CodeBuild
6. AWS CodePipeline

All configurations are done in the `us-east-1` region.

## Setup Networking

### Setup a VPC

1. Config:
   - Name: whatsyourdeal-vpc
   - IPv4 CIDR: 10.0.0.0/16

### Create a public subnet

1. Config:
   - Subnet Name: whatsyourdeal-public-subnet
   - Availability Zone: us-east-1a
   - IPv4 CIDR: 10.0.0.0/24

### Create a private subnet

1. Config:
   - Subnet Name: whatsyourdeal-private-subnet
   - Availability Zone: us-east-1a
   - IPv4 CIDR: 10.0.1.0/24

### Create an Internet Gateway

1. Config:
   - Name: whatsyourdeal-igw
2. Attach to VPC

### Create a NAT Gateway

1. Config:
   - Name: whatsyourdeal-natgw
   - Subnet: whatsyourdeal-private-subnet
2. Allocate an Elastic IP

### Create Route Tables

1. Config:
   1. Name: whatsyourdeal-public-rt
   2. Routes:
      1. Destination: 10.0.0.0/16, Target: local
      2. Destination: 0.0.0.0/0, Target: whatsyourdeal-igw
   3. Associate the route table to the whatsyourdeal-public-subnet
2. Config:
   1. Name: whatsyourdeal-private-rt
   2. Routes:
      1. Destination: 10.0.0.0/16, Target: local
      2. Destination: 0.0.0.0/0, Target: whatsyourdeal-natgw
   3. Associate the route table to the whatsyourdeal-private-subnet

## Setup Database

1. Using Amazon RDS, create a MySQL database

1. Config:
   1. Engine Type: MySQL
   2. Templates: Free Tier
   3. DB Instance Identifier: wyd-db
   4. Master username: wydu
   5. Password: (generate yourself using `openssl rand -base64 32`)
   6. VPC: whatsyourdeal-vpc
   7. Public access: Yes
   8. VPC security group: Create new
   9. VPC security group name: whatsyourdeal-db-sec-group
   10. Availability Zone: us-east-1a
   11. Initial database name: wyd

## Setup Secrets

We use Amazon Secrets Manager to store the database credentials

1. Using Amazon Secrets Manager

## Setup roles for the resources

Refer to policies.json

## Final touches

Set up CodePipeline, CodeBuild and Elastic Beanstalk using the guide from: https://aws.plainenglish.io/deploy-multi-container-docker-to-elastic-beanstalk-with-ci-cd-using-codepipeline-and-aws-ecr-d1d5be0aaa20
