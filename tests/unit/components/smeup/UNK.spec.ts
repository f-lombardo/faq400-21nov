import { shallowMount } from "@vue/test-utils";
import UNK from "@/components/smeup/UNK.vue";

describe("UNK", () => {
  it("renders content", () => {
    const content = "UNK";
    const wrapper = shallowMount(UNK, {});
    expect(wrapper.text()).toMatch(content);
  });
});
