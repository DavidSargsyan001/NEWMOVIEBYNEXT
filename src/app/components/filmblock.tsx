

import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

interface Props {
  movies?: Movie[];
}

export default function FilmBlock({ movies = [] }: Props) {
  return (
    <div className="w-full min-h-[40vh] flex justify-center items-center flex-wrap gap-10">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="w-60   bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer">
            <img
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-80 object-cover bg-gray-200"
            />
            <div className="p-4 text-black">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-gray-500">Рейтинг: {movie.vote_average}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
