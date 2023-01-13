import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  recipies: {type: [Schema.Types.ObjectId], ref: "Recipe"},
  cookbooks: {type: [Schema.Types.ObjectId], ref: "Cookbook"},
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
