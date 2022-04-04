import os
import json
import requests

print('Loading function')


def lambda_handler(event, context):
    BOT_TOKEN = os.environ.get("BOT_TOKEN")
    CHAT_ID = os.environ.get("CHAT_ID")

    queryStringParameters = event["queryStringParameters"]
    
    merchant = queryStringParameters.get("merchant")
    originalPrice = queryStringParameters.get("originalPrice")
    discountPrice = queryStringParameters.get("discountPrice")
    location = queryStringParameters.get("location")
    promotionStartDate = queryStringParameters.get("promotionStartDate")
    promotionEndDate = queryStringParameters.get("promotionEndDate")
    description = queryStringParameters.get("description")
    

    text = (f"New Deal!\n"
            f"Merchant: {merchant}\n"
            f"Original Price: {originalPrice}\n"
            f"Discounted Price: {discountPrice}\n"
            f"Location: {location}\n"
            f"Start Date: {promotionStartDate}\n"
            f"End Date: {promotionEndDate}\n"
            f"Description: {description}\n")
    requests.get(f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage?chat_id={CHAT_ID}&text={text}")
    
    response_body = {
        "success": True,
        "queryStringParameters": queryStringParameters,
        "text": text
    }
    response = {
        "statusCode": 200,
        "headers": {'Content-Type': 'application/json'},
        "body": json.dumps(response_body)
    }
    
    return response
