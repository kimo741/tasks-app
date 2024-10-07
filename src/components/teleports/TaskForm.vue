<template>
  <Form class="p-[24px] flex flex-col gap-5" @submit="emits('submit')">
    <!-- ///// -->
    <!-- task input  -->
    <!-- ///// -->
    <div>
      <label
        for="task"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Task</label
      >
      <textarea
        type="text"
        id="task"
        rows="4"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Task"
        v-model="taskValue"
        required
      />
      <small class="text-red-500">{{ errorTask }}</small>
    </div>
    <!-- ///// -->
    <!-- status input  -->
    <!-- ///// -->
    <div>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Select Status</label
      >
      <select
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="statusValue"
      >
        <option
          :value="status.value"
          selected
          v-for="(status, index) in statusOptions"
          :key="index"
        >
          {{ status.label }}
        </option>
      </select>
      <small>{{ errorStatus }} </small>
    </div>
    <!-- //////// -->
    <!-- actions  -->
    <!-- //////// -->
    <div class="my-3 flex justify-end gap-5">
      <GBtn flat @click="emits('cancel')" label="cancel" />
      <GBtn type="submit" :label="isEdit ? 'Update Task' : 'Add Task'" />
    </div>
  </Form>
</template>
<script lang="ts" setup>
import { Form, useField } from "vee-validate";
// import { ref } from "vue";
import * as yup from "yup";
const emits = defineEmits(["cancel", "submit"]);
defineProps<{
  task: String;
  status: String;
  isEdit: Boolean;
}>();
const { value: taskValue, errorMessage: errorTask } = useField<string>(
  "task",
  yup.string().required(),
  {
    syncVModel: "task",
  }
);
const { value: statusValue, errorMessage: errorStatus } = useField<string>(
  "status",
  yup.string().required(),
  {
    syncVModel: "status",
  }
);
const statusOptions = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];
</script>
