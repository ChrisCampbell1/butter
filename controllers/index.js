import { Cookbook } from "../models/cookbook.js"

function index(req, res) {
  if(req.user){
    Cookbook.find({owner: req.user.profile._id})
    .then (cookbooks => {
      res.render('index', {
        title: "Butter",
        cookbooks
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
