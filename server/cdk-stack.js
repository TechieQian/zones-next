const core = require("@aws-cdk/core");
const dynamodb = require("@aws-cdk/aws-dynamodb");

class DynamoStack extends core.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-dynamodb-readme.html
    new dynamodb.Table(this, "Zones", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });
  }
}

module.exports = { DynamoStack };
