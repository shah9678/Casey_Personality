import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Quiz App</h1>
        <div className="genreGrid">
          <Link className="genreCard gradient" href="/quiz">
            AI Personality analyse - Quiz
          </Link>
          <Link className="genreCard secondary" href="/44-question">
            44-item Big Five Inventory - Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
