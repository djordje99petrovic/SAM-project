const AWS = require("aws-sdk");
const sqs = new AWS.SQS({
    region: "eu-central-1",
});

exports.handler = (event, context, callback) => {

    const accountId = context.invokedFunctionArn.split(':')[4];

    const data = event.Records[0].body;
    const message = data.split('\n');
    
    const katrica = message[0].split(':');
    const banka = message[1].split(':');
    const iznos = message[2].split(' ');
    const vrijeme = message[3].split(' ');
    const stat = message[4].split(':');
    const opis = message[5].split(':');
    const raspolozivo = message[6].split(' ');

    const card = kartica[2];
    const bank = banka[1];
    const amount = iznos[1];
    const time = vrijeme[1] + " " + vrijeme[2];
    const status  = stat[1];
    const description = opis[1];
    const balance = raspolozivo[1];
    const currency = iznos[2];

    const params = {
        MessageAttributes: {
            "Card": {
                DataType: "String",
                Value: card
            },
            "Bank": {
                DataType: "String",
                Value: bank
            },
            "Amount": {
                DataType: "String",
                Value: amount
            },
            "Currency": {
                DataType: "String",
                Value: currency
            },
            "Time": {
                DataType: "String",
                Value: time
            },
            "Status": {
                DataType: "String",
                Value: status
            },
            "Description": {
                DataType: "String",
                Value: description
            },
            "Balance": {
                DataType: "String",
                Value: balance
            }
        },
        MessageBody: event.Records[0].body,
        QueueUrl: 'https://sqs.'+ eu-central-1 +'.amazonaws.com/' + accountId + '/parsed_messages'
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
    const response = {
        statusCode: responseCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
    };
    callback(null, response);
};
