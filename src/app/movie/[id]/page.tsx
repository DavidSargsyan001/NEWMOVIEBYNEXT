// import React from "react";

// interface MoviePageProps {
//   params: { id: string };
// }

// export default async function MoviePage({ params }: MoviePageProps) {
//   const API_KEY = "9b702a6b89b0278738dab62417267c49";

//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=ru-RU`
//   );

//   if (!res.ok) {
//     return <div className="p-10 text-center text-red-500">Ошибка загрузки фильма</div>;
//   }

//   const movie = await res.json();

//   return (
//     <main className="max-w-6xl h-[610px] mx-auto my-10 py-1 px-13 bg-white rounded-3xl shadow-2xl ring-1 ring-gray-200">
//     <h1 className="text-5xl font-extrabold text-indigo-700 mb-10 tracking-tight drop-shadow-sm">
//       {movie.title}
//     </h1>

//     <section className="flex  flex-col md:flex-row gap-12">
     
//       {movie.poster_path ? (
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="rounded-3xl h-[450px] shadow-xl w-full max-w-sm object-cover hover:scale-105 transition-transform duration-500"
//           loading="lazy"
//         />
//       ) : (
//         <div className="w-full max-w-sm h-[450px] bg-gray-300 rounded-3xl flex items-center justify-center text-gray-600 text-xl font-semibold select-none">
//           Нет изображения
//         </div>
//       )}

   
//       <div className="flex flex-col justify-between text-gray-800">
//         <p className="mb-8 text-lg leading-relaxed whitespace-pre-line">
//           {movie.overview || "Описание отсутствует."}
//         </p>

//         <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-semibold text-gray-700">
//           <div>
//             <span className="text-indigo-600">Рейтинг:</span>{" "}
//             <span className="text-gray-900">{movie.vote_average ?? "–"}</span>
//           </div>
//           <div>
//             <span className="text-indigo-600">Дата выхода:</span>{" "}
//             <span className="text-gray-900">{movie.release_date ?? "–"}</span>
//           </div>
//           <div>
//             <span className="text-indigo-600">Продолжительность:</span>{" "}
//             <span className="text-gray-900">{movie.runtime ? `${movie.runtime} мин` : "–"}</span>
//           </div>
//           <div>
//             <span className="text-indigo-600">Жанры:</span>{" "}
//             <span className="text-gray-900">
//               {movie.genres?.map((g: any) => g.name).join(", ") || "–"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   </main>
//   );
// }

import React from "react";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const API_KEY = "9b702a6b89b0278738dab62417267c49";


  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=ru-RU`
  );

  if (!res.ok) {
    return <div className="p-10 text-center text-red-500">Ошибка загрузки фильма</div>;
  }

  const movie = await res.json();

  
  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}&language=ru-RU`
  );
  const credits = await creditsRes.json();

  const cast = credits.cast?.slice(0, 10) || [];

  return (
    <main className="max-w-6xl mx-auto my-10 py-8 px-6 bg-white rounded-3xl shadow-2xl ring-1 ring-gray-200">
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-10 tracking-tight drop-shadow-sm">
        {movie.title}
      </h1>

      <section className="flex flex-col md:flex-row gap-12">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-3xl h-[450px] shadow-xl w-full max-w-sm object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full max-w-sm h-[450px] bg-gray-300 rounded-3xl flex items-center justify-center text-gray-600 text-xl font-semibold select-none">
            Нет изображения
          </div>
        )}

        <div className="flex flex-col justify-between text-gray-800">
          <p className="mb-8 text-lg leading-relaxed whitespace-pre-line">
            {movie.overview || "Описание отсутствует."}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-semibold text-gray-700">
            <div>
              <span className="text-indigo-600">Рейтинг:</span>{" "}
              <span className="text-gray-900">{movie.vote_average ?? "–"}</span>
            </div>
            <div>
              <span className="text-indigo-600">Дата выхода:</span>{" "}
              <span className="text-gray-900">{movie.release_date ?? "–"}</span>
            </div>
            <div>
              <span className="text-indigo-600">Продолжительность:</span>{" "}
              <span className="text-gray-900">{movie.runtime ? `${movie.runtime} мин` : "–"}</span>
            </div>
            <div>
              <span className="text-indigo-600">Жанры:</span>{" "}
              <span className="text-gray-900">
                {movie.genres?.map((g: any) => g.name).join(", ") || "–"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Блок с актёрами */}
      {cast.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Актёры</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
            {cast.map((actor: any) => (
              <div
                key={actor.id}
                className="flex-shrink-0 w-40 bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-500">
                    Нет фото
                  </div>
                )}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-900">{actor.name}</h3>
                  <p className="text-xs text-gray-600">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
