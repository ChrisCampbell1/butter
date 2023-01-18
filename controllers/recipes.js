import { Recipe } from "../models/recipe.js"
import { Cookbook } from "../models/cookbook.js"
import axios from "axios"
import fetch from "node-fetch"
import * as jsonld from 'jsonld'

function index(req, res) {
  axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_API_KEY}`)
  .then(response => {
    Recipe.find({})
    .populate('author')
    .then(recipes => {
      res.render('recipes/index', {
        title: "All Recipes",
        recipes,
        results: response.data
      })
    })
  })
}

function newRecipe (req, res) {
  res.render('recipes/new', {
    title: "New Recipe"
  })
}

function create(req, res) {
  console.log(req.body)
  req.body.ingredients = req.body.ingredients.split("\r\n")
  req.body.instructions = req.body.instructions.split("\r\n")
  req.body.author = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect(`/recipes/${recipe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .populate([
    {path: "author"},
    {path: "comments.commenter"}
  ])
  .then(recipe => {
    Cookbook.find({owner: req.user.profile._id})
    .then(cookbooks => {
      res.render('recipes/show', {
        title: recipe.label,
        recipe,
        cookbooks
      })
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

function copy(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    recipe.ingredients = recipe.ingredients.join("\r\n")
    recipe.instructions = recipe.instructions.join("\r\n")
    res.render('recipes/copy', {
      title: "Edit Copy",
      recipe
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function showResults(req, res){
  axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${req.body.q}&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_API_KEY}`)
  .then(response => {
    res.render('recipes/results', {
        title: "Results",
        results: response.data
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/error')
    })
  }

function showMore(req, res) {
  axios.get(req.body.more)
  .then(response => {
    res.render('recipes/results', {
        title: "Results",
        results: response.data
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/error')
    })
}

async function importRecipe(req, res) {
  console.log(req.body.url, "url")
  const doc = await fetch(req.body.url).then(response => response.text())
  console.log(doc)
  res.redirect('/recipes')
}

function deleteComment(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    const commentDoc = recipe.comments.id(req.params.commentId)
    recipe.comments.remove(commentDoc)
    recipe.save()
    res.redirect(`/recipes/${req.params.id}`)
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
  createComment,
  copy,
  showResults,
  showMore,
  importRecipe as import,
  deleteComment
}
