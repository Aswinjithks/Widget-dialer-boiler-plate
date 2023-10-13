const messages = require("../../config/messages");
const { ticket } = require("../services/internal/user");
const {Tickets} =  require("../models");

const createTicket = async (req, res) => {
  console.log("req is ", req);
  await ticket(req?.body);
}

module.exports = {
  createTicket,
};
