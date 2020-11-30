import { NextApiHandler } from "next"
import { getPost } from "../../api/blog"

export default <NextApiHandler>(async (req, res) => {
  if (
    req.query.secret !== process.env.PREVIEW_MODE_PASSWORD ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const post = await getPost(req.query.slug as string, true)

  if (!post) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  res.setPreviewData({})

  res.redirect(`/blog/${post.slug}`)
})
