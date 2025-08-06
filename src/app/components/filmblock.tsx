
import React from "react";

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transform transition duration-300"
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-80 object-cover bg-gray-200"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-gray-500">Рейтинг: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

