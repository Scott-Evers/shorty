import express from 'express'
import url from '../controllers/url'
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded());
router.use((req, res, next) => {
  console.log('Router: url')
  next()
})

router.get('/', url.get_owned_urls)
router.post('/', url.create_url)
router.patch('/:id', url.patch_url)
router.delete('/:id', url.delete_url)
router.get('/:id', (req, res) => {
  console.log(`getting url: ${req.params.id}`)
  res.send('urls')
})

export default router