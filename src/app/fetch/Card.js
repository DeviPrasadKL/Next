export default function Card({ anime }) {

    return (
        <>
            <p>Name:- <span className="font-bold text-emerald-400">{anime.title}</span></p>
            <div className="flex"><h2 className="text-amber-600">Rating:- </h2><span>{anime.rating}</span></div>
            <div className="flex ">
                <p className="text-blue-200">genres :-</p>
                <div>
                    {anime.genres.map((el, index) => {
                        return (
                            <h2 key={el.name + index} className={el.name === "Action" ? "text-sky-400" : ""}> {el.name}</h2>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
