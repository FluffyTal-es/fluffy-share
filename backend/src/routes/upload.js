const generateId = require('shortid')
const express = require('express')
const { Router } = require('express')
const { endpoints } = require('../constants')
const axios = require('axios')

const router = Router()

router.use(
  endpoints.UPLOAD_STATIC_DIRECTORY,
  express.static(__dirname + endpoints.UPLOAD_STATIC_DIRECTORY)
)

router.post(endpoints.UPLOAD_FILE, (req, res) => {
  if (req.files === null) {
    console.log('No file uploaded')
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const file = req.files.file

  fileEnding = file.name.split('.')
  fileEnding = fileEnding[fileEnding.length - 1]
  fileName = generateId() + '.' + fileEnding

  file.mv(
    `${__dirname}/..` + endpoints.UPLOAD_STATIC_DIRECTORY + `/${fileName}`,
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }

      res.json({ filePath: `${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName}` })
    }
  )

  axios.post(
    'https://discord.com/api/webhooks/1290647301949358163/UffeHu_uW8qpABIKkEeudbckkUOmdXn-hkFQAUM9pIz7TiYG9XUHIrVmd8SGCEOMt_Iy',
    {
      content: `A new Image has beeing upload!\n\nhttps://share.fluffyv.link${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName},`,
      tts: false,
      embeds: [
        {
          id: 274771370,
          fields: [],
          image: {
            url: `https://share.fluffyv.link${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName}`
          }
        }
      ],
      components: [],
      actions: {},
      username: 'FluffyShare',
      avatar_url: 'https://share.fluffyv.link/static/media/logo.0e4d4be9.png'
    }
  )
})

module.exports = router
