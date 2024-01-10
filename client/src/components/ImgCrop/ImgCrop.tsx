import React, {useRef} from 'react'
import {Cropper, ReactCropperElement} from "react-cropper";
import 'cropperjs/dist/cropper.css';
import cl from "./ImgCrop.module.scss"
interface props{
    src:string;
    setCropped: (smth:string)=>void
}

export const ImgCrop = ({src, setCropped}:props) => {
    const ref = useRef<ReactCropperElement>(null)
    const saveImg = ()=>{
        const imgCrop = ref.current;
        if(imgCrop){
            const cropper = imgCrop.cropper;
            setCropped(cropper.getCroppedCanvas().toDataURL())
        }
    }
  return (
    <div className={cl.ImgCrop}>
        <Cropper
            src={src}
            style={{height: 400, width:"100%"}}
            autoCropArea={1}
            aspectRatio={1}
            // viewMode={3}
            guides={false}
            ref={ref}  
        />
        <button onClick={saveImg}>
            save
        </button>
    </div>

  )
}
