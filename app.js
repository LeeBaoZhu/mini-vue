import { reactive } from "./core/reactivity.js";
import { h } from "./core/h.js";
export default {
  render(context) {
    return h("div", { id: 1 }, [
      h("span", { id: 2 }, context.state.msg),
      h("span", { id: 3 }, String(context.state.count)),
    ]);
  },
  setup() {
    const state = reactive({
      count: 1,
      msg: "hello",
    });
    window.state = state;
    return {
      state,
    };
  },
};
