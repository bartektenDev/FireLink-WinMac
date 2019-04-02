#!/bin/bash
curl -X POST -H "Authorization: key=AAAA16-Iy60:APA91bHw6cYpz8coElaSpv_y4WeIlXq_BVeAJ65BJOm1nb2PVQV310BUN_Ng4mnMqftT7XbGTCGtwOrLSIhYQ1lhi7wAm24d5xOa1qYbRVQhX-JqxpODlL1GsHTzGMzcy01HMp__C3-v" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "Friend Request",
        "body": "<device>Mobile Device Name<"/device><deviceKey>123456789qwertyuioplkjhgfdsazxcvbnm<"/deviceKey>",
        "icon": "itwonders-web-logo.png",
    }
  },
  "to": "fjcbun6lsGs:APA91bH26pOCcngiSnjQN3rrVbwKMio4uGbA4Nh0F5Kk5da_0-O6elpdH2m-vTVr9dPI-9BDGf5huV8U75b-k-kFYWDlETIlwbmeuhvjCZgWywmFmaEea_NhVPrN-RS25jWSrnbxu-w0"
}' https://fcm.googleapis.com/fcm/send
