<template>
  <template v-if="tasks?.length">
    <TransitionGroup name="custom">
      <div
        class="p-[24px] border-solid border-b-[1px] my-8 border-[#EFF1F4]"
        v-for="(item, i) in tasks"
        :key="item.id"
        :class="i == draggedIndex ? 'dragging' : ''"
        :ref="`card_${i}`"
        @drop="drop($event, i)"
        @dragend.self="dragEnd()"
        draggable
        @dragover.prevent
        @dragenter.prevent
        @dragstart="dragStart($event)"
      >
        <div class="flex justify-center items-center my-3 relative">
          <DragIcon class="" @mousedown="allowDrag()" />
        </div>
        <div class="flex justify-between gap-5 items-center">
          <div
            v-if="item?.task.length >= 120"
            class="inline-block text-[14px] text-[#707070] text-start px-[10px] ease-linear h-auto"
          >
            <span class="mx-2 text-start">
              {{ collaps.some((el: string) => el == item.id ) ?  item?.task  : item?.task.slice(0, 120) + '...' }}
            </span>
            <span>
              <span
                v-if="collaps.some((el:string) => el == item.id )"
                @click="showLess(item)"
                class="text-[#0078E7] text-[14px] my-2 cursor-pointer w-max"
              >
                Show Less
              </span>
              <span
                v-else
                @click="readMore(item)"
                class="text-[#0078E7] text-[14px] my-2 cursor-pointer w-max"
              >
                Read More
              </span>
            </span>
          </div>
          <div class="text-[14px] text-[#707070] px-[55px] ease-linear h-auto" v-else>
            {{ item.task }}
          </div>
          <span
            class="whitespace-nowrap text-xs font-medium me-2 px-2.5 py-0.5 rounded"
            :class="statusColor(item.status)"
            >{{
              item.status === "todo"
                ? "Todo"
                : item.status === "in_progress"
                ? "In Progress"
                : "done"
            }}</span
          >
        </div>
        <!-- actions -->
        <div class="flex justify-end gap-5 mt-5">
          <GBtn
            :draggable="true"
            label="Delte"
            @click="emits('deleteTask', item)"
            outline
            class="!bg-red-600 text-white"
          />
          <GBtn label="Edit" @click="emits('editTask', item)" outline />
          <GBtn
            v-if="!item.is_complete"
            label="Mark as complete"
            @click="emits('completeTask', item)"
          />
          <span
            v-else
            class="whitespace-nowrap flex items-center text-white bg-green-600 text-xs font-medium px-1 rounded"
            >Completed</span
          >
        </div>
      </div>
    </TransitionGroup>
  </template>
  <template v-else>
    <div class="flex justify-center items-center p-8">
      <p class="font-medium text-[15px]">No results found</p>
    </div>
  </template>
</template>
<script setup lang="ts">
import DragIcon from "@/icons/dragIcon.vue";
import { computed, ref } from "vue";
// @ts-ignore
import { useStore } from "vuex";
const emits = defineEmits(["editTask", "deleteTask", "completeTask", "dragTask"]);
const store = useStore();
const tasks = computed<TsaksType[]>(() => store.getters.getTasks);
const collaps = ref<string[]>([]);
const draggedIndex = ref(null);
const isDragging = ref(false);
// methods
const readMore = (item: any) => {
  collaps.value.push(item.id);
};
const showLess = (item: any) => {
  let index = collaps.value.findIndex((el) => el == item.id);
  collaps.value.splice(index, 1);
};
const statusColor = (status: string) => {
  // console.log(status);
  if (status === "done") {
    return "bg-green-600 text-white";
  } else if (status === "in_progress") {
    return "bg-yellow-500 text-white";
  } else {
    return "bg-blue-700 text-white";
  }
};

const drop = (event: any, i: number) => {
  event.preventDefault();
  emits("dragTask", {
    dropIndex: i,
    dragIndex: draggedIndex.value,
  });
  // setTimeout(() => {
  draggedIndex.value = null;
  // }, 2000);
  isDragging.value = false;
};
const dragEnd = () => {
  console.log("asdasd");
  draggedIndex.value = null;
  isDragging.value = false;
};
const allowDrag = () => {
  isDragging.value = true;
};
const dragStart = (event: any) => {
  // console.log(event);
  event.preventDefault();
  // if (!isDragging.value) {
  //   return;
  // }
  draggedIndex.value = event.target.dataset.index;
  isDragging.value = true;
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedIndex.value);
};
</script>
<style>
.dragging {
  opacity: 0.2;
}
.custom-move {
  transition: transform 0.3s ease;
}

.custom-enter-active,
.custom-leave-active {
  transition: opacity 0.5s;
}

.custom-enter,
.custom-leave-to {
  opacity: 0;
}
</style>
