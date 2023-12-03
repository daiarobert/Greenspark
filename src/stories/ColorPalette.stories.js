// src/stories/ColorPalette.stories.ts

import ColorPalette from "../components/ColorPicker.vue";

export default {
  title: "Components/ColorPalette",
  component: ColorPalette,
  argTypes: {
    cardColorNew: { control: "color" },
  },
};

const Template = (args) => ({
  components: { ColorPalette },
  setup() {
    return { args };
  },
  template: '<ColorPalette v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  cardColorNew: "#3B755F",
};
