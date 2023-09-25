import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import axios from 'axios';
import { Link } from "react-router-dom";
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
import Papa from "papaparse";

const Post = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const itemsPerPage = 10;
    const [sortBy, setSortBy] = useState("asc"); 
    const [sortField, setSortField] = useState("id"); 
    const [dataExport, setDataExport] = useState([]);

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

    const handleSort = (order, field) => {
        const sortedStudents = [...students];

        if (field === "id") {
            sortedStudents.sort((a, b) => {
                if (order === "asc") {
                    return a.id - b.id;
                } else {
                    return b.id - a.id;
                }
            });
        } else if (field === "name") {
            sortedStudents.sort((a, b) => {
                if (order === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        }

        setStudents(sortedStudents);
        setSortBy(order);
        setSortField(field);
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
                toast.success('Xóa thành công');
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

    const getUserExport = (event, done) => {
        let result = [];
        if (students && students.length > 0) {
            result.push(["Id", "Name", "Age", "Phone"]);
            students.map((item, index) => {
                let arr = [];
                arr[0] = item.id
                arr[1] = item.name
                arr[2] = item.age
                arr[3] = item.phone
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "application/vnd.ms-excel" && file.type !== "text/csv") {
                toast.error("Only accept CSV files...");
                return;
            }

            Papa.parse(file, {
                header: true, // Parse the first row as header
                complete: function (results) {
                    let parsedData = results.data;
                    if (parsedData.length > 0) {
                        // Check if the parsed data has the expected columns
                        if (
                            !parsedData[0].name ||
                            !parsedData[0].age ||
                            !parsedData[0].phone
                        ) {
                            toast.error("Wrong format Header CSV file");
                        } else {
                            // Set the parsed data as the new student list
                            setStudents(parsedData);
                        }
                    } else {
                        toast.error("No data found in the CSV file");
                    }
                },
            });
        }
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
                                <div className="group-btns">
                                    <Link to="/create" className="btn btn-success mb-2 me-2">
                                        <i class="fa-solid fa-circle-plus"></i>
                                        Add
                                    </Link>
                                    <CSVLink
                                        data={dataExport}
                                        filename={"user.csv"}
                                        className="btn btn-primary mb-2 me-2"
                                        asyncOnClick={true}
                                        onClick={getUserExport}
                                    > <i class="fa-solid fa-file-arrow-down"></i>Export</CSVLink>
                                    <label htmlFor="test" className="btn btn-warning">
                                        <i class="fa-solid fa-file-import"></i> Import
                                    </label>
                                    <input id="test" type="file" hidden
                                        onChange={(event) => handleImportCSV(event)}
                                    />
                                </div>
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

                            <Table striped bordered hover style={{textAlign: 'center'}}>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort(sortBy === "asc" ? "desc" : "asc", "id")}>
                                            <div className="sort-header">
                                                <span>Id</span>&ensp;
                                                <span>
                                                    {sortField === "id" && sortBy === "asc" ? (
                                                        <i className="fa-solid fa-arrow-up"></i>
                                                    ) : (
                                                        <i className="fa-solid fa-arrow-down"></i>
                                                    )}
                                                </span>
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort(sortBy === "asc" ? "desc" : "asc", "name")}>
                                            <div className="sort-header">
                                                <span>Name</span>&ensp;
                                                <span>
                                                    {sortField === "name" && sortBy === "asc" ? (
                                                        <i className="fa-solid fa-arrow-up"></i>
                                                    ) : (
                                                        <i className="fa-solid fa-arrow-down"></i>
                                                    )}
                                                </span>
                                            </div>
                                        </th>
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
