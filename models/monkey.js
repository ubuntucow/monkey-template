import mongoose from "mongoose";
const monkeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default mongoose.model("Monkey", monkeySchema);
