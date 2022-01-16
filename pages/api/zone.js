import dynamoDb from "../../server/dynamo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, zone } = req.body;
    const item = {
      id,
      zone,
      createdAt: Date.now(),
    };

    await dynamoDb.put({
      Item: item,
    });

    res.status(201).json(item);
  }

  if (req.method === "GET") {
    const { Item } = await dynamoDb.get({
      Key: {
        id: req.query.id,
      },
    });

    res.status(200).json(Item);
  }

  if (req.method === "PUT") {
    const { Attributes } = await dynamoDb.update({
      Key: {
        id: req.body.id,
      },
      UpdateExpression: "SET content = :content",
      ExpressionAttributeValues: {
        ":content": req.body.content || null,
      },
      ReturnValues: "ALL_NEW",
    });

    res.status(200).json(Attributes);
  }

  if (req.method === "DELETE") {
    await dynamoDb.delete({
      Key: {
        id: req.query.id,
      },
    });

    res.status(204).json({});
  }
}
