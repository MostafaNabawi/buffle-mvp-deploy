import { React } from "react";
import { Container, Row} from "react-bootstrap";
import { Icon } from '@iconify/react';
import Table from "../../table/Table";

const UserList = () => {
    return (
        <>
            <Container className={`secondary-color pt-5 `} fluid>
                <Row className="justify-content-center">
                    <Table
                     tableHeader={
                        <thead>
                        <tr>
                            <th>#</th>
                            
                        </tr>
                    </thead>
                     }
                     tableBody={
                        <tbody>
                        <tr>
                            <td>1</td>
                        </tr>
                    </tbody>
                     }
                    />
                </Row>
            </Container>
        </>
    );
};

export default UserList;