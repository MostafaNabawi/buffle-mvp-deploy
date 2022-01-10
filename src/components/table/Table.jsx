import { React } from "react";
import { Table, Card, Pagination } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from './style.module.css'

const TableList = ({
    tableHeader, tableBody, tableAction,
    headClass, bodyClass, actionClass,
    isPagination
}) => {
    return (
        <>
            <Card>
                <Table responsive>
                    <thead className={headClass}>
                        <tr>
                            {tableHeader && (
                                tableHeader.map(item => (
                                    <th className={actionClass}>{item}</th>
                                ))
                            )}
                            {tableAction && (
                                <th>Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className={bodyClass}>
                        <tr>
                            {tableBody && (
                                tableBody.map(item => (
                                    <td>{item}</td>
                                ))
                            )}
                            {tableAction && (
                                <td className={actionClass}>{tableAction}</td>
                            )}
                        </tr>
                    </tbody>
                </Table>
                {
                    isPagination && (
                        <Pagination className={style.custompagination} >
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Next />
                        </Pagination>
                    )
                }
            </Card>
        </>
    );
};

export default TableList;