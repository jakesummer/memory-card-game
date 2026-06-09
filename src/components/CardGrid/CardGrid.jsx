import { useState } from "react";
import Card from "../Card/Card.jsx";
import shuffleArray from "../../utils/shuffleArray.js";
import "./CardGrid.css";

export default function CardGrid({ data, onClick }) {
  const [shuffledData, setShuffledData] = useState(data);

  const handleClick = (cardId) => {
    setShuffledData(shuffleArray(shuffledData));
    onClick(cardId);
  };

  return (
    <div className="card-grid">
      {shuffledData.map((d) => (
        <Card
          key={d.id}
          imgUrl={d.imgUrl}
          title={d.title}
          handleClick={() => handleClick(d.id)}
        />
      ))}
    </div>
  );
}
