"use client";
import Link from "next/link.js";
import { story } from "../data.js";

const Page = () => {
  const genres = ["scifi", "fantasy", "mystery", "apocalypse"];

  return (
    <div className="container">
      <h1>Choose Gene</h1>
      <div className="genreGrid">
        {genres.map((genre, index) => (
          <Link href={`/quiz/${genre}`}>
            <div key={index} className="genreCard">
              {genre}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
