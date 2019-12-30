<template>
<q-page padding>
  <ul>
    <!-- <li v-for="(task, index) in tasks">
      <div>{{task.name}} {{index}}</div>
      <small>{{task.dueDate}} @ {{task.dueTime}}</small>
      <button @click="deleteTask(index)">X</button>
    </li> -->
    <!-- <task
    v-for="(task, index) in tasks"
    :task="task"
    :index="index"></task> -->
    <task
    v-for="(task, index) in tasks"
    :key="task.id"
    :task="task"
    :index="index">{{task.name}}</task>
  </ul>
</q-page>
</template>

<script>
  // import Task from 'components/Task.vue'
  export default {
    data() {
      return {
        tasks: [
          {
            id: 1,
            name: 'Go to shop',
            dueDate: '2019/05/12',
            dueTime: '18:30'
          },
          {
            id: 2,
            name: 'Get bananas',
            dueDate: '2019/05/13',
            dueTime: '14:30'
          },
          {
            id: 3,
            name: 'Get apples',
            dueDate: '2019/05/14',
            dueTime: '16:00'
          }
        ]
      }
    },
    methods:{
      deleteTask(index) {
        this.tasks.splice(index, 1)
      }
    },
    components: {
      // 'task' : Task
      'task' : require('components/Section4Task.vue').default
    }

  }
</script>

<style>

</style>
