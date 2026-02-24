import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import { useField } from "./hooks";

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
      <p>
        has {anecdote.votes}{" "}
        <button onClick={() => onVote(anecdote)}>vote</button>
      </p>
      <p>
        for more info see{" "}
        <Link replace to={anecdote.info}>
          {anecdote.info}
        </Link>
      </p>
    </>
  );
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
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>Create new Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content} />
        </div>
        <div>
          author <input {...author} />
        </div>
        <div>
          URL for more info <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>,
);
