import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

// STYLES
import '../styles/upload.css'

const Upload = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <>
            <div className='uploadMain'>
                <div className='uploadHeading'>
                    <h1>Safely and effortlessly transfer your files</h1>
                    <h3>Easily and securely send files of up to 20GB*</h3>
                </div>
                <div>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <div className='uploadInner'>Drag 'n' drop some files here, or click to select files</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upload
