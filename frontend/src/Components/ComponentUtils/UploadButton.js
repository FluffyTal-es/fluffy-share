import React, { Fragment, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { sendRequest } from '../../Utils/sendRequest'

import Button from '@material-ui/core/Button'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles({
  button: {
    left: '50%',
    marginTop: '20px',
    transform: 'translate(-50%)'
  }
})

export default function UploadButton(props) {
  const classes = useStyles()

  const inputFile = useRef(null)

  const onButtonClick = () => {
    inputFile.current.click()
  }

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    sendRequest(fileUploaded, props.handleLoading, props.handleResponse)
  }

  return (
    <Fragment>
      <input
        type='file'
        id='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleChange}
      />

      <Button
        variant='outlined'
        color='primary'
        size='small'
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={onButtonClick}
      >
        Datei auswählen
      </Button>
    </Fragment>
  )
}
