const { model, Schema } = require("mongoose");
const phoneRegExp = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const { handleSaveErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      unique: true,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveErrors);

const Contact = model("contact", contactSchema);

module.exports = { Contact };
