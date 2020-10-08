import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond';

import httpService from './../../services/httpService'
import { apiEndpoint } from '../../config.json'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginFileValidateType, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform, FilePondPluginImagePreview)

const UploadImage = ({ allowMultiple, labelIdle, onSuccess, onRevert, nameSpace, aspectRatio=null, outputQuality=null }) => {
    const [files, setFiles] = useState([])
    const [verbose, setVerbose] = useState('')
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setVerbose('')
    }, [])
    
    return ( 
        <div className="row">
        <div className="col-sm-12">
            <div className="file-uploader-container" style={{width: '100%', position: 'relative'}}>
                {files.length?
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setFiles([])}>
                        <i className="fa fa-window-minimize"></i>
                    </button>:
                    null
                }
                <FilePond
                    files={files}
                    allowImageCrop={true}
                    allowImageTransform={true}
                    allowImageResize={true}
                    imageCropAspectRatio={aspectRatio}
                    imageTransformOutputQuality={outputQuality}
                    acceptedFileTypes={['image/*']}
                    allowMultiple={allowMultiple}
                    onupdatefiles={setFiles}
                    labelIdle={labelIdle}

                    server={{
                        process: async (fieldName, file, metadata, load) => {
                            const fileType = file.type
                            
                            if (fileType !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png')
                            return toast.error('Image File Please')
                            
                            setLoading(true)
                            setVerbose('Fetching Signed URL')
                            const {data: fileMetadata} = await httpService.get(apiEndpoint + '/admin/activities/uploads/signed_url', {
                                params: {
                                    fileType,
                                    nameSpace
                                }
                            })
                            setVerbose('Signed URL Fetched')
                            
                            let axiosInstance = axios.create()
                            delete axiosInstance.defaults.headers['Authorization']
                                    
                            setVerbose('Attempting Image Upload')
                            const s3PutRes = await axiosInstance.put(fileMetadata.signedURL, file, {
                                headers: {
                                    'Content-Type': fileType,
                                }
                            })

                            //Pessimistic Updates
                            if (s3PutRes.status === 200) {
                                load(fileMetadata.filePath)
                                setLoading(false)
                                setVerbose('File Uploaded to Cloud. Click on `Save`.')

                                if(onSuccess)
                                    onSuccess(fileMetadata.filePath)
                            }
                        },
                        revert: (filePath) => {
                            if (window.confirm('Do you wanna UNDO? This will DELETE the upload.')) {
                                if (onRevert)
                                    onRevert(filePath)
                                    
                                setVerbose('')
                                httpService.delete(apiEndpoint + '/admin/activities/uploads', {
                                    params: {
                                        Key: filePath
                                    }
                                })
                            }
                        }
                    }}
                />
                
                <div className="mb-3">
                    {loading ?                     
                        <span className="spinner-border text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                        </span> :
                        null
                    }
                    <span className="text-muted">{verbose}</span>
                </div>

            </div>
        </div>
        </div>
    );
}
 
export default UploadImage;