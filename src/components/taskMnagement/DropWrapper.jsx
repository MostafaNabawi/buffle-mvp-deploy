import React from 'react';
import { useDrop } from 'react-dnd';
import ITEM_TYPE from './data/types';
import { statuses } from './data';
import moment from 'moment';

const DropWrapper = ({ onDrop, children, status }) => {

    const [{ isOver }, drop] = useDrop({

        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(si => si.status === moment(item.date, "YYYY-MM-DD HH:mm:ss").format('dddd'));
            const statusIndex = statuses.findIndex(si => si.status === status);
            // console.log('status', statusIndex, 'item', itemIndex)
            return [statusIndex, statusIndex, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;