<template>
  <div>
    <header :class="$style.mainHeader">
      <h1>Todo</h1>
    </header>
    
    <section :class="$style.realApp">
      <input type="text" :class="$style.addInput" placeholder="接下来要做什么？" @keyup.enter="addTodo" ref="ipt">
      <!-- v-model="inpt" -->
      <item 
        v-for="(todo,index) in todosView" 
        :key="index" 
        :todo="todo"
        @change-completed="changeCompleted"
        @delete-todo="deletTodo"
      />
      <tabs
        :filter="filter"
        :left-items-count="leftItemsCount"
        :is-have-completed="isHaveCompleted"
        @toggle-filter="toggleFilter"
        @clear-completed="clearCompleted"
      />
    </section>  
    <footer :id="$style.footer">
      <span>written by Jacky</span>
    </footer>
  </div>
</template>

<script>
import Item from '@/Item'
import Tabs from '@/Tabs'

// console.log(Tabs.__docs);

export default {
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      todos: [
        // {
        //   content: '吃饭',
        //   isCompleted: false
        // },
        // {
        //   content: 'coding',
        //   isCompleted: true
        // }
      ],
      filter: 'All'
    }
  },
  computed: {
    leftItemsCount () {
      return this.todos.reduce((t, v) => v.isCompleted ? t : t + 1, 0)
      // {
      // if(!v.isCompleted){
      //   t++
      // }
      // return t
      // } )
    },
    todosView () {
      if (this.filter === 'All') {
        return this.todos
      } else if (this.filter === 'Active') {
        return this.todos.filter(v => !v.isCompleted)
      } else {
        return this.todos.filter(v => v.isCompleted)
      }
    },
    isHaveCompleted () {
      return this.todos.some(v => v.isCompleted)
    }
  },
  methods: {
    // addTodo(e){
    //   console.log(e.target.value)
    // },
    addTodo () {
      // console.log(this.$refs.ipt.value)
      this.todos.unshift({
        content: this.$refs.ipt.value,
        isCompleted: false
      })
      this.$refs.ipt.value = ''
    },
    changeCompleted (todo) {
      // todo.isCompleted = !todo.isCompleted
      this.todos[this.todos.indexOf(todo)].isCompleted = !this.todos[this.todos.indexOf(todo)].isCompleted
    },
    deletTodo (todo) {
      // this.todos.splice(this.todos.findIndex( item=> todo === item ),1)
      this.todos = this.todos.filter(item => item !== todo)
    },
    toggleFilter (filter) {
      this.filter = filter
    },
    clearCompleted () {
      this.todos = this.todos.filter(item => !item.isCompleted)
    }
  },
  updated () {
    localStorage.setItem('filter', this.filter)
    localStorage.setItem('todos', JSON.stringify(this.todos))
  },
  created () {
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'))
    }
    if (localStorage.getItem('filter')) {
      this.filter = localStorage.getItem('filter')
    }
  }
}
</script>

<style lang="scss" module>
.main-header {
  text-align: center;
  h1 {
    font-size: 100px;
    color: rgba(175, 47, 46, 0.4);
    font-weight: 700;
    margin: 20px;
  }
}
#footer{
  margin-top: 40px;
  text-align: center;
  color: #bfbfbf;
  font-size: 10px;text-shadow: 0 1px 0 rgba(#999,0.6);
}
.real-app {
  width: 640px;
  margin: 0 auto;
  box-shadow: 0 0 5px rgba(#666, 0.1);
  input.add-input {
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    border: 0;
    outline: none;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.1);
  }
}
</style>

