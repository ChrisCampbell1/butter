import { Router } from 'express'
import * as recipesRouter from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, recipesRouter.index)
router.get('/new', isLoggedIn, recipesRouter.new)
router.post('/', isLoggedIn, recipesRouter.create)

export {
  router
}
