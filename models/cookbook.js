import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cookbookSchema = new Schema({
  title: String,
  recipies: {type: [Schema.Types.ObjectId], ref: "Recipe"},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Cookbook = mongoose.model('Cookbook', cookbookSchema)

export {
  Cookbook
}
