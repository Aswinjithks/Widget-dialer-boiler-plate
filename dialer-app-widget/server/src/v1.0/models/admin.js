const uniqueValidator = require("mongoose-unique-validator");
const messages = require("../../config/messages");

module.exports = (mongoose, collectionName) => {
  const schema = mongoose.Schema(
    {
      adminId: {
        type: String,
        required: false,
      },
      peerId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        uniqueCaseInsensitive: true,
        lowercase: true,
      },
      phone: {
        type: String,
        unique: true,
        sparse: true,
      },
      password: {
        type: String,
        required: false,
      },
      passwordSet: {
        type: Boolean,
        default: null,
      },
      username: {
        type: String,
        required: true,
      },
      packageId: {
        type: String,
        required: false,
      },
      department: {
        type: Array,
      },
      status: {
        type: String,
        required: false,
      },
      picture: {
        type: String,
      },
      agents: {
        type: Array,
      },
      otp: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
    },
  );

  schema.index({
    email: "text",
    phone: "text",
    username: "text",
  });

  schema.plugin(uniqueValidator, { message: messages?.fieldIsUnique });

  const Admin = mongoose.model("Admin", schema, collectionName);
  return Admin;
};
