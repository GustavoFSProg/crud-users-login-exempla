import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

export default model('userModelTest', schema)
