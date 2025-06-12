import React, { useEffect, useRef, useState } from "react";
import "./Titlecard.css";
import cards_data from "../../assets/cards/Cards_data";
import {Link} from 'react-router-dom'

const Titlecard = ({ title, category }) => {

  const [apidata,setapiData]=useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjk1NzRmMWIyMTQ2NDhlMTcyYzU1ODhlMzgwNTY0NSIsIm5iZiI6MTc0OTcwNDIwNi44NzY5OTk5LCJzdWIiOiI2ODRhNWUwZTc4OWVmNTEwOTMxZWI3ZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dzXeHIVAPaT3cIdsTrEsolsYxXekndcLUkUUynlX4AE",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrolleft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapiData(res.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apidata.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="Failed to load" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Titlecard;
