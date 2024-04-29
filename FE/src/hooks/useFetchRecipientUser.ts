import { useEffect, useState } from "react";
import * as UserReq from '../api-service/user';
const useFetchRecipientUser = (chat:any,user:any) => {
    const [stateUser,setStateUser] = useState<any>(null);
    const recipientId = chat?.find( (ite:any) => ite !== user );
    useEffect( () => {
        const getUser = async()=>{
            const data = await UserReq.getUserById(recipientId);
            setStateUser(data);
        };
        getUser();
    } , [recipientId] );
    return { stateUser };
}
export default useFetchRecipientUser;