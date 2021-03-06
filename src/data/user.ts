import mongoose from "mongoose"
export const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true }
})

export const User = mongoose.model("User", userSchema)