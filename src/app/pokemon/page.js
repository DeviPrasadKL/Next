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
    let logo = "https://i.pinimg.com/736x/5f/79/61/5f7961c913263cd7a5d85b93e1c99b8b.jpg"

    // Function to fetch data from API
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
        const offsetLocal = localStorage.getItem('offset');
        if (offsetLocal !== null) {
            setOffset(Number(offsetLocal));
        }
        fetchData(Number(offsetLocal) || 0);
    }, []);

    // Function to handle next button click
    const handleNextClick = () => {
        const newOffset = offset + 18;
        setOffset(newOffset);
        fetchData(newOffset);
        localStorage.setItem('offset', newOffset);
    };

    // Function to handle previous button click
    const handlePreviousClick = () => {
        if (offset >= 10) {
            const newOffset = offset - 18;
            if (newOffset >= 0) {
                setOffset(newOffset);
                fetchData(newOffset);
                localStorage.setItem('offset', newOffset);
            }
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
                <div className='customFlex flex-col'>
                    <img src={logo} className='h-[6rem]' />
                    <div className='flex items-center justify-center flex-row flex-wrap gap-4 pointer m-4'>
                        <Card apiData={apiData} />
                    </div>
                </div>
            )}
            {!isPending && (
                <div className='flex justify-center items-center gap-4 mt-4'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                        onClick={handlePreviousClick}
                        disabled={offset == 0}
                    >
                        Previous
                    </button>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                    <p>
                    offset = {offset}
                    </p>
                </div>
            )}
        </>
    );
}
