<template>
  <div>
    <div v-if="label" class="pb-[8px] text-[14px] font-medium">{{ label }}</div>
    <span class="w-full relative" v-if="type === 'textarea'">
      <i
        v-if="pIcon"
        class="absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-[#D3D6DE]"
        :class="pIcon"
      />
      <Textarea
        rows="5"
        autoResize
        :placeholder="placeholder"
        :model-value="value"
        :disabled="disabled"
        @update:model-value="changeValue"
        inputClass="focus:outline-none "
        :class="errorMessage ? 'border-[#Ef4444] ' : 'border-[#D3D6DE]' + inputClass"
        cols="30"
        class="p-4 bg-white border-solid border-[1px] rounded-[4px] w-full focus:outline-none"
      />
    </span>

    <span class="w-full relative" v-else>
      <i
        v-if="pIcon"
        class="absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-[#D3D6DE]"
        :class="pIcon"
      />

      <input
        :type="type"
        v-model="value"
        :placeholder="placeholder"
        class="px-3 py-[0.6rem] border-[1px] border-[#D3D6DE] border-solid bg-white w-full rounded-[8px] focus-visible:outline-none focus-visible:shadow-sm placeholder:text-[15px]"
        :disabled="disabled"
        @update:model-value="changeValue"
        :class="[
          errorMessage ? ' border-[#Ef4444]' : 'border-[#D3D6DE]' + inputClass,
          pIcon ? 'ps-8' : 'ps-3',
          clear ? 'pr-8' : '',
        ]"
      />
      <i
        @click="value = ''"
        v-if="clear"
        v-show="value.length"
        class="text-[#74757a] absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer pi pi-times"
      ></i>
    </span>
    <small class="text-red-500"> {{ errorMessage }}</small>
  </div>
</template>
<script lang="ts" setup>
// import InputText from "primevue/inputtext";
// @ts-ignore
import * as yup from "yup";
import { configure, useField } from "vee-validate";
import Textarea from "primevue/textarea";

// @ts-ignore
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  //   prime icons
  pIcon: {
    type: String,
    required: false,
    default: "",
  },
  clear: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  placeholder: {
    type: String,
    required: true,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  inputClass: {
    type: String,
    required: true,
    default: () => "",
  },
  required: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  name: {
    type: String,
    required: false,
    default: "name",
  },
  moreValid: {
    type: RegExp || null,
    required: false,
    default: null,
  },
  moreValidMsg: {
    type: String || null,
    required: false,
    default: "Text must not contain hyphens or spaces",
  },
  minValidMsg: {
    type: String || null,
    required: false,
  },
  maxValidMsg: {
    type: String || null,
    required: false,
  },
  length: {
    type: Number,
    required: false,
  },
  reservedWords: {
    type: Array,
    default: () => [],
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
});
const emits = defineEmits(["update:modelValue"]);
const changeValue = (newVal: any) => {
  return emits("update:modelValue", newVal);
};
const textRequired = () => {
  // Numeric input validation
  if (props.type === "number") {
    let schema = yup
      .number()
      .transform((value, originalValue) => {
        // Convert empty strings to null
        return originalValue === "" ? null : value;
      })
      .nullable();
    if (props.required) {
      schema = schema.required("This field is required");
    }
    if (props.min !== undefined) {
      const minMessage = props.minValidMsg || `Must be at least ${props.min}`;
      schema = schema.min(props.min, minMessage);
    }
    if (props.max !== undefined) {
      const maxMessage =
        props.maxValidMsg || `Shpuld be less than or equal to ${props.max}`;
      schema = schema.max(props.max, maxMessage);
    }

    return schema;
  } else if (props.required && props.type === "email") {
    return yup.string().email().required();
  } else if (props.moreValid && props.required) {
    let schema = yup
      .string()
      .required()
      .notOneOf(props.reservedWords as string[], "Can't use this word")
      .matches(props.moreValid, props.moreValidMsg);

    if (props.min && props.max) {
      const minMessage = props.minValidMsg || `Must be at least ${props.min} characters`;
      const maxMessage = props.maxValidMsg || `Must be at most ${props.max} characters`;
      schema = schema.min(props.min, minMessage).max(props.max, maxMessage);
    }

    return schema;
  } else if (props.moreValid && !props.required) {
    return yup.string().matches(props.moreValid, props.moreValidMsg);
  } else if (props.length) {
    return yup.string().required().length(props.length);
  } else if (props.required) {
    return yup.string().required();
  } else {
    return yup.string();
  }
};
import { ref, watch } from "vue";
import { debounce } from "lodash"; // Make sure to import lodash or implement your own debounce function

const validationSchema = ref(textRequired());

const updateValidationSchema = debounce(() => {
  validationSchema.value = textRequired();
}, 300); // Adjust the debounce time as needed

watch(
  () => [props.required, props.type, props.moreValid, props.min, props.max],
  updateValidationSchema
);

const { value, errorMessage } = useField<string>(props.name, validationSchema, {
  syncVModel: true,
});
configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: true,
});

// pt
</script>
