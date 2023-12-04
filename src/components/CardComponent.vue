<template>
  <!-- Main product card component -->
  <div class="product-card" @click="toggleActive">
    <!-- Header with logo and information -->
    <div class="card-header" :style="{ backgroundColor: localSelectedColor }">
      <div class="logo-wrapper">
        <!-- Logo component -->
        <Logo :svgColor="textColor" />
      </div>
      <div class="info-wrapper">
        <!-- Action description -->
        <div class="action-description" :style="{ color: textColor }">
          This product {{ cardAction }}
        </div>
        <!-- Product details -->
        <div class="product-details" :style="{ color: textColor }">
          {{ cardAmount }} {{ cardType }}
        </div>
      </div>
    </div>
    <!-- Linked to profile component -->
    <LinkingToProfile
      :isLinked="cardLinked"
      @updateIsLinked="handleUpdateIsLinked"
    />
    <!-- Color picker component -->
    <ColorPicker
      :cardColorNew="localSelectedColor"
      @selectedColor="handleColorUpdate"
    />
    <!-- Active badge component -->
    <ActiveBadge
      :isActive="cardActive"
      @toggle-active="handleToggleActive"
      :widgetId="widgetId"
    />
  </div>
</template>

<script setup>
import ColorPicker from "./ColorPicker.vue";
import ActiveBadge from "./ActiveBadge.vue";
import Logo from "./svg/LogoSVG.vue";
import LinkingToProfile from "./LinkingToProfile.vue";
import { ref, defineProps, computed, watch, defineEmits } from "vue";

const {
  cardType,
  cardAmount,
  cardAction,
  cardColor,
  cardActive,
  cardLinked,
  widgetId,
  productWidgets,
} = defineProps([
  "cardType",
  "cardAmount",
  "cardAction",
  "cardColor",
  "cardActive",
  "cardLinked",
  "widgetId",
  "productWidgets",
]);

const emit = defineEmits();

// Local state for selected color, active state, and linked state
const localSelectedColor = ref(cardColor);
const isActive = ref(cardActive);
const isLinked = ref(cardLinked);

// Function to handle color updates from ColorPicker component
const handleColorUpdate = (color) => {
  localSelectedColor.value = color;
};

// Function to handle toggling of active state
const handleToggleActive = () => {
  // Iterate through productWidgets and deactivate others
  productWidgets.forEach((widget) => {
    if (widget.id !== widgetId) {
      widget.active = false;
    }
  });
  // Emit the toggle-active event with the widgetId and its new active state
  const eventPayload = { widgetId, active: cardActive };
  emit("toggle-active", eventPayload);
};

// Function to handle updates to the linked state
const handleUpdateIsLinked = (value) => {
  isLinked.value = value;
};

// Computed property for text color based on the selected color
const textColor = computed(() => {
  const color = localSelectedColor.value;
  return color === "#FFFFFF" || color === "#F2EBDB" ? "#3B755F" : "#f9f9f9";
});

// Watch for changes in the productWidgets and update the localSelectedColor accordingly
watch(
  () => productWidgets,
  () => {
    const widget = productWidgets.find((w) => w.id === widgetId);
    if (widget) {
      localSelectedColor.value = widget.selectedColor;
    }
  }
);
</script>

<style scoped>
.product-card {
  margin-bottom: 25px;
}

.card-header {
  display: flex;
  padding: 10.297px 13.895px 10.297px 11.91px;
  justify-content: center;
  align-items: center;
  gap: 11.91px;
  border-radius: 5.955px;
  background: #3b755f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.01);
  width: 200px;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info-wrapper {
  flex: 1;
}

.action-description,
.product-details {
  font-family: Cabin;
  line-height: normal;
}

.action-description {
  font-size: 12.406px;
  font-weight: 400;
}

.product-details {
  font-size: 17.865px;
  font-weight: 700;
}

@media (max-width: 800px) {
  .product-card {
    margin-bottom: 25px;
  }
}
</style>
