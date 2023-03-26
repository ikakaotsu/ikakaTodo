import Image from "next/image";
import styles from "../styles/todo.module.css";

export default function ToDo(props) {
  const { todo, onChange, onDelete } = props;
  return (
    <div className={styles.toDoRow} key={todo._id}>
      <input
        className={styles.toDoCheckbox}
        name="completed"
        type="checkbox"
        checked={todo.completed}
        value={todo.completed}
        onChange={(e) => onChange(e, todo._id)}
      >
      </input>
      <input
        className={styles.todoInput}
        autoComplete="off"
        name="name"
        type="text"
        value={todo.name}
        onChange={(e) => onChange(e, todo._id)}
      >
      </input>
      <button className={styles.deleteBtn} onClick={() => onDelete(todo._id)}>
        <Image
          alt="image"
          src="/material-symbols_delete-outline-sharp.svg"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
