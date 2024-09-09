import store from "@/store"
import useTodosStore from "@/store/modules/todos"

const todos = useTodosStore(store);
console.log(todos)