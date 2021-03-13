Copy AWS DynamoDB content between tables
---

Small NodeJS solution to copy content between two DynamoDB tables. 

AWS DynamoDB does not support renaming tables or easy copying of content between two DynamoDB tables.

So this is a small dumb script that scans the whole table (mind the consumed capacity) and uses batchWrite to insert into the target table.

AWS Batch Write has two restrictions - max 25 items and 400kb per write. The later is not supported :S

# Requirements

Node >=13 due to import syntax

# Install 

`npm i` or `yarn`

# Usage:

`TABLEFROM`: Name of the source table to scan

`TABLETO`: Name of the target table

`REGION`: AWS Region for both tables (cross-region is possible, but noy yet)

`AWSPROFILE`: Name of the [AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) on the user account. AWS Key (env?) is not supported yet 


    node index.js --from TABLEFROM --to TABLETO --region REGION --profile AWSPROFILE

or 

    npm start -- --from TABLEFROM --to TABLETO --region REGION --profile AWSPROFILE

Example:

    npm start -- --from oldTable --to newTable --region us-east-1 --profile default

# License

MIT
