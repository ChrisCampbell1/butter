import { Router } from 'express'
import * as recipesRouter from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, recipesRouter.index)
router.get('/new', isLoggedIn, recipesRouter.new)
router.get('/:id', isLoggedIn, recipesRouter.show)
router.get('/:id/edit', isLoggedIn, recipesRouter.edit)
router.post('/', isLoggedIn, recipesRouter.create)
router.put('/:id', isLoggedIn, recipesRouter.update)
router.delete('/:id', isLoggedIn, recipesRouter.delete)

export {
  router
}
