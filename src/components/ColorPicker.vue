<template>
  <div class="color-palette-wrapper">
    <p class="palette-title">Badge Colour</p>
    <div class="palette">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="color-option"
        :style="{ backgroundColor: color }"
        :class="{ selected: color === selectedColor }"
        @click="selectColor(color)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

// Define props and emit function
const props = defineProps(["cardColorNew"]);
const emit = defineEmits();

// Array of available colors
const colors = ref(["#2E3A8C", "#3B755F", "#F2EBDB", "#FFFFFF", "black"]);

// Selected color state
const selectedColor = ref(props.cardColorNew);

// Function to select a color
const selectColor = (color) => {
  selectedColor.value = color;
  emit("selectedColor", color);
};

// Watch for changes in the cardColorNew prop
watch(
  () => props.cardColorNew,
  (newColor) => {
    selectedColor.value = newColor;
  }
);
</script>

<style scoped>
.color-palette-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.palette-title {
  color: #3b755f;
  text-align: center;
  font-family: Cabin;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
}

.palette {
  display: flex;
}

.color-option {
  width: 16px;
  height: 16px;
  margin: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.selected {
  border: 1.5px solid #b0b0b0;
  background: #2e3a8c;
  box-shadow: 0px 8.5px 8.5px 0px rgba(0, 0, 0, 0.01);
}

.selected.no-border {
  border: none;
}

.color-option:hover {
  opacity: 0.8;
}
</style>
