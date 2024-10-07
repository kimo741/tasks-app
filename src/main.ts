import "./assets/main.css";
import "./assets/theme.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import globalComponents from "@/components/ui/global-components";
const app = createApp(App);
// app.use(router)
// global components
Object.keys(globalComponents).forEach((componentName: string) => {
    // @ts-ignore
    app.component(componentName, globalComponents[componentName]);
});
app.use(store).mount("#app");
