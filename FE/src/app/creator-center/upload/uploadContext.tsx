import * as request from "@/api-service";
import { message } from "antd";
import axios from "axios";
import { createContext, useCallback, useState } from "react";


const UploadContex = createContext({});

function UploadContextProvider({children}:any) {
    const [ curentFile,setCurentFile] = useState<any>(null);
    const [ isFormOptions,setIsFormOptions ] = useState<Boolean>(false);
    const handleUpload = useCallback( async (file:any, idChuSoHuu:string , ghichu: string, music:string) => {
        try{
            const formdata = new FormData();
            formdata.append("video", file.originFileObj);
            formdata.append("idChuSoHuu", idChuSoHuu );
            formdata.append("ghiChu", ghichu);
            formdata.append("music", music);
            console.log("Curent video click:...", process.env.URL_API);
            const res = await axios.post('http://localhost:5432/api/video/create', formdata);
            setIsFormOptions(true);
            message.success(res.data.message, 3);

            console.log("Dtaa:.  ...", res.data);
            
        }catch(e){
            console.log("Lỗi tạo video..", e);
            message.error("lỗi tạo video..",3);
        }
    } , [] );
    // console.log("Curent files..", curentFile);
    
    return ( <UploadContex.Provider value={{curentFile ,setCurentFile , handleUpload , isFormOptions,setIsFormOptions}} >
        {children}
    </UploadContex.Provider> );
}

export {UploadContextProvider , UploadContex};