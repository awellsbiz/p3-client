import { Link } from "react-router-dom";

export default function Card(props) {
    const movie = props.movie
    console.log(movie)
    const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
    return (
        <>
            <Link to={`/movies/${movie.id}/details`}>
                <div className="card">
                    <img src={posterUrl} />
                    <h2>{movie.name}</h2>
                    <p>{movie.overview}</p>
                </div>
            </Link>
        </>
    )
}