<template>
  <div class="linkingProfile-wrapper">
    <div class="text">
      <p class="linkingProfile-title">Link to Public Profile</p>
      <div @mouseover="showTooltip"><InfoIconSVG /></div>
    </div>
    <div
      v-if="isTooltipVisible"
      class="tooltip"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
    >
      <!-- Content of the tooltip -->
      <p class="info-text">
        This widget links directly to your public profile so that you can easily
        share your impact with your customers. Turn it off here if you do not
        want the badge to link to it.
      </p>
      <p class="view-text" @click.stop="hideTooltip">View Public Profile</p>
    </div>
    <div class="linkingProfile-container" @click="toggleCheckState">
      <CheckIcon v-if="!isChecked" />
      <CheckIconActive v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import CheckIcon from "./svg/ToggleInactiveSVG.vue";
import CheckIconActive from "./svg/ToggleActiveSVG.vue";
import InfoIconSVG from "./svg/InfoIconSVG.vue";

const { isLinked } = defineProps(["isLinked"]);

const isChecked = ref(isLinked);
const isTooltipVisible = ref(false);
let tooltipTimeout;

const emit = defineEmits();

const toggleCheckState = () => {
  isChecked.value = !isChecked.value;
  emit("updateIsLinked", isChecked.value);
};
const showTooltip = () => {
  clearTimeout(tooltipTimeout);
  isTooltipVisible.value = true;
};

const hideTooltip = () => {
  tooltipTimeout = setTimeout(() => {
    isTooltipVisible.value = false;
  }, 300);
};

// Watch for changes to the isLinked prop
watch(
  () => isLinked,
  (newValue) => {
    isChecked.value = newValue;
  }
);
</script>

<style scoped>
.linkingProfile-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.linkingProfile-title {
  color: #3b755f;
  text-align: center;
  font-family: Cabin;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
}

.text {
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
}

.tooltip {
  width: 216px;
  padding: 24px 16px;
  gap: 12px;
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: fixed;
  z-index: 999;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0.77778px 2.99074px 0px rgba(0, 0, 0, 0.01),
    0px 3.42222px 6.19259px 0px rgba(0, 0, 0, 0.02),
    0px 8.4px 12.35px 0px rgba(0, 0, 0, 0.03),
    0px 16.17778px 24.20741px 0px rgba(0, 0, 0, 0.03),
    0px 27.22222px 44.50926px 0px rgba(0, 0, 0, 0.04),
    0px 42px 76px 0px rgba(0, 0, 0, 0.05);
}

.linkingProfile-wrapper:hover .tooltip {
  display: block;
  opacity: 1;
}

.text:hover + .tooltip,
.tooltip:hover {
  display: block;
  opacity: 1;
}

.info-text {
  color: #212121;
  text-align: center;
  font-family: Cabin;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.view-text {
  color: #3b755f;
  text-align: center;
  font-family: Cabin;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.28px;
  cursor: pointer;
}
</style>
