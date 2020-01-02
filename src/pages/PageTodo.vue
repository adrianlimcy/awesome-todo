<template>
<q-page class="q-pa-md">
  <q-list separator bordered v-if="Object.keys(tasks).length">
    <task v-for="(task, key) in tasks"
    :key="key"
    :task="task"
    :id="key">
    </task>
  </q-list>

  <div class = "absolute-bottom text-center q-mb-lg">
    <q-btn
      @click="showAddTask = true"
      round
      color="primary"
      size="24px"
      icon="add" />
  </div>
  <q-dialog v-model="showAddTask">
    <!-- <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card> -->
    <add-task @close="showAddTask=false"/>
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
    'task' : require('components/Tasks/Task.vue').default,
    'add-task' : require('components/Tasks/Modals/AddTask.vue').default
  }
}
</script>

<style>

</style>
