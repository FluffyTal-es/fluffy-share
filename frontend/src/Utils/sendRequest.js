import axios from 'axios'

//import swal from 'sweetalert';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export async function sendRequest(file, handleLoading, handleResponse) {
  console.log(file, handleLoading, handleResponse)

  if (
    file === undefined ||
    !file.name.match(/.(jpg|jpeg|png|gif|webp|pdf|mp4|mpeg|avi)$/i)
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Scheint als wolltest du keine passende Datei hochladen.\nBitte lade eine Datei mit einem der folgenden Formate hoch: jpg, jpeg, png, gif, webp, mp4, avi, mpeg oder pdf.'
    })

    return
  }

  const formData = new FormData()
  formData.append('file', file)

  // Change loading state in root component
  handleLoading()

  try {
    const res = await axios.post(process.env.API_URL + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(res, handleResponse)

    if (res && typeof handleResponse === 'function') {
      handleResponse(res)
    }
  } catch (err) {
    console.e