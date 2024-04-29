import { useEffect, useState } from "react";

export type TData = {
    _id: string,
    sub: string,
    username: string,
    email: string,
    image: string,
}

const useDebounce = (text:string, delay: number):string => {
    const [data,setData] = useState<string>("");

    useEffect( () => {
        const timeoutId = setTimeout(async () => {
            setData(text);
        } , delay );

        return () => clearTimeout(timeoutId)
    } , [text] );

    return data;
};

export default useDebounce;