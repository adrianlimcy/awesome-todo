<template>
  <div class="row q-mb-sm">
    <!-- <q-input outlined v-model="taskToSubmit.name" label="Task name" class="col" :rules="[val => !!val || 'Field is required']" ref="name" autofocus clearable /> -->
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      v-select-all
      ref="name"
      label="Task name"
      class="col"
      clearable />
  </div>
</template>

<script>
export default {
  props: ['name'],
  directives: {
    selectAll: {
      inserted(el) {
        let input = el.querySelector('.q-field__native')
        input.addEventListener('focus', () => {
          if (input.value.length) {
            input.select()
          }
        })
      }
    }
  }
}
</script>
