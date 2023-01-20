import { Fragment, useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null, onUploadSuccess }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    onUploadSuccess(secure_url)
    // setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    // onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && <img src={imgData.imgUrl} />}
      <label htmlFor="imgUpload">{getUploadLabel()}</label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}