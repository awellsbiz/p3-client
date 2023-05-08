import React from "react";
import Card from "./Card";
import "./ListView.css"

export default function ListView({ movies }) {
  return (
    <div className="list-view">
      <div className="list-view">
        {movies.map((movie, i) => (
          <div key={`movie.id:${i}`}>
            {movie.poster_path ?
              <Card key={movie.id} movie={movie} />
              :
              <></>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
