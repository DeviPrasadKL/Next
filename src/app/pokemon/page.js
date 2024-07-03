'use client'

import Loading from '@/utilities/Loading';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Page() {
    const [apiData, setApiData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);

    const fetchData = (offset = 0, limit = 18) => {
        setIsPending(true);
        setError(null);

        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then((res) => {
                const promises = res.data.results.map((result) => axios.get(result.url));
                Promise.all(promises)
                    .then((responses) => {
                        const newData = responses.map((res) => res.data);
                        setApiData(newData);
                        setIsPending(false);
                    })
                    .catch((err) => {
                        setError(err);
                        setIsPending(false);
                    });
            })
            .catch((err) => {
                setError(err);
                setIsPending(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNextClick = () => {
        setOffset(offset + 10);
        fetchData(offset + 10);
    };

    const handlePreviousClick = () => {
        if (offset >= 10) {
            setOffset(offset - 10);
            fetchData(offset - 10);
        }
    };

    return (
        <>
            {error && (
                <div className='customFlex h-screen'>
                    <p>{error.message}</p>
                </div>
            )}
            {isPending && (
                <div className='customFlex h-screen'>
                    <Loading />
                </div>
            )}
            {!isPending && (
                <div className='flex items-center justify-center flex-row flex-wrap gap-4 pointer m-4'>
                    <Card apiData={apiData} />
                </div>
            )}
            {!isPending && (
                <div className='flex justify-center mt-4'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                        onClick={handlePreviousClick}
                    >
                        Previous
                    </button>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}
