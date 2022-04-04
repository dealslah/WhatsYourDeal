# Telegram Bot on AWS Lambda

## Set Up

### To run it locally

- Install dependencies

```sh
pip install -r requirements.txt
```

- Add these environment variables

```py
BOT_TOKEN = YOUR_BOT_TOKEN
CHAT_ID = YOUR_CHAT_ID
```

### To run it on AWS Lambda

1. Follow this [tutorial](https://aws.amazon.com/getting-started/hands-on/run-serverless-code/) to set up an AWS Lambda function.

2. In `Configuration` -> `Environment Variables`, add the environment variables listed above.

3. Copy the code in this repo's `main.py` and replace the existing code in AWS Lambda's `lambda_function.py`.

4. Deploy.
