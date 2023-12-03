import LinkingToProfile from "../components/LinkingToProfile.vue";
import { ref, watch } from "vue";

export default {
  title: "Components/LinkingToProfile",
  component: LinkingToProfile,
  argTypes: {
    isLinked: { control: "boolean" },
  },
};

const Template = (args) => ({
  components: { LinkingToProfile },
  setup() {
    const isLinkedRef = ref(args.isLinked);

    watch(
      () => isLinkedRef.value,
      (newValue) => {
        args.isLinked = newValue;
      }
    );

    return { args, isLinkedRef };
  },
  template: '<LinkingToProfile v-bind="args" :isLinked="isLinkedRef" />',
});

export const Default = Template.bind({});
Default.args = {
  isLinked: true,
};
