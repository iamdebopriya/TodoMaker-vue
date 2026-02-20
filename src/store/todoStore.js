import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || []
  }),

  actions: {
    save() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },

    addTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      })
      this.save()
    },

    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
      this.save()
    },

    toggleTodo(id, value) {
        const todo = this.todos.find(t => t.id === id)
        if (todo) {
            todo.done = value
            this.save()
        }
    },

    updateTodo(id, newText) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.text = newText
        this.save()
      }
    }
  }
})