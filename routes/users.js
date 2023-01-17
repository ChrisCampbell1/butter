import { Router } from 'express'
import * as usersCtrl from '../controllers/users.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, usersCtrl.index)
router.get('/:id', isLoggedIn, usersCtrl.show)

export {
  router
}
