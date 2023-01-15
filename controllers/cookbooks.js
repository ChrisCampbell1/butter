import { Cookbook } from "../models/cookbook.js"

function index(req, res) {
  Cookbook.find({owner: req.user.profile._id})
  .then(cookbooks => {
    res.render('cookbooks/index', {
      title: "My Cookbooks",
      cookbooks
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function newCookbook(req, res) {
  res.render('cookbooks/new', {
    title: "New Cookbook"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Cookbook.create(req.body)
  .then(cookbook => {
    res.redirect('/cookbooks')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function show(req, res) {
  Cookbook.findById(req.params.id)
  .populate('recipes')
  .then(cookbook => {
    res.render('cookbooks/show', {
      title: cookbook.title,
      cookbook
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function addRecipe(req, res) {
  Cookbook.findById(req.params.id)
  .then(cookbook => {
    if(cookbook.recipes.indexOf(req.params.recipeId) === -1){
      cookbook.recipes.push(req.params.recipeId)
      cookbook.save()
      res.redirect(`/cookbooks/${req.params.id}`)
    }
    else res.redirect(`/cookbooks/${req.params.id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

function removeRecipe(req, res) {
  Cookbook.findById(req.params.id)
  .then(cookbook => {
    cookbook.recipes.splice(cookbook.recipes.indexOf(req.params.recipeId), 1)
    cookbook.save()
    res.redirect(`/cookbooks/${req.params.id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/error')
  })
}

export {
  index,
  newCookbook as new,
  create,
  show,
  addRecipe,
  removeRecipe
  // edit,
  // update,
  // deleteCookbook as delete,
}
