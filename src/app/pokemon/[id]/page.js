"use client"

import useFetch from '@/customHooks/useFetch';
import Loading from '@/utilities/Loading';
import { useParams, useRouter } from 'next/navigation'
import ShowImages from './ShowImages';
import { useState } from 'react';

export default function page() {

    const { id } = useParams();
    const router = useRouter();
    const [dynamicId, setDynamicId] = useState(Number(id));

    const [apiData, isPending, error] = useFetch("https://pokeapi.co/api/v2/pokemon/" + dynamicId);
    console.log("apiData = ", apiData);

    const handlePreviousClick = () => {
        if (id > 0) {
            setDynamicId(prev => Number(prev) - 1);
            console.log(dynamicId);
        }
    }

    const handleNextClick = () => {
        setDynamicId(prev => Number(prev) + 1);
        console.log(dynamicId);
    }

    const handleHome = () => {
        router.push(`/pokemon`)
    }

    return (
        <>
            {isPending &&
                <div className='customFlex h-sceen h-screen'>
                    <Loading />
                </div>
            }

            {!isPending &&
                <div className='p-6'>
                    <div className='customFlex text-2xl text-bold'>
                        <h1>{apiData.name.toUpperCase()}</h1>
                    </div>
                    <div className='customFlex flex-col mt-4'>
                        <div className='customFlex flex-col border-2 border-slate-200 rounded-xl py-4 px-8'>
                            <ShowImages apiData={apiData} isPending={isPending} />
                            {/* <img src={apiData.sprites.front_default} className='h-[10rem] w-[10rem]' /> */}
                            <div className='customFlex gap-4'>
                                <p>Type:- </p>
                                {
                                    apiData.types.map((el) => {
                                        return (
                                            <div className={` p-2 rounded-xl text-white
                                    ${el.type.name === "fire" ? "bg-red-700" :
                                                    el.type.name === "fighting" ? "bg-slate-400" :
                                                        el.type.name === "water" ? "bg-blue-400" : "bg-teal-700"}`}>
                                                <h1>{el.type.name}</h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='my-4'>
                                <p>Weight:-  {apiData.weight} lbs</p>
                            </div>
                            <div className='my-4'>
                                <p>Height:-  {apiData.height} feet</p>
                            </div>
                            <div className='customFlex flex-wrap gap-2'>
                                {
                                    apiData.moves.map((el) => {
                                        return (
                                            <div className='border-x-2 px-2 border-dotted border-slate-500'>
                                                {el.move.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                            onClick={handleHome}
                        >
                            Home
                        </button>
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
                </div>
            }
        </>
    )
}
