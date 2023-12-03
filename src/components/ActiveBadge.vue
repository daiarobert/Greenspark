<template>
  <div class="activate-badge">
    <p class="activate-badge-title">Activate Badge</p>
    <label class="switch">
      <input type="checkbox" :checked="isActive" @change="handleChange" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const { isActive, widgetId } = defineProps(["isActive", "widgetId"]);
const emit = defineEmits();

const handleChange = () => {
  emit("toggle-active", widgetId);
};
</script>

<style scoped>
.activate-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.activate-badge-title {
  color: #3b755f;
  text-align: center;
  font-family: Cabin;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 10px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.slider.round:hover:before {
  box-shadow: 0 0 8px #3b755f;
}

input:checked + .slider {
  background-color: #3b755f;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3b755f;
}

input:checked + .slider:before {
  transform: translateX(20px);
}
</style>
