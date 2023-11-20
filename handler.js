
'use strict';

const AWS = require('aws-sdk');

module.exports.apiGatewayTrigger = async (event) => {

  const responseBody = {
    message: 'API Gateway triggered Lambda function!',
    input: event,
  };


  const stepfunctions = new AWS.StepFunctions();
  const stateMachineArn = 'arn:aws:states:us-east-1:113925753635:stateMachine:MyStateMachineeeee-NWDrAzm0tmlO';
  
  const params = {
    stateMachineArn: stateMachineArn,
    input: JSON.stringify({ key: 'value' }), 
  };

  try {
    const result = await stepfunctions.startExecution(params).promise();
    console.log('Step Function execution started:', result);
    responseBody.stepFunctionExecutionArn = result.executionArn;
    
  } catch (error) {
    console.error('Error starting Step Function execution:', error);
    responseBody.error = error.message;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};
