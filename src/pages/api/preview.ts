import { NextApiHandler } from "next"

export default <NextApiHandler>((req, res) => {
  if (req.query.password !== process.env.PREVIEW_MODE_PASSWORD) {
    res.status(401).json({ message: "Invalid token" })
    return
  }

  res.setPreviewData({})
  res.writeHead(307, { Location: "/" })
  res.end()
})
