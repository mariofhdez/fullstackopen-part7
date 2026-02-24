import { useState } from "react";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import { About, Anecdote, AnecdoteList, CreateNew, Footer, Menu } from "./main";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often.",
      votes: 0,
      id: 1,
      info: 'http://localhost:5173/about'
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      votes: 0,
      id: 2,
      info: 'http://localhost:5173/about'
    },
    {
      content:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
      id: 3,
      info: 'http://localhost:5173/about'
    }
  ]);
  const [notification, setNotification] = useState("");

  const findById = (id) => {
    return anecdotes.find((a) => a.id === Number(id));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match ? findById(match.params.id) : null;


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    console.log(anecdote);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote '${anecdote.content}' was created!`)
    setTimeout(() => setNotification(null), 5000)
  };

  const onVote = (voted) => {
    const newAnecdotes = anecdotes.map((a) =>
      voted.id !== a.id ? a : { ...a, votes: a.votes + 1 },
    );
    setAnecdotes(newAnecdotes);
  };

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      {notification ? <h4>{notification}</h4>: '' }
      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} onVote={onVote} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
