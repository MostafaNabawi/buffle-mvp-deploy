import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import Column from "./Column";

const style = {};
const Row = ({ data, components, handleDrop, path }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: ROW,
        item: {

            id: data.id,
            children: data.children,
            path
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    const renderColumn = (column, currentPath, type) => {
        return (
            <Column
                key={column.id}
                data={column}
                type={type}
                components={components}
                handleDrop={handleDrop}
                path={currentPath}
            />
        );
    };

    return (
        <div ref={ref} style={{ ...style, opacity }} className="base draggable row">
            <div className="columns">
                {data.children.map((column, index) => {
                    const currentPath = `${path}-${index}`;

                    return (
                        <React.Fragment key={column.id}>

                            {renderColumn(column, currentPath, data.type)}
                        </React.Fragment>
                    );
                })}

            </div>
        </div>
    );
};
export default Row;
