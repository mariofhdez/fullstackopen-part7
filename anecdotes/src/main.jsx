import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes, onVote }) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((a) => (
          <li key={a.id}>
            <p>{a.content}</p>
            has {a.votes} <button onClick={() => onVote(a)}>vote</button>
          </li>
        ))}
      </ul>
    </>
  );
};

const About = () => {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>

      <p>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
      See{" "}
      <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
        https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
      </a>{" "}
      for the inspiring source code.
    </div>
  );
};

const CreateNew = (props) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>Create new Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content {' '}
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author {' '}
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL for more info {' '}
          <input
            type="text"
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often.",
      votes: 0,
      id: 1,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      votes: 0,
      id: 2,
    },
    {
      content:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0,
      id: 3,
    },
  //   {
  //     content:
  //       "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  //     votes: 0,
  //     id: 4,
  //   },
  //   {
  //     content: "Premature optimization is the root of all evil.",
  //     votes: 0,
  //     id: 5,
  //   },
  //   {
  //     content:
  //       "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  //     votes: 0,
  //     id: 6,
  //   },
  //   {
  //     content:
  //       "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  //     votes: 0,
  //     id: 7,
  //   },
  //   {
  //     content: "The only way to go fast, is to go well.",
  //     votes: 0,
  //     id: 8,
  //   },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const findById = (id) => {
    anecdotes.find((a) => a.id === id);
  };

  const onVote = (voted) => {
    const newAnecdotes = anecdotes.map((a) =>
      voted.id !== a.id ? a : { ...a, votes: a.votes + 1 },
    );
    setAnecdotes(newAnecdotes);
  };

  return (
    <Router>
      <h1>Software Anecdotes</h1>
      <Menu />

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} onVote={onVote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>
      
      <Footer />
    </Router>
  );
};

createRoot(document.getElementById("root")).render(<App />);
