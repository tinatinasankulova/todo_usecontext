import style from "./ToDos.module.css";
import Button from "./ui/Button";
import Card from "./ui/Card";
import ToDoContext from "../state/ToDoContext";
import { useContext } from "react";


const ToDos = () => {
const cxtData = useContext(ToDoContext)  
  return (
    <Card className={style.wrapper}>
      {cxtData.todos.map((todo) => {
        return (
          <ul key={todo.id}>
            <li className={todo.completed ? style["checked-todo"] : ""}
            >
              <input
                type="checkbox"
                id={todo.id}
                onClick={() => cxtData.toggle(todo.id)}
                defaultChecked={todo.completed}
              />
              {todo.todo}
              <div className={style.date}>{todo.date}</div>
            </li>
            <Button onClick={() => cxtData.delete(todo.id)}>DELETE</Button>
          </ul>
        );
      })}
    </Card>
  );
};

export default ToDos;
