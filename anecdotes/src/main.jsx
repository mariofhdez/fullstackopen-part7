import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import App from "./App";

export const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

export const AnecdoteList = ({ anecdotes }) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((a) => (
          <Link key={a.id} to={`/anecdotes/${a.id}`}>
            <p>{a.content}</p>
          </Link>
        ))}
      </ul>
    </>
  );
};

export const Anecdote = ({ anecdote, onVote }) => {
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} <button onClick={() => onVote(anecdote)}>vote</button></p>
      <p>for more info see <Link replace to={anecdote.info} >{anecdote.info}</Link></p>
    </>
  )
};

export const About = () => {
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

export const Footer = () => {
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

export const CreateNew = (props) => {

  const navigate = useNavigate()

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
    navigate('/')
  };

  return (
    <div>
      <h2>Create new Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content{" "}
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL for more info{" "}
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

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>,
);
