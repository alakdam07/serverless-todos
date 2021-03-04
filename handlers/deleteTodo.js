'use strict'

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = async (event) => {
  const params = {
    TableName: 'todos',
    Key: {
      id: event.pathParameters.id
    }
  };

  try {
    let data = await dynamoDb.delete(params).promise();
    let response = {
      statusCode: 200,
      body: "sucessfully deleted",
    }
    return response?.body;
  } catch (error) {
    console.log(error);
  }
}
