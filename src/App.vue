<template>
  <Dashboard />
</template>
<script>
import Dashboard from "./components/DashboardComponent.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
  data() {},
};
</script>
<style>
body {
  margin: 0px;
  padding: 0px;
  font-family: "Cabin", sans-serif;
  background-color: #ffffff;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
