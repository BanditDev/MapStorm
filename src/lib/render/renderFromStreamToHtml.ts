import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { nodeToMap } from "./nodeToMap";
import { diff } from "./diff";

export const renderFromStreamToHtml = ({component, props}) => {
  const [stream, $stream] = component;
  let prevElementMap = new Map();

  if ($stream instanceof Observable) {
    setTimeout(() => stream.next({props}));

    return $stream.pipe(
      map(async component => {
        const elementProps = props || {};
        const jsx = component.render({
          ...component, props: {
            ...elementProps, ...component.defaultProps()
          }
        });
        console.log(jsx);
        const elementMap = await nodeToMap(jsx);
        const tasks = diff(new Map(elementMap), new Map(prevElementMap), true);

        console.log("tasks", tasks);

        prevElementMap = elementMap;
        return tasks;
      })
    );
  }
};

