<template>
  <div class="todo-item" :class="{'completed': todo.isCompleted}">
    <input 
      type="checkbox"
      class="toggle"        
      :value="todo.isCompleted"
      :checked="todo.isCompleted"
      @change="handlerClick"
    >
    <!-- v-model="todo.isCompleted" -->
    <label>{{todo.content}}</label>
    <button @click="deletTodo" class="destory">X</button>
  </div>
</template>
<script>
export default {
  name:'ItemComponent',
  // template: '#item',
  props: {
    todo:{
      type: Object,
      required: true
    }
  },
  methods:{
    handlerClick(){
      this.$emit('change-completed',this.todo)
    },
    deletTodo(){
      this.$emit('delete-todo',this.todo)
    }
  }
}
</script>

<style lang="scss">
.todo-item {
  cursor: pointer;
  font-size: 24px;
  line-height: 36px;
  padding: 12px 0;
  border-bottom: 1px solid #ededed;
  position: relative;
  .destory {
    position: absolute;
    right: 60px;
    top: 15px;
    font-size: 9pt;
  }
  &.completed {
    color: #d9d9d9;
    text-decoration: line-through;
  }
}
</style>