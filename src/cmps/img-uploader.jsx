import { useState } from 'react'
import { uploadService } from '../services/upload.service'

<<<<<<< HEAD
export function ImgUploader({ onUploaded = null , onUploadSuccess}) {
=======
export function ImgUploader({ onUploaded = null, onUploadSuccess }) {

>>>>>>> 7c73a5a5d8d35f7cccca9e1c9c1cc925725c22a9
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
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
      {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
      <label htmlFor="imgUpload">{getUploadLabel()}</label>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}