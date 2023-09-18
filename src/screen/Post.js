import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import axios from 'axios';
import { Link } from "react-router-dom";
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';

const Post = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const itemsPerPage = 10; // Số lượng mục trên mỗi trang

    // Call API lấy danh sách sinh viên
    useEffect(() => {
        axios.get('http://localhost:9999/students')
            .then(function (response) {
                setStudents(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const pageCount = Math.ceil(students.length / itemsPerPage);

    const offset = currentPage * itemsPerPage;
    const currentPageData = searchResults.length > 0 ? searchResults : students.slice(offset, offset + itemsPerPage);

    // Sort
    const sortStu = (type) => {
        const newSort = [...students];
        if (type === 'id')
            newSort.sort((a, b) => b.id - a.id);
        if (type === 'name')
            newSort.sort((a, b) => a.name > b.name ? 1 : -1);
        setStudents(newSort);
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

    const handleSearch = () => {
        const filteredStudents = students.filter((student) =>
            student.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchResults(filteredStudents);
    };

    return (
        <DefaultTemplate>
            <Row className="post-component">
                <Container className="post-content">
                    <Row>
                        <Col xs={12}>
                            <h2 style={{ textAlign: 'center' }}>List Student</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="mb-3 d-flex align-items-center">
                                <Link to="/create" className="btn btn-primary mb-2 me-2">Add</Link>
                                <div className="ml-auto">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="ml-2"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th onClick={() => sortStu('id')}>Id</th>
                                        <th onClick={() => sortStu('name')}>Name</th>
                                        <th>Age</th>
                                        <th>Phone</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentPageData.map(s => (
                                            <tr key={s.id}>
                                                <td>{s.id}</td>
                                                <td>{s.name}</td>
                                                <td>{s.age}</td>
                                                <td>{s.phone}</td>
                                                <td>
                                                    <Link to={`/update/${s.id}`} className="btn btn-warning btn-sm me-2"><PencilSquare /></Link>
                                                    <Button variant="danger" size="sm" onClick={() => handeleDelete(s.id)}><Trash3Fill /></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={({ selected }) => setCurrentPage(selected)}
                                containerClassName={"pagination justify-content-center"}
                                activeClassName={"active"}
                            />
                        </Col>
                    </Row>
                </Container>
            </Row>
        </DefaultTemplate>
    );
}

export default Post;
