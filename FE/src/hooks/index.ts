import axios from "axios";

export const useGetUser = async (id:any) => {
    let user = '';
    try{
        const rs = await axios(`http://localhost:5432/api/user/get/${id}`);
        
        return rs.data;
    }catch(e){
        console.log("Lỗi lấy user:.", e);
    }
    return user;
}