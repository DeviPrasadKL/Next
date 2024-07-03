import Image from 'next/image';

export default function ShowImages({ images }) {
    return (
        <div className='customFlex flex-wrap'>
            {images.length !== 0 &&
                images.map((element) => {
                    return (
                        <Image
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
