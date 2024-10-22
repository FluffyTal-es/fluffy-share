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

router.post(endpoints.UPLOAD_FILE, async (req, res) => {
  if (req.files === null) {
    console.log('No file uploaded')
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const file = req.files.file

  fileEnding = file.name.split('.')
  fileEnding = fileEnding[fileEnding.length - 1]

  if (fileEnding === 'pdf') {
    const pngPages = await pdfToPng(
      file.data, // The function accepts PDF file path or a Buffer
      {
        disableFontFace: false, // When `false`, fonts will be rendered using a built-in font renderer that constructs the glyphs with primitive path commands. Default value is true.
        useSystemFonts: false, // When `true`, fonts that aren't embedded in the PDF document will fallback to a system font. Default value is false.
        enableXfa: false, // Render Xfa forms if any. Default value is false.
        outputFolder: `${__dirname}/..${endpoints.UPLOAD_STATIC_DIRECTORY}/`, // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
        outputFileMask: 'buffer' // Output filename mask. Default value is 'buffer'.
      }
    )

    const files = pngPages
      .map((page, index) => {
        return `\n\nhttps://share-api.fluffyv.link${endpoints.UPLOAD_STATIC_DIRECTORY}/${page.name}`
      })
      .join('')

    axios.post(
      'https://discord.com/api/webhooks/1290647301949358163/UffeHu_uW8qpABIKkEeudbckkUOmdXn-hkFQAUM9pIz7TiYG9XUHIrVmd8SGCEOMt_Iy',
      {
        content: `A new PDF has been converted and uploaded!${files}`,
        tts: false,
        embeds: [],
        components: [],
        actions: {},
        username: 'FluffyShare',
        avatar_url: 'https://share.fluffyv.link/static/media/logo.0e4d4be9.png'
      }
    )
  } else {
    const fileName = generateId() + '.' + fileEnding

    file.mv(
      `${__dirname}/..${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName}`,
      (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send(err)
        }

        res.json({
          filePath: `${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName}`
        })
      }
    )

    axios.post(
      'https://discord.com/api/webhooks/1290647301949358163/UffeHu_uW8qpABIKkEeudbckkUOmdXn-hkFQAUM9pIz7TiYG9XUHIrVmd8SGCEOMt_Iy',
      {
        content: `A new Image has beeing upload!\n\nhttps://share-api.fluffyv.link${endpoints.UPLOAD_STATIC_DIRECTORY}/${fileName}`,
        tts: false,
        embeds: [],
        components: [],
        actions: {},
        username: 'FluffyShare',
        avatar_url: 'https://share.fluffyv.link/static/media/logo.0e4d4be9.png'
      }
    )
  }
})

module.exports = router
