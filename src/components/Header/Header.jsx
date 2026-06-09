import "./Header.css";

export default function Header({ score, bestScore }) {
  return (
    <header>
      <p>Score: {score}</p>
      <p>Best: {bestScore}</p>
    </header>
  );
}
