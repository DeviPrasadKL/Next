'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function useFetch(url, method = 'GET', data = {}) {

    const [apiData, setApiData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [url, method])

    const fetchData = () => {
        switch (method) {
            case 'GET':
                axios.get(url)
                    .then((res) => { setApiData(res.data); setIsPending(false) })
                    .catch((err) => { setError(err.message) })
                break;
            case 'POST':
                axios.post(url, data)
                    .then((res) => { setApiData(res.data); setIsPending(false) })
                    .catch((err) => { setError(err.message) })
                break;
            case 'PUT':
                axios.put(url, data)
                    .then((res) => { setApiData(res.data); setIsPending(false) })
                    .catch((err) => { setError(err.message) })
                break;
            case 'DELETE':
                axios.delete(url)
                    .then((res) => { setIsPending(false) })
                    .catch((err) => { setError(err.message) })
                break;
            default:
                break;
        }
    }

    return [apiData, isPending, error];
}