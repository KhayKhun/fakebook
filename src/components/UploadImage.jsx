import {React,useState,useEffect} from 'react'
import {storage} from './firebase'
import { ref ,uploadBytes,listAll,getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import axios from 'axios'

function UploadImage() {
  const [imageUpload,setImageUpload] = useState();

    function uploadImage(){
        if(!imageUpload) return;
        else{
            uploadBytes(ref(storage,`images/${imageUpload.name+v4()}`) , imageUpload) //ref indicates the path in firebase storage
            .then(response => {
                getDownloadURL(response.ref).then((url) => {
                  axios({
                      method : 'post',
                      url : 'https://fakebook-server-khaykhun.onrender.com/upload-image',
                      withCredentials : true,
                      data : {
                        imageURL : url
                      }
                    })
                    .then((response) => {
                      window.alert("Image Uploaded successfully");
                      window.location.reload();
                    })
                    .catch((error) => {
                      window.alert("Image Uploaded failed");
                      window.location.reload();
                  });
                })
            })
        }
    }
  return (
    <div>
        <input type="file" onChange={(e)=>{setImageUpload(e.target.files[0])}}/>
        <button onClick={uploadImage}>Upload</button>
    </div>
  )
}

export default UploadImage
