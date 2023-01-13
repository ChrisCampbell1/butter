import { Router } from 'express'
import * as recipesRouter from '../controllers/recipes.js'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Home Page' })
})

export {
  router
}
