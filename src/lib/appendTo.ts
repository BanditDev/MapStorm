import { renderFromStreamToHtml } from "./render/renderFromStreamToHtml";
import { flatMap, tap } from "rxjs/operators";
import { applyTasks } from "./render/dom/applyTasks";

export const appendTo = (node: HTMLElement, component) => {
  renderFromStreamToHtml(component)
    .pipe(
      flatMap(promise => promise),
      tap(tasks => {
        applyTasks(tasks, node);
      })
    )
    .subscribe();
};
