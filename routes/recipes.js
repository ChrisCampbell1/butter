import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'
import * as crawler from '../controllers/crawler.js'

const router = Router()

router.get('/', isLoggedIn, recipesCtrl.index)
router.get('/new', isLoggedIn, recipesCtrl.new)
router.get('/instant-import', isLoggedIn, recipesCtrl.import)
router.get('/:id', isLoggedIn, recipesCtrl.show)
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)
router.get('/:id/copy', isLoggedIn, recipesCtrl.copy)
router.post('/', isLoggedIn, recipesCtrl.create)
router.post('/import', isLoggedIn, crawler.getRecipe)
router.post('/results', isLoggedIn, recipesCtrl.showResults)
router.post('/results/more', isLoggedIn, recipesCtrl.showMore)
router.post('/:id/comments', isLoggedIn, recipesCtrl.createComment)
router.put('/:id', isLoggedIn, recipesCtrl.update)
router.delete('/:id', isLoggedIn, recipesCtrl.delete)
router.delete('/:id/comments/:commentId', isLoggedIn, recipesCtrl.deleteComment)

export {
  router
}
