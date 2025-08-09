import Image from "next/image";
import FilmBlock from "./components/filmblock";
import SearchMovies from "./components/SearchMovies";
import SiteTitle from "./components/SiteTitle";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       
     
   <SiteTitle/>
    
     < SearchMovies/>
     
     

    
     
    </div>
  );
}
