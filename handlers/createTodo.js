'use strict'
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.createTodo = (event, context, callback) => {
  const datetime = new Date().toISOString();
  const requestBody = JSON.parse(event.body);
  const params = {
    TableName: 'todos',
    Item: {
      id: uuid.v1(),
      task: requestBody.task,
      taskDetails: requestBody.taskDetails,
      done: false,
      createdAt: datetime,
      updatedAt: datetime
    }
  };
  dynamoDb.put(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }
    const response = {
      statusCode: 201,
      body: JSON.stringify(requestBody)
    };

    callback(null, response);
  });
}
