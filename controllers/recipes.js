import { Recipe } from "../models/recipe.js"

function newRecipe (req, res) {
  res.render('recipes/new', {
    title: "New Recipe"
  })
}

function create(req, res) {
  req.body.ingredients = req.body.ingredients.split(",")
  req.body.instructions = req.body.instructions.split(",")
  req.body.author = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

export {
  newRecipe as new,
  create
}
