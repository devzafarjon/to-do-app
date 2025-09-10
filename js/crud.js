import { changeTodos, todos } from "./todos.js"

// Get todo
export function getTodo(id) {
  const result = todos.find((element) => {
    return element.id === id
  })
  return result
}

// Delete todo

export function deleteTodo(id) {
  const result = todos.filter((element) => {
    return element.id != id
  })
  changeTodos(result)
}

// Add todo

export function addTodo(obj) {
  todos.push(obj)

  changeTodos(todos)
}

// Edit to do
export function editTodo(obj) {
  const result = todos.map((element) => {
    if (element.id === obj.id) {
      return obj
    } else {
      return element
    }
  })
}
