import Image from 'next/image';

export default function ShowImages({ apiData, isPending }) {

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

    return (
        <div className='customFlex flex-wrap'>
            {images.length !== 0 &&
                images.map((element) => {
                    return (
                        <Image
                            key={element.image}
                            className="duration-300 ease-in-out hover:scale-110"
                            src={element.image}
                            alt="Anime Image"
                            height={250}
                            width={150}
                        />
                    )
                })
            }
        </div>
    )
}
