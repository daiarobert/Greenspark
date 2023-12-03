// src/stories/Card.stories.ts

import Card from "../components/CardComponent.vue";
import { ref } from "vue";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    cardType: { control: "text" },
    cardAmount: { control: "number" },
    cardAction: { control: "text" },
    cardColor: { control: "color" },
    cardActive: { control: "boolean" },
    cardLinked: { control: "boolean" },
    selectedColor: { control: "color" },
    widgetId: { control: "text" },
    productWidgets: { control: "object" },
  },
};

const Template = (args) => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: '<div style="width: 300px;"><Card v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  cardType: "exampleType",
  cardAmount: 42,
  cardAction: "Example Action",
  cardColor: "#3B755F",
  cardActive: false,
  cardLinked: true,
  selectedColor: "#3B755F",
  widgetId: "exampleWidgetId",
  productWidgets: ref([
    { id: 1, type: "WidgetType1", amount: 10 },
    { id: 2, type: "WidgetType2", amount: 20, cardActive: true },
  ]),
};
