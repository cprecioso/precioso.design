import { NextApiHandler } from "next"

export default <NextApiHandler>((req, res) => {
  if (req.body.password === process.env.PREVIEW_MODE_PASSWORD) {
    res.setPreviewData({}).writeHead(307, { Location: "/_preview" }).end()
  } else if (!req.body.password) {
    res.clearPreviewData().writeHead(307, { Location: "/_preview" }).end()
  } else {
    res.clearPreviewData().status(401).json({ message: "Invalid token" })
  }
})
