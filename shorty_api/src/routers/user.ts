import express from 'express'
import user from '../controllers/user.js'
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded());
router.use((req, res, next) => {
  console.log('Router: user')
  next()
})

router.post('/', user.create_user)
router.put('/:id', user.put_user)
router.get('/:id', user.get_user)

export default router