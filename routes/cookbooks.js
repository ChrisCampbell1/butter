import { Router } from 'express'
import * as cookbooksCtrl from '../controllers/cookbooks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, cookbooksCtrl.index)
router.get('/new', isLoggedIn, cookbooksCtrl.new)
router.get('/:id', isLoggedIn, cookbooksCtrl.show)
router.post('/', isLoggedIn, cookbooksCtrl.create)

export {
  router
}
