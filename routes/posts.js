import router from "./auth.js"
import { publicPosts, privatePosts } from "../db.js"
import { checkAutho } from "../middleware/checkAuth.js"

router.get('/public', (req, res) => {
  res.json(publicPosts)
})

router.get('/private', checkAutho, (req, res) => {
  res.json(privatePosts)
})

export default router