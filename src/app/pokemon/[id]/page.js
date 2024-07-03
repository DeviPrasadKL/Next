"use client"

import useFetch from '@/customHooks/useFetch';
import Loading from '@/utilities/Loading';
import { useParams } from 'next/navigation'
import ShowImages from './ShowImages';

export default function page() {

    const { id } = useParams();

    const [apiData, isPending, error] = useFetch("https://pokeapi.co/api/v2/pokemon/" + id);
    console.log("apiData = ", apiData);

    return (
        <>
            {isPending &&
                <div className='customFlex h-sceen h-screen'>
                    <Loading />
                </div>
            }

            {!isPending &&
                <div>
                    <ShowImages apiData={apiData} isPending={isPending} />
                    <div className='customFlex text-2xl text-bold'>
                        <h1>{apiData.name.toUpperCase()}</h1>
                    </div>
                    <div>
                        <p>Type:- </p>
                        {
                            apiData.types.map((el)=>{
                                return (
                                    <div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}
