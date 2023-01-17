import { Cookbook } from "../models/cookbook.js"
import { Recipe } from "../models/recipe.js"
import { User } from "../models/user.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('users/index', {
      title: "User Directory",
      profiles
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    Cookbook.find({owner: req.params.id})
    .then(cookbooks => {
      Recipe.find({author: req.params.id})
      .then(recipes => {
        res.render('users/show', {
          title: profile.name,
          profile,
          cookbooks,
          recipes
        })
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
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

export {
  index,
  show
}
