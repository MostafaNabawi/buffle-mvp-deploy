import { React } from "react";
import { Button, Container, Row,Col} from "react-bootstrap";
import { Icon } from '@iconify/react';
import Table from "../../table/Table";

const UserList = () => {
    return (
        <>
            <Container className={`secondary-color pt-5 `} fluid>
                <Row className="justify-content-center">
                    <Col xl={9}>
                    <Table
                     tableHeader={["First Name","Last Name","Email","Cuntry","Type"]}
                     tableBody={["Sayed Hassan","Hussaini","sh@gmail.com","Afg","Freelancer"]}
                     tableAction=""
                     isPagination={true}
                    />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserList;