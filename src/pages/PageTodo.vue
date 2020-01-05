<template>
<q-page class="q-pa-md">
  <no-tasks v-if="!Object.keys(tasksTodo).length"/>
  <tasks-todo v-else :tasksTodo="tasksTodo" />
  <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length"/>
  <div class="absolute-bottom text-center q-mb-lg">
    <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add" />
  </div>
  <q-dialog v-model="showAddTask">
    <add-task @close="showAddTask=false" />
  </q-dialog>
</q-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted'])
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    'task': require('components/Tasks/Task.vue').default,
    'add-task': require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo': require('components/Tasks/TasksTodo.vue').default,
    'tasks-completed': require('components/Tasks/tasksCompleted.vue').default,
    'no-tasks': require('components/Tasks/NoTasks.vue').default
  }
}
</script>

<style>

</style>
