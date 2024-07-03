"use client"

import useFetch from '@/customHooks/useFetch';
import Loading from '@/utilities/Loading';
import { useParams } from 'next/navigation'
import ShowImages from './ShowImages';

export default function page() {

    const { id } = useParams();

    const [apiData, isPending, error] = useFetch("https://pokeapi.co/api/v2/pokemon/" + id);
    console.log("apiData = ", apiData);

    let images = [];
    if (!isPending) {
        if (apiData.sprites.back_default) {
            images.push({ 'image': apiData.sprites.back_default });
        }
        if (apiData.sprites.back_female) {
            images.push({ 'image': apiData.sprites.back_female });
        }
        if (apiData.sprites.back_shiny) {
            images.push({ 'image': apiData.sprites.back_shiny });
        }
        if (apiData.sprites.back_shiny_female) {
            images.push({ 'image': apiData.sprites.back_shiny_female });
        }
        if (apiData.sprites.front_default) {
            images.push({ 'image': apiData.sprites.front_default });
        }
        if (apiData.sprites.front_female) {
            images.push({ 'image': apiData.sprites.front_female });
        }
        if (apiData.sprites.front_shiny) {
            images.push({ 'image': apiData.sprites.front_shiny });
        }
        if (apiData.sprites.front_shiny_female) {
            images.push({ 'image': apiData.sprites.front_shiny_female });
        }
    }

    console.log("images = ", images);

    return (
        <>
            {isPending &&
                <div className='customFlex h-sceen h-screen'>
                    <Loading />
                </div>
            }
            <div>
                {!isPending && <ShowImages images={images} />}
                
            </div>
        </>
    )
}
