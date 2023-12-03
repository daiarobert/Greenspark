// src/stories/ActivateBadge.stories.ts

import ActivateBadge from "../components/ActiveBadge.vue";

export default {
  title: "Components/ActivateBadge",
  component: ActivateBadge,
  argTypes: {
    isActive: { control: "boolean" },
    widgetId: { control: "text" },
  },
};

const Template = (args) => ({
  components: { ActivateBadge },
  setup() {
    return { args };
  },
  template: '<ActivateBadge v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  isActive: false,
  widgetId: "exampleWidgetId",
};
