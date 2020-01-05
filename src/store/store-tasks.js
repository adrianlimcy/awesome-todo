import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  // tasks: [
  //   {
  //     id: 1,
  //     name: "Go to Shop",
  //     completed: false,
  //     dueDate: '2019/05/12',
  //     dueTime: '18:30'
  //   },
  //   {
  //     id: 2,
  //     name: "Get bananas",
  //     completed: false,
  //     dueDate: '2019/05/13',
  //     dueTime: '14:00'
  //   },
  //   {
  //     id: 3,
  //     name: "Get apples",
  //     completed: false,
  //     dueDate: '2019/05/14',
  //     dueTime: '16:00'
  //   }
  // ]
  tasks: {
    'ID1' : {
      name: "Go to shop",
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'ID2' : {
      name: "Get bananas",
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    'ID3' : {
      name: "Get apples",
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    },
  },
  search: ''
}

const mutations = {
  updateTask(state, payload) {
    // console.log('payload(from mutation): ', payload);
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    // console.log('delete id: ', id);
    // delete state.tasks[id]
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, value) {
    state.search = value
  }

}

const actions = {
  updateTask({commit}, payload) {
    // console.log('updateTask action')
    // console.log('payload: ', payload)
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  },
  addTask({commit}, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  }
}

const getters = {
  tasksFiltered : (state) => {
    let tasksFiltered = {}
    if (state.search) {
      //populate the empty object
      Object.keys(state.tasks).forEach(function(key){
        let task = state.tasks[key],
        taskNameLowerCase = task.name.toLowerCase(),
        searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.tasks
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
