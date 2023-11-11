import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  email: {
    type: String
  }
})

export default model('User', userSchema)
