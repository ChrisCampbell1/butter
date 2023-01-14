import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  commenter: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
} , {
  timestamps: true
})

const recipeSchema = new Schema({
  label: String,
  image: String,
  author: {type: Schema.Types.ObjectId, ref:"Profile"},
  description: String,
  prepTime: Number,
  cookTime: Number,
  totalTime: Number,
  yield: Number,
  categories: [String],
  cuisines: [String],
  url: String,
  ingredients: [String],
  instructions: [String],
  comments: [commentSchema],
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}
