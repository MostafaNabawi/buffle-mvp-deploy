import { React } from "react";
import { Table, Card } from "react-bootstrap";
import { Icon } from '@iconify/react';

const TableList = ({ tableHeader, tableBody }) => {
    return (
        <>
            <Card>
                <Table responsive>
                    {tableHeader}
                    {tableBody}
                   
                </Table>
            </Card>
        </>
    );
};

export default TableList;