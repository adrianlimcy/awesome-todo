import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'

const state = {
  tasks: {
    // 'ID1' : {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'ID2' : {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '14:00'
    // },
    // 'ID3' : {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '16:00'
    // }
  },
  search: '',
  sort: 'name',
  tasksDownloaded: false
}

const mutations = {
  updateTask(state, payload) {
    // console.log('payload(from mutation): ', payload);
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    // console.log('delete id: ', id);
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  clearTasks(state) {
    state.tasks={}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  // updateTask({commit}, payload) {
  //   // console.log('updateTask action')
  //   // console.log('payload: ', payload)
  //   commit('updateTask', payload)
  // },
  updateTask({dispatch}, payload) {
    dispatch('fbUpdateTask', payload)
  },
  // deleteTask({commit}, id) {
  //   commit('deleteTask', id)
  // },
  deleteTask({dispatch}, id) {
    dispatch('fbDeleteTask', id)
  },
  // addTask({commit}, task) {
  //   let taskId = uid()
  //   let payload = {
  //     id: taskId,
  //     task: task
  //   }
  //   commit('addTask', payload)
  // },
  addTask({dispatch}, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },
  fbReadData({commit}) {
    // console.log('start reading data from firebase:');
    // console.log(firebaseAuth.currentUser.uid);
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/'+ userId)

    //initial check for data
    userTasks.once('value', snapshot=> {
      commit('setTasksDownloaded', true)
    }, error => {
      showErrorMessage(error.message)
      this.$router.replace('/auth')
    })

    //child added
    userTasks.on('child_added', snapshot => {
      // console.log('snapshot', snapshot);
      let task = snapshot.val()
      // console.log('task:', task);
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    //child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    //child removed
    userTasks.on('child_removed', snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    // console.log('fbAddTask payload:', payload);
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task, error => {
      if (error) {
        // console.log('error:', error.message);
        showErrorMessage(error.message)
      } else {
        Notify.create('Task added!')
      }
    })
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates, error=> {
      if (error) {
        showErrorMessage(error.message)
      } else {
        // console.log(payload.updates);
        let keys = Object.keys(payload.updates)
        // console.log(keys);
        if (!(keys.includes('completed') && keys.length == 1)) {
          Notify.create('Task updated!')
        }
      }
    })
  },
  fbDeleteTask({}, taskId) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task deleted!')
      }
    })
  }
}

const getters = {
  tasksSorted : (state) => {
    let tasksSorted = {},
        keysOrdered = Object.keys(state.tasks)
    keysOrdered.sort((a,b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
          taskBProp = state.tasks[b][state.sort].toLowerCase()
      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })
    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })
    // console.log('tasksSorted', tasksSorted);
    return tasksSorted
  },
  tasksFiltered : (state, getters) => {
    let tasksSorted = getters.tasksSorted,
        tasksFiltered = {}
    if (state.search) {
      //populate the empty object
      Object.keys(tasksSorted).forEach(function(key){
        let task = tasksSorted[key],
        taskNameLowerCase = task.name.toLowerCase(),
        searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo : (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key){
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted : (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function(key){
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
