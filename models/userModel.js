const { model, Schema } = require("mongoose");
// const bcrypt = require("bcrypt");
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^[a-zA-Z0-9]{3,30}$/;
const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      maxlength: 14,
      match: passwordRegexp,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);
// userSchema.pre("save", async function () {
//   if (this.isNew) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
// });
const User = model("user", userSchema);
module.exports = { User };
