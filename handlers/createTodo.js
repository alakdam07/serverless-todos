
'use strict'
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = async event => {
  const datetime = new Date().toISOString();
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'todos',
    Item: {
      id: uuid.v1(),
      task: data.task,
      taskdetails: data.taskdetails,
      done: false,
      createdAt: datetime,
      updatedAt: datetime
    }
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.log(error);
  }
};
