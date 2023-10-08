/*
This code will initialize Square and then allow you to authenticate 
your account with your access token. Without this setup, you’ll be unable to access Square.
*/


const dotenv = require('dotenv');
const { Client, Environment } = require("square");
dotenv.config();

const client = new Client({
  accessToken: "EAAAEAxOcgyLoaZGIUXnioR33UlgX4VAgJnzGl-WK6NcMXw7v9c2HHWOiJikmsfs",
  environment: Environment.Sandbox,
});

module.exports = client;

