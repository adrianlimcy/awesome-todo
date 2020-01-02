<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup/>
    </q-card-section>
    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
          outlined
          v-model="taskToSubmit.name"
          label="Task name"
          class="col"
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          autofocus
          clearable/>
        </div>
        <div class="row q-mb-sm">
          <q-input outlined
          v-model="taskToSubmit.dueDate"
          label="Due date">
            <template v-slot:append>
              <!-- you can use clearable like the name part if you don't mind the default icon -->
              <q-icon
              v-if="taskToSubmit.dueDate"
              name="close"
              @click="clearDueDate"
              class="cursor-pointer" />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="taskToSubmit.dueDate" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
        v-if="taskToSubmit.dueDate"
        class="row q-mb-sm">
          <q-input outlined
          v-model="taskToSubmit.dueTime"
          label = "Due time"
          class="col">
            <template v-slot:append>
              <q-icon
              v-if="taskToSubmit.dueTime"
              name="close"
              @click="taskToSubmit.dueTime=''"
              class="cursor-pointer" />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
        label="Save"
        color="primary"
        type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>

</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        taskToSubmit: {
          name: '',
          dueDate: '',
          dueTime: '',
          completed: false
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['addTask']),
      submitForm() {
        // console.log('submitForm');
        this.$refs.name.validate()
        // console.log(this.$refs.name);
        if (!this.$refs.name.hasError) {
          this.submitTask()
        }
      },
      submitTask() {
        // console.log('submitTask');
        this.addTask(this.taskToSubmit)
        this.$emit('close')
      },
      clearDueDate() {
        this.taskToSubmit.dueDate=''
        this.taskToSubmit.dueTime=''
      }
    }

  }
</script>
