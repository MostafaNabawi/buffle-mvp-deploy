import React from "react";
import Example from "./example";
import { DndProvider } from "react-dnd";

import "./styles.css";

function ReactDnd() {
  return (
    <div className="react-dnd">
      <DndProvider>
        <Example />
      </DndProvider>
    </div>
  );
}
export default ReactDnd;
