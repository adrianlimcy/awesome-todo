<template>
<q-page>
  <div class="q-pa-md absolute full-width full-height column">
    <template
      v-if="tasksDownloaded">
      <div class="row q-mb-lg">
        <search />
        <sort />
      </div>
      <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results</p>
      <q-scroll-area class="q-scroll-area-tasks">
        <no-tasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"/>
        <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />
        <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" class="q-mb-xl"/>
      </q-scroll-area>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn @click="showAddTask = true" round color="primary" size="24px" icon="add" class="all-pointer-events"/>
      </div>
    </template>
    <template
    v-else>
      <span class="absolute-center">
        <q-spinner-radio color="light-green" size="5em" />
      </span>
    </template>
  </div>
  <q-dialog v-model="showAddTask">
    <add-task @close="showAddTask=false" />
  </q-dialog>
</q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
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
    'no-tasks': require('components/Tasks/NoTasks.vue').default,
    'search': require('components/Tasks/Tools/Search.vue').default,
    'sort': require('components/Tasks/Tools/Sort.vue').default
  }
}
</script>

<style lang="scss">
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
    .mobile & {
      flex-basis: 100px;
    }
  }
  .electron {
    .q-scroll-area-tasks{
      .scroll {
        height: auto !important
      }
    }
  }

</style>
