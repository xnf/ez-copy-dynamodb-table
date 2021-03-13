import commandLineArgs from "command-line-args";
import {initAws, readFromTable, writeToTable} from "./aws.js";

console.log('ez-copy-dynamodb-table\n----------------------');

const args = commandLineArgs([
    {name: 'from', type: String},
    {name: 'to', type: String},
    {name: 'region', type: String},
    {name: 'profile', type: String, defaultOption: 'default'},
]);

if (!args.from || !args.to || !args.region) {
    console.log(`Usage:
    node index.js --from TABLEFROM --to TABLETO --region REGION --profile AWSPROFILE
or  npm start -- --from TABLEFROM --to TABLETO --region REGION --profile AWSPROFILE
----------------------
Example: npm start -- --from oldTable --to newTable --region us-east-1 --profile default`);
    process.exit(0);
}

initAws(args.region, args.profile || 'default')
    .then(() => readFromTable(args.from))
    .then(response => writeToTable(args.to, response))
    .then(outputLog => console.log('Response: ' + JSON.stringify(outputLog, null, 4)))
    .catch(console.error);
