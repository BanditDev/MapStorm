import {
  h,
  createFactory,
  defaultState,
  propsToState,
  onSnapshot,
  actions,
  render,
  appendTo,
  restoreSnapshot,
  defaultProps,
  action,
  setState,
  mapState,
  toState,
} from './lib';
import { map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

(window as any).h = h;
/** @jsx h */

const Header = createFactory(
  defaultProps(() => ({
    title: 'hello',
  })),
  render(({ props }) => <h1>{props.title}</h1>),
);

const App = createFactory(
  defaultProps(() => ({})),
  defaultState({
    title: 'title',
    isTitleVisible: true,
  }),
  propsToState(p => ({
    ...p.state,
    ...p.props,
  })),
  // restoreSnapshot(() => {
  //   return JSON.parse(localStorage.snapshot || "{}");
  // }),
  // actions(({state}: any) => ({
  //   changeTitle: e => {
  //     state.title = e.target.value;
  //   },
  //   toggleTitle: () => {
  //     state.isTitleVisible = !state.isTitleVisible;
  //   }
  // })),
  // mergeMap(conf => of(1).pipe(

  // )),
  actions(c => ({
    changeTitle: action(
      map((event: { target: HTMLInputElement }) => event.target.value),
      tap(title => (c.state.title = title)),
    ),
    toggleTitle: action(
      mapState(state => state.isTitleVisible),
      map(isTitleVisible => !isTitleVisible),
      tap(isTitleVisible => (c.state.isTitleVisible = isTitleVisible)),
    ),
  })),
  // onSnapshot(({state}, prev) => {
  //   localStorage.snapshot = JSON.stringify(state || {});
  // }),
  render(({ state, actions, props }) => {
    console.log('render', state);
    return (
      <div>
        <input defaultValue={state.title} onInput={actions.changeTitle} />
        <div>
          <span>Show title?</span>
          <input
            type="checkbox"
            defaultChecked={state.isTitleVisible}
            onChange={actions.toggleTitle}
          />
        </div>
        {state.isTitleVisible && <div>={state.title}</div>}
        {state.isTitleVisible && <Header title={state.title} />}
      </div>
    );
  }),
);

// const App = createFactory(
//   // propsToState((p: any) => ({
//   //   ...p.state
//   // })),
//   defaultState({
//     todo: {
//       value: ""
//     },
//     filter: 'all',
//     todos: [
//       {
//         id: 1,
//         value: "value 1",
//         isChecked: false
//       },
//       {
//         id: 2,
//         value: "value 2",
//         isChecked: false
//       }
//     ]
//   }),
//   // restoreSnapshot(() => {
//   //   return JSON.parse(localStorage.snapshot || "{}");
//   // }),
//   // actions(
//   //   action("changeTodoValue", e => {
//   //     state.todo.value = e.target.value;
//   //   })
//   // ),
//   actions(({state}: any) => ({
//     changeTodoValue: e => {
//       state.todo.value = e.target.value;
//     },
//     removeTodo: id => {
//       state.todos = state.todos.filter((t) => t.id !== id);
//     },
//     toggleTodo: id => {
//       const t = state.todos.find(t => t.id === id);
//       t.isChecked = !t.isChecked;
//     },
//     keyPressHandler: e => {
//       if (e.code !== "Enter" || state.todo.value.trim(" ") === "") return;

//       state.todos.push({
//         value: state.todo.value,
//         checked: false
//       });

//       state.todo.value = "";
//     },
//     setFilter: v => {
//       state.filter = v;
//     }
//   })),
//   // onSnapshot(({state}, prev) => {
//   //   localStorage.snapshot = JSON.stringify(state || {});
//   // }),
//   render(({ state, actions, props }) => {

//     let todos = state.todos.slice();
//     if (state.filter !== "all") {
//       todos = todos.filter(t => {
//         let v = t.isChecked;
//         if (state.filter === "active") {
//           v = !v;
//         }

//         return v;
//       });
//     }

//     return (
//       <div>
//         <section className="todoapp">
//           <div>
//             <header className="header">
//               <h1>todos</h1>
//               <input
//                 className="new-todo"
//                 placeholder="What needs to be done?"
//                 value={state.todo.value}
//                 onInput={actions.changeTodoValue}
//                 onKeyDown={actions.keyPressHandler}
//               />
//             </header>
//             <section className="main">
//               <input id="toggle-all" className="toggle-all" type="checkbox" />
//               <label for="toggle-all" />
//               <ul className="todo-list">
//                 {todos.map((todo, i) => (
//                   <li key={todo.id}>
//                     <div className="view">
//                       <input className="toggle" type="checkbox" onClick={() => actions.toggleTodo(todo.id)}/>
//                       <label>{todo.value}</label>
//                       <button className="destroy" onClick={() => actions.removeTodo(todo.id)} />
//                     </div>
//                     <input className="edit" value={todo.value} />
//                   </li>
//                 ))}
//               </ul>
//             </section>
//             <footer className="footer">
//               <span className="todo-count">
//                 <strong>{`${todos.length} `}</strong>
//                 <span>item</span>
//                 <span> left</span>
//               </span>
//               <ul className="filters">
//                 <li>
//                   <a href="#/" className={state.filter === "all" ? "selected" : ""} onClick={() => actions.setFilter("all")}>
//                     All
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#/active" className={state.filter === "active" ? "selected": ""} onClick={() => actions.setFilter("active")}>Active</a>
//                 </li>
//                 <li>
//                   <a href="#/completed" className={state.filter === "completed" ? "selected": ""} onClick={() => actions.setFilter("completed")}>Completed</a>
//                 </li>
//               </ul>
//             </footer>
//           </div>
//         </section>
//       </div>
//     );
//   })
// );

appendTo(document.body, <App />);
