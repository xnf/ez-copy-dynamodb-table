import AWS from "aws-sdk";
import {splitInChunks} from "./splitInChunks.js";

const BatchSize = 25; // 400kb limit not supported

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
let dynamoDb;

export const initAws = (region, profile = 'default') => {
    AWS.config.region = region;
    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile});
    console.log(` > Profile: ${profile}\n > Region: ${region}`);
    dynamoDb = new AWS.DynamoDB.DocumentClient();
    return Promise.resolve();
}

export const readFromTable = TableName => dynamoDb
    .scan({TableName, ReturnConsumedCapacity: 'TOTAL'})
    .promise();


export const writeToTable = (toTable, response) => {
    const chunks = splitInChunks(response, BatchSize);
    return Promise.all(chunks.map((chunk, i) => {
        console.log(` > Writing chunk ${i + 1} of ${chunks.length}`);
        return writeChunk(toTable, chunk);
    }));
};

const writeChunk = (tableTo, Items) => dynamoDb
    .batchWrite({
        ReturnConsumedCapacity: 'TOTAL',
        RequestItems: {
            [tableTo]: Items.map(Item => ({
                PutRequest: {Item}
            }))
        }
    }).promise();

