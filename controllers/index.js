import { Cookbook } from "../models/cookbook.js"
import { Recipe } from "../models/recipe.js"

function index(req, res) {
  if(req.user){
    Cookbook.find({owner: req.user.profile._id})
    .then (cookbooks => {
      Recipe.find({author: req.user.profile._id})
      .then(recipes => {
        res.render('index', {
          title: "Butter",
          cookbooks,
          recipes
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/error')
    })
  } else {
    res.render('index', {
      title: "Butter"
    })
  }
}

export {
  index,
}
