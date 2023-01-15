import { Recipe } from "../models/recipe.js"

function index(req, res) {
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      title: "All Recipes",
      recipes
    })
  })
}

function newRecipe (req, res) {
  res.render('recipes/new', {
    title: "New Recipe"
  })
}

function create(req, res) {
  req.body.ingredients = req.body.ingredients.split("\r\n")
  req.body.instructions = req.body.instructions.split("\r\n")
  req.body.author = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .populate('author')
  .then(recipe => {
    res.render('recipes/show', {
      title: recipe.label,
      recipe
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    recipe.ingredients = recipe.ingredients.join("\r\n")
    recipe.instructions = recipe.instructions.join("\r\n")
    res.render('recipes/edit', {
      title: "Edit Recipe",
      recipe
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function update(req, res) {
  req.body.ingredients = req.body.ingredients.split(",")
  req.body.instructions = req.body.instructions.split(",")
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(recipe => {
    res.redirect(`/recipes/${recipe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.id)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function createComment(req, res) {
  req.body.commenter = req.user.profile._id
  console.log(req.body)
  Recipe.findById(req.params.id)
  .populate('author')
  .then(recipe => {
    recipe.comments.push(req.body)
    recipe.save()
    .then(() => {
      res.redirect(`/recipes/${recipe._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/error')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  edit,
  update,
  deleteRecipe as delete,
  createComment
}
