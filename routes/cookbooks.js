import { Router } from 'express'
import * as cookbooksCtrl from '../controllers/cookbooks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', cookbooksCtrl.index)
router.get('/new', cookbooksCtrl.new)
router.get('/:id', cookbooksCtrl.show)
router.post('/', cookbooksCtrl.create)

export {
  router
}
