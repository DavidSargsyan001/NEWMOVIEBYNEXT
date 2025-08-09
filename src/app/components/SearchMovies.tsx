
"use client";

import { useState, useEffect } from "react";
import FilmBlock from "./filmblock";

const API_KEY = "9b702a6b89b0278738dab62417267c49"; 

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query) {
      fetchPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=ru-RU`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Поиск
        </button>
      </div>

      {loading && <p className="text-gray-400">Загрузка...</p>}

      {!loading && <FilmBlock movies={movies} />}

      {!loading && !movies.length && query && (
        <p className="text-gray-400">Ничего не найдено для «{query}»</p>
      )}
    </div>
  );
}
