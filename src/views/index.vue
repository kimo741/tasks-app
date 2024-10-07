<script setup lang="ts">
import Header from "@/components/header.vue";
import TaskCard from "@/components/task-card.vue";
import DeleteModel from "@/components/teleports/DeleteModel.vue";
import TaskForm from "@/components/teleports/TaskForm.vue";
import { ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
const taskFrom = ref<TsaksType>({
  id: "",
  task: "",
  status: "todo",
  is_complete: false,
});
const toggleDelete = ref<boolean>(false);
const formTaskModel = ref(false);
const isEdit = ref(false);
const transactionId = ref<string>("");
const store = useStore();
/////////////
// methods
/////////////

// delte task modal
const deleteTask = (task: TsaksType) => {
  transactionId.value = task.id;
  toggleDelete.value = true;
};
// confirm to delete
const confirmDelteTask = (taks: TsaksType) => {
  store.commit("deleteTask", transactionId.value);
  toggleDelete.value = false;
};
// add task modal
const addNewTask = () => {
  taskFrom.value = { id: "", task: "", status: "todo", is_complete: false };
  isEdit.value = false;
  formTaskModel.value = true;
};
// edit task modal
const EditTask = (task: TsaksType) => {
  isEdit.value = true;
  taskFrom.value = { ...task };
  formTaskModel.value = true;
};
// submit edit & delete task
const submitTask = () => {
  if (isEdit.value) {
    store.commit("editTask", { form: taskFrom.value });
  } else {
    store.commit("addTask", { form: taskFrom.value });
  }
  formTaskModel.value = false;
};
// submit complete task
const completeTask = (task: TsaksType) => {
  store.commit("completeTask", task.id);
};
// dreag task
const dragTask = ({ dropIndex, dragIndex }: { dropIndex: number; dragIndex: number }) => {
  store.commit("dragTask", { dropIndex, dragIndex });
  // const draggedItem = taps.value.steps[key].questions[dragIndex];
  // taps.value.steps[key].questions.splice(dragIndex, 1);
  // taps.value.steps[key].questions.splice(dropIndex, 0, draggedItem);
};
</script>

<template>
  <main class="">
    <Header @add-task="addNewTask" />
    <div class="container m-auto">
      <!-- task card -->
      <TaskCard
        @edit-task="EditTask"
        @delete-task="deleteTask"
        @completeTask="completeTask"
        @dragTask="dragTask"
      />
      <!-- delete task modal -->
      <DeleteModel v-model:toggleModal="toggleDelete" @confirm="confirmDelteTask" />
      <!-- transaction form modal (add , edit) -->
      <GModal v-model:modalIsOpen="formTaskModel" title="Confirm delete">
        <TaskForm
          v-model:task="taskFrom.task"
          v-model:status="taskFrom.status"
          :is-edit="isEdit"
          @cancel="formTaskModel = false"
          @submit="submitTask"
        />
      </GModal>
    </div>
  </main>
</template>
