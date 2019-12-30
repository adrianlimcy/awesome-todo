<template>
<q-page class="q-pa-md">
  <q-list separator bordered>
    <tasks v-for="(task, key) in tasks"
    :key="key"
    :task="task"
    :id="key">
    </tasks>
  </q-list>

</q-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  // data() {
  //   return {
  //     tasks: [
  //       {
  //         id: 1,
  //         name: "Go to Shop",
  //         completed: false,
  //         dueDate: '2019/05/12',
  //         dueTime: '18:30'
  //       },
  //       {
  //         id: 2,
  //         name: "Get bananas",
  //         completed: false,
  //         dueDate: '2019/05/13',
  //         dueTime: '14:00'
  //       },
  //       {
  //         id: 3,
  //         name: "Get apples",
  //         completed: false,
  //         dueDate: '2019/05/14',
  //         dueTime: '16:00'
  //       }
  //     ]
  //   }
  // }
  computed: {
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    'tasks' : require('components/Tasks/Task.vue').default
  }
}
</script>

<style>

</style>
