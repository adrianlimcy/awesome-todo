<template>
<q-page padding>
  <button style="position: absolute; right: 10px" @click="counter++">
    {{counter}}
  </button>
  <!-- <input v-model="message" @keyup="handleKeyup"/> -->
  <!-- <input v-model="message"
      @keyup.esc="clearMessage"
      @keyup.enter="alertMessage"
      @mouseenter="alertMessage"
    /> -->
  <!-- <input v-model="message"
  @keyup.esc="clearMessage"
  @keyup.enter="alertMessage"
  v-autofocus
  v-bind:class="{'error':message.length>22}" /> -->
  <!-- <input v-model="message"
  @keyup.esc="clearMessage"
  @keyup.enter="alertMessage"
  v-autofocus
  :style="errorStyle"
  ref="messageInput"/> -->
  <input v-model="message" @keyup.esc="clearMessage" @keyup.enter="alertMessage" v-autofocus :class="{'error' : message.length > 22}" ref="messageInput" />
  <button @click="clearMessage">Clear</button>

  <div>{{message.length}}</div>
  <!-- <h5
      v-show="message.length"
      class="border-grey">{{message}}</h5> -->
  <h5 v-if="message.length" class="border-grey">{{message}}</h5>
  <h6 v-else>No message entered 😢</h6>
  <hr>
  <p>Uppercase message: {{messageUppercase}}</p>
  <p>Lowercase message: {{message | messageLowercase}}</p>
</q-page>
</template>

<script>
export default {
  data() {
    return {
      message: "I love Vue.js so hard",
      counter: 0
    }
  },
  // computed will be used heavily in apps
  computed: {
    messageUppercase() {
      // console.log('messageUppercase was fired')
      return this.message.toUpperCase() + this.counter
    },
    errorStyle() {
      if (this.message.length > 22) {
        return {
          'color': 'red',
          'background': 'pink'
        }
      }
    }
  },
  methods: {
    clearMessage() {
      this.message = ''
    },
    // handleKeyup(e) {
    //   console.log(e)
    //   if (e.keyCode ==27) {
    //     this.clearMessage()
    //   }
    //   else if (e.keyCode == 13) {
    //     this.alertMessage()
    //   }
    // },
    alertMessage() {
      alert(this.message)
    }
  },
  // filters are great for formatting dates and such
  filters: {
    messageLowercase(value) {
      return value.toLowerCase()
    }
  },
  directives: {
    autofocus: {
      inserted(el) {
        // console.log('input inserted')
        el.focus()
      }
    }
  },
  // beforeCreate() {
  //   console.log('beforeCreate')
  // },
  // created() {
  //   console.log('created')
  // },
  // beforeMount() {
  //   console.log('beforeMount')
  // },
  // mounted() {
  //   console.log('mounted')
  // },
  // beforeUpdate(){
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   cosole.log('updated')
  // },
  // beforeDestroy() {
  //   console.log('beforeDestroy')
  // },
  // destroyed() {
  //   console.log('destroyed')
  // }
  mounted() {
    console.log(this.$refs)
    this.$refs.messageInput.className = "bg-green"
  }
}
</script>

<style>
.border-grey {
  border: 1px solid grey;
}

input,
button {
  font-size: 23px;
}

.error {
  color: red;
  background: pink;
}
</style>
