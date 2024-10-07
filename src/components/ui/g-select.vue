<template>
  <div v-if="title" class="flex flex-col mb-[16px]" :class="inputClass">
    <span class="pb-[8px] text-[14px] font-medium">{{ title }}</span>
    <Dropdown
      :model-value="value"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full md:w-14rem bg-white border-solid border-[#D3D6DE] border-[0.75px] min-w-[176px]"
      input-class="text-[14px] "
      @update:model-value="changeValue"
      :class="errorMessage ? 'border-[#Ef4444] ' : 'border-[#D3D6DE] '"
    />
    <small v-if="errorMessage" class="text-red-600">{{ errorMessage }}</small>
  </div>
  <div v-else class="flex flex-col justify-center items-center" :class="inputClass">
    <Dropdown
      :model-value="value"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full md:w-14rem bg-white border-solid border-[#D3D6DE] border-[0.75px] min-w-[176px]"
      input-class="text-[14px] "
      :class="errorMessage ? 'border-[#Ef4444] ' : 'border-[#D3D6DE] ' + inputClass"
      @update:model-value="changeValue"
    />
    <small v-if="errorMessage" class="text-red-600">{{ errorMessage }}</small>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import * as yup from "yup";
import { useField } from "vee-validate";

// @ts-ignore
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: String || Number,
    required: true,
    default: "",
  },
  placeholder: {
    type: String,
    required: true,
    default: "",
  },
  optionValue: {
    type: String,
    required: true,
    default: "value",
  },
  optionLabel: {
    type: String,
    required: false,
    default: "label",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  inputClass: {
    type: String,
    required: false,
    default: () => "",
  },
  name: {
    type: String,
    required: true,
    default: () => "select",
  },
  required: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});
const emits = defineEmits(["update:modelValue"]);
const changeValue = (newVal: any) => {
  return emits("update:modelValue", newVal);
};
const textRequired = () => {
  if (props.required) {
    return yup.string().required();
  } else {
    return "";
  }
};
const { value, errorMessage } = useField<string>(props.name, textRequired(), {
  syncVModel: true,
});
</script>
