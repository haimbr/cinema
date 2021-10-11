import { useEffect, useState } from "react";
import { serverUrl } from '../data';
const axios = require('axios');


const useFetchData = (path) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const newRequest = axios.CancelToken.source();
        const fetchData = async () => {
            try {
                const response = await axios.get(serverUrl + path, {
                    cancelToken: newRequest.token,
                    withCredentials: true,
                })
                setData(response.data)
            } catch (err) {
                // alert("אופסס משהו השתבש נסה שוב מאוחר יותר")
                console.log('There was a problem or request was cancelled.', err)
            }
        }
        fetchData();

        return () => {
            newRequest.cancel();
        }
    }, [path]);

    return data;
}

export default useFetchData;
