/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Joke from "./components/Joke";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "https://v2.jokeapi.dev/joke/Programming?type=single&amount=10";
const urlSingle = "https://v2.jokeapi.dev/joke/Programming?type=single";



function App() {
  const [item, setItem] = useState({
    jokes: [] as string[],
    activeIndex: 0,
  });


  const addJoke = async () => {
    const response = await axios.get(urlSingle);
    console.log(response.data);
    const data = response.data;
    setItem({
      jokes: [...item.jokes, data.joke],
      activeIndex: item.jokes.length,
    });
  };

  const initialLoad = async () => {
    const response = await axios.get(url);
    const data = response.data;
    console.log(response.data);

    const jokes = data.jokes.map((joke: any) => joke.joke);
    setItem({ jokes: jokes, activeIndex: 0 });
  };

  useEffect(() => {
    initialLoad();
  }, []);


 
  const carouselItems = item.jokes.map((joke, index) => {
    return (
      <Carousel.Item className="text-nowrap" key={index}>
        <Joke joke={joke} />
      </Carousel.Item>
    );
  });

  const handleSelect = (selectedIndex: number) => {
    setItem({ ...item, activeIndex: selectedIndex });
  };

  return (
    <>
      <h1 id="title">console.log(<span className="quotes">"</span><span className="programming">Programming Jokes</span><span className="quotes">"</span>);</h1>
      <Carousel
        interval={null}
        activeIndex={item.activeIndex}
        onSelect={handleSelect}
      >
        {carouselItems}
      </Carousel>
      <div className="d-flex justify-content-center">
        <button className="generate" onClick={addJoke}>Generate</button>
      </div>
    </>
  );
}

export default App;
