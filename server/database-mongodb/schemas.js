const mongoose = require("mongoose");
const db = require("./index.js");
mongoose.Promise = global.Promise;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  id: { type: Number },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  identityCard: { type: String, default: "" },
  vip: { type: Boolean, default: false },
  connected: { type: Boolean, default: false },
  banned: { type: Boolean, default: false },
  img: {
    type: String,
    default:
      "https://www.creativefabrica.com/wp-content/uploads/2019/02/Profile-Icon-by-arus-1-580x386.jpg",
  },
});

userSchema.plugin(AutoIncrement, { id: "id_seq", inc_field: "id" });
const pharmacySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  location: { type: String },
  connected: { type: Boolean, default: false },
  banned: { type: Boolean, default: false },
});

const orderSchema = new mongoose.Schema({
  pharmacyId: { type: String, default: "" },
  userId: { type: String },
  medecineId: { type: Array },
  totalPrice: { type: Number, default: 0 },
  state: { type: String, default: "" },
  prescription: { type: String, default: "" },
  response: { type: Array },
  pharmacyNumber: { type: Number, default: 0 },
  userConfirmation: { type: Boolean, default: false },
  pharmacyConfirmation: { type: Boolean, default: false },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

const medecineSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  img: String,
  price: Number,
  prescription: { type: Boolean, default: false },
});

const paraSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  img: String,
  price: Number,
  pharmacyId: String,
});

const reminderSchema = new mongoose.Schema({
  userId: String,
  timing: String,
  guide: Array,
});
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});
const restPasswordSchema = mongoose.Schema(
  {
    hash: String,
    email: String,
  },
  { versionKey: false } // to not save the __v attribute ... // Source: https://mongoosejs.com/docs/guide.html#versionKey
);
const feedbackSchema = mongoose.Schema({
  userId: { type: String },
  content: { type: String },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

const admin = mongoose.model("admin", adminSchema);
const user = mongoose.model("user", userSchema);
const pharmacy = mongoose.model("pharmacy", pharmacySchema);
const order = mongoose.model("order", orderSchema);
const medecine = mongoose.model("medecine", medecineSchema);
const para = mongoose.model("para", paraSchema);
const reminder = mongoose.model("reminder", reminderSchema);
const resetpasswords = mongoose.model("ResetPassword", restPasswordSchema);
const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = {
  user,
  pharmacy,
  para,
  medecine,
  order,
  reminder,
  admin,
  resetpasswords,
  feedback,
};
