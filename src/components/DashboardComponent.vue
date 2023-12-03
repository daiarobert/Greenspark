<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <h3 class="dashboard-title">Per product widgets</h3>
      <div class="content" style="bg-color: #f9f9f9">
        <div class="card-container">
          <div v-if="loading" class="loader">Loading...</div>

          <Card
            v-for="widget in productWidgets"
            :key="widget.id"
            :cardType="widget.type"
            :cardAmount="widget.amount"
            :cardAction="widget.action"
            :cardActive="widget.active"
            :cardLinked="widget.linked"
            :cardColor="widget.selectedColor"
            :activeWidgetId="activeWidgetId"
            :widgetId="widget.id"
            :productWidgets="productWidgets"
            @toggle-active="handleToggleActive"
            @updateCardLinked="handleUpdateCardLinked"
            @updateCardColor="handleUpdateCardColor"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProductWidgets } from "@/utils/api";
import Card from "./CardComponent.vue";

// Reactive variables
const productWidgets = ref([]);
const activeWidgetId = ref(null);
const loading = ref(true); // Introduce a loading state

// Fetch widgets data from API on component mount
const testFetchAPI = async () => {
  try {
    const widgets = await fetchProductWidgets();
    // Map API colors to component colors
    productWidgets.value = widgets.map((widget) => ({
      ...widget,
      selectedColor: mapColor(widget.selectedColor),
    }));

    // Find the first active widget and set its ID as the activeWidgetId
    const firstActiveWidget = productWidgets.value.find(
      (widget) => widget.active
    );
    activeWidgetId.value = firstActiveWidget ? firstActiveWidget.id : null;
  } catch (error) {
    console.error("Error testing API:", error);
  } finally {
    loading.value = false; // Set loading to false when data is loaded
  }
};

// Handle toggling the active state of a widgets
const handleToggleActive = ({ widgetId, active }) => {
  const widget = productWidgets.value.find((w) => w.id === widgetId);
  if (widget) {
    widget.active = !widget.active;
  }
};

const handleUpdateCardLinked = ({ widgetId, linked }) => {
  const widget = productWidgets.value.find((w) => w.id === widgetId);
  if (widget) {
    widget.linked = linked;
  }
};

const handleUpdateCardColor = ({ widgetId, color }) => {
  const widget = productWidgets.value.find((w) => w.id === widgetId);
  if (widget) {
    widget.selectedColor = color;
  }
};

// Map API color names to component color codes
const mapColor = (apiColor) => {
  switch (apiColor) {
    case "green":
      return "#3B755F";
    case "blue":
      return "#2E3A8C";
    case "black":
      return "black";
    default:
      return "#000000";
  }
};

// Fetch API data on component mount
onMounted(testFetchAPI);
</script>

<style scoped>
.dashboard-wrapper {
  padding: 36px;
  border-radius: 8px;
  background: #f9f9f9;
  min-height: 419px;
  box-shadow: 0px 0.77778px 2.99074px 0px rgba(0, 0, 0, 0.01),
    0px 3.42222px 6.19259px 0px rgba(0, 0, 0, 0.02),
    0px 8.4px 12.35px 0px rgba(0, 0, 0, 0.03),
    0px 16.17778px 24.20741px 0px rgba(0, 0, 0, 0.03),
    0px 27.22222px 44.50926px 0px rgba(0, 0, 0, 0.04),
    0px 42px 76px 0px rgba(0, 0, 0, 0.05);
}

.header {
  background-color: aquamarine;
  width: 100%;
}

.card-container {
  display: flex;
  min-width: 779px;
  justify-content: space-between;
  align-items: flex-start;
}

.dashboard-title {
  color: #212121;
  text-align: center;
  font-family: Cabin;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  text-align: start;
  border: 2px black;
  border-bottom: 2px solid #b0b0b0;
  margin: 0px 0px 20px;
  padding-bottom: 12px;
}

@media (max-width: 800px) {
  .dashboard-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  .dashboard-wrapper {
    min-height: 630px;
  }
  .card-container {
    justify-content: center;
    display: contents;
    justify-content: space-between;
    align-items: flex-start;
  }
  .content {
    padding: 0 20px;
  }
}
</style>
