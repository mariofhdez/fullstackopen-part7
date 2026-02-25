import { useField } from "./hooks";
import { useResource } from "./services";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.onReset()
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value})
    name.onReset()
    number.onReset()
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button type="submit">create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          number <input {...number} />
        </div>
        <button type="submit">create</button>
      </form>
      {persons.map((p) => (<p key={p.id}>{p.name} - {p.number}</p>))}
    </div>
  );
};

export default App;
