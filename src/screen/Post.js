import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';

const Post = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    //Call API la user
    useEffect(() => {
        axios.get('http://localhost:9999/students')
            .then(function (response) {
                setStudents(response.data)
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    // useEffect(() => {
    //     fetch('http://localhost:9999/users')
    //         .then(res => res.json())
    //         .then(data => {
    //             setUser(data);
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         });
    // }, [])


    // Sort
    const sortStu = (type) => {
        const newSort = [...students];
        if (type === 'id')
            newSort.sort((a, b) => b.id - a.id);
        if (type === 'name')
            newSort.sort((a, b) => a.name > b.name ? 1 : -1);
        setStudents(newSort)
    }
    function handeleDelete(id) {
        // Kiểm tra xem sinh viên có tồn tại trước khi thực hiện xóa
        const studentToDelete = students.find(student => student.id === id);
        if (!studentToDelete) {
            alert('Sinh viên không tồn tại.');
            return;
        }

        axios.delete(`http://localhost:9999/students/${id}`)
            .then(res => {
                alert('Xóa thành công');
                // Sau khi xóa, cập nhật danh sách sinh viên
                const updatedStudents = students.filter(student => student.id !== id);
                setStudents(updatedStudents);
            })
            .catch(err => {
                console.log(err);
                alert('Lỗi khi xóa sinh viên.');
            });
    }


    return (
        <DefaultTemplate>
            <Row className="post-component">
                <Container className="post-content">
                    <Row>
                        <Col xs={12}>
                            <h2 style={{ textAlign: 'center' }}>Post Management</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div><Link to="/create">Add</Link></div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <a href="#" onClick={() => sortStu('id')}>Id</a>
                                        </th>
                                        <th>
                                            <a href="#" onClick={() => sortStu('name')}>Name</a>
                                        </th>
                                        <th>Age</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map(s => (
                                            <tr key={s.id}>
                                                <td>{s.id}</td>
                                                <td>{s.name}</td>
                                                <td>{s.age}</td>
                                                <td>{s.phone}</td>
                                                <td>
                                                    <Link to={`/update/${s.id}`} ><PencilSquare /></Link>&ensp;
                                                    <Link onClick={() => handeleDelete(s.id)}><Trash3Fill /></Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </DefaultTemplate>
    );
}

export default Post;