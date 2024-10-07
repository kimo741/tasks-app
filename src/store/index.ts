// @ts-ignore
import { createStore } from "vuex";
export interface State {
    tasks: TsaksType[];
}

export default createStore<State>({
    state: {
        tasks: [
            {
                id: "1",
                task:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut neque quam harum, obcaecati non reiciendis deserunt laborum distinctio aliquid cumque doloribus ex repudiandae blanditiis officia tempora earum aspernatur et quidem.",
                status: "todo",
                is_complete: false,
            },
            {
                id: "2",
                task:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut neque quam harum, obcaecati non reiciendis deserunt laborum distinctio aliquid cumque doloribus ex repudiandae blanditiis officia tempora earum aspernatur et quidem.",
                status: "in_progress",
                is_complete: false,
            },
        ],
    },
    getters: {
        getTasks: (state: State) => state.tasks,
    },
    mutations: {
        addTask(state: State, payload: any) {
            let curentPayload = payload.form;
            console.log(payload.form);
            curentPayload.id = `${state.tasks.length + 1}`;
            state.tasks.unshift(curentPayload);
        },
        editTask(state: State, { form }: any) {
            const index = state.tasks.findIndex((task) => task.id === form.id);
            if (index !== -1) {
                state.tasks[index] = { ...form };
            }
        },
        deleteTask(state: State, id: string) {
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
        completeTask(state: State, id: string) {
            const index = state.tasks.findIndex((task) => task.id === id);
            state.tasks[index].is_complete = true;
        },
        dragTask(state: State, { dropIndex, dragIndex }: { dropIndex: number; dragIndex: number }) {
            const draggedItem = state.tasks[dragIndex];
            state.tasks.splice(dragIndex, 1);
            state.tasks.splice(dropIndex, 0, draggedItem);
        },

    },
    actions: {},
    modules: {},
});
