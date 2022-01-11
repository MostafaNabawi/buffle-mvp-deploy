import { React, useState } from "react";
import { Row, Col, Table, Card, Pagination, Form, Button } from "react-bootstrap";
import { Icon } from '@iconify/react';
import style from './style.module.css'

const TableList = ({
    tableHeader, tableBody,
    headClass, bodyClass,
    isPagination
}) => {
    const index = 0;
    return (
        <>
            {/* Table */}
            <Card>
                <Table responsive>
                    <thead className={headClass}>
                        <tr>
                            {tableHeader && (
                                tableHeader.map(item => (
                                    <th key={item +1} className={headClass}>{item}</th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody className={bodyClass}>
                        {tableBody}
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