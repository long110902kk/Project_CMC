import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [inputData, setInputData] = useState({ name: '', age: '', phone: '' });
    const [errors, setErrors] = useState({ name: '', age: '', phone: '' });
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        // Kiểm tra và cài đặt thông báo lỗi
        const newErrors = {};
        if (!inputData.name) {
            newErrors.name = 'Vui lòng nhập tên.';
        }
        if (!inputData.age) {
            newErrors.age = 'Vui lòng nhập tuổi.';
        }
        if (!inputData.phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại.';
        }
        setErrors(newErrors);

        // Kiểm tra xem có lỗi nào không
        if (Object.keys(newErrors).length > 0) {
            return; // Không thực hiện thêm sinh viên nếu có lỗi
        }

        axios.post('http://localhost:9999/students', inputData)
            .then(res => {
                alert("Data add success");
                navigate('/post');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        if(email==='' || email === null){
            navigate('/')
        }
    })

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control form-control-lg"
                                                onChange={e => setInputData({ ...inputData, name: e.target.value })}
                                            />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="age">Age</label>
                                            <input
                                                type="text"
                                                id="age"
                                                className="form-control form-control-lg"
                                                onChange={e => setInputData({ ...inputData, age: e.target.value })}
                                            />
                                            {errors.age && <div className="text-danger">{errors.age}</div>}
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="phone">Phone</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className="form-control form-control-lg"
                                                onChange={e => setInputData({ ...inputData, phone: e.target.value })}
                                            />
                                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Add; 
