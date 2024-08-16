import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Card({ apiData }) {

    const router = useRouter();

    const sendUrl = (id) => {
        router.push(`/pokemon/${id}`);
    };

    return (
        <>
            {
                apiData.map((pokemon) => (
                    <button
                        key={pokemon.name}
                        className='border-2 border-slate-500 p-4 rounded-lg min-w-52 bg-gradient-to-r from-teal-800'
                        onClick={() => {
                            sendUrl(pokemon.id);
                        }}
                    >
                        <div className='w-full customFlex flex-col'>
                            <Image
                                className='duration-300 ease-in-out hover:scale-110'
                                src={pokemon.sprites.front_default}
                                alt='Pokemon Image'
                                height={250}
                                width={150}
                            />
                            <p>{pokemon.species.name?.toUpperCase()}</p>
                        </div>
                    </button>
                ))
            }
        </>
    )
}
