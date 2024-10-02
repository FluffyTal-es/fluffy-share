import React, { Component } from 'react'
import './Css/SocialMedia.css'

export default class SocialMediaShareButtons extends Component {
  render() {
    const path = this.props.image_url
    const URL = `${process.env.API_URL}/upload/${path}`
    const SERVER_URL = `${process.env.API_URL}/download/${path}`
    const TEXT = `Hey, schau dir an was ich auf FluffyV mache!`
    return (
      <div className='btn_wrap'>
        <span className='socialSpan'>Teilen</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(URL)
          }}
          className='iconButton'
        >
          <i className='fas fa-copy'></i>
        </button>
        <a download='UploadedImage' href={SERVER_URL} className='iconButton'>
          <i className='fas fa-download'></i>
        </a>
      </div>
    )
  }
}
