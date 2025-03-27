import app from './app';
const serverlessExpress = require("@codegenie/serverless-express");

export const handler = serverlessExpress({ app });