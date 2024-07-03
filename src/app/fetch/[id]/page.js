"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const [apiData, setapiData] = useState(null);
  const [pending, setpending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
      .then((response) => {
        if (response.ok === false) {
          throw Error("Searching data not found")
        }
        return response.json()
      })
      .then((data) => { setapiData(data); setpending(false) })
      .catch((err) => { setError(err.message) })
  }, []);

  return (
    <>
      {!pending && <div className="flex flex-col items-center justify-center gap-4 p-6 duration-200 ease-in rounded-lg bg-stone-800" >
        <Image
          src={apiData.data.images.jpg.image_url}
          alt="Anime Image"
          width={250}
          height={350}
          // layout="fit"
          className="duration-300 ease-in-out hover:scale-110"
        />
        <p className="flex gap-2"><p>Name :-</p> <span className="text-orange-500">{apiData.data.title}</span></p>
        <p className="flex gap-2"><p>Rating :-</p> <span className="text-yellow-500">{apiData.data.rating}</span></p>
        <p className="flex gap-2"><p>Popularity :-</p> <span className="text-lime-500">{apiData.data.popularity}</span></p>
        {apiData.data.broadcast.string && <p className="flex gap-2"><p>Broadcast :-</p>
          <span className="text-lime-400">{apiData.data.broadcast.string}</span>
        </p>}
        {apiData.data.background && <p className="flex w-3/4 gap-2"><p>Background:-</p> <span className="text-lime-300">{apiData.data.background}</span></p>}
        {apiData.data.synopsis && <p className="flex w-3/4 gap-2"><p>Synopsis:-</p> <span className="text-lime-200">{apiData.data.synopsis}</span></p>}
        {apiData.data.trailer.embed_url && <p className="flex gap-2"><p>Trailer :-</p> <a href={apiData.data.trailer.embed_url} target="_blank" className="text-blue-400">{apiData.data.trailer.embed_url}</a></p>}
      </div>}
    </>
  )
}
