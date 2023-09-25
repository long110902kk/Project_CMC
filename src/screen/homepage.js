import React, { useEffect, useState } from 'react';
import DefaultTemplate from '../template/DefaultTemplate';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const email = sessionStorage.getItem('email');

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (email) {
      axios.get(`http://localhost:9999/teachers?email=${email}`)
        .then(function (res) {
          setTeachers(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoggedInUser(email);
    }
  }, []);
  function confirmDelete(id) {
    const teacherToDelete = teachers.find(teacher => teacher.id === id);
    if (!teacherToDelete) {
      alert('Sinh viên không tồn tại.');
      return;
    }

    const userConfirmed = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?');
    if (userConfirmed) {
      axios.delete(`http://localhost:9999/teachers/${id}`)
        .then(res => {
          toast.success("Delete succesfully")
          const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
          setTeachers(updatedTeachers);
          navigate('/')
        })
        .catch(err => {
          console.log(err);
          alert('Lỗi khi xóa sinh viên.');
        });
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <DefaultTemplate>
      <section style={{ backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 56px)' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                  <h3>{teachers.length > 0 ? teachers[0].name : ''}</h3>
                  <h5 className="my-3">{loggedInUser}</h5> {/* Hiển thị tên người dùng đã đăng nhập */}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {
                    teachers.map(t => (
                      <div key={t.id}>
                        <p className="teacher-info">Full name: {t.name}</p>
                        <p className="teacher-info">Email: {t.email}</p>
                        <p className="teacher-info">Gender: {t.gender}</p>
                        <p className="teacher-info">Age: {t.age}</p>
                        <p className="teacher-info">Address: {t.address}</p>
                        <p style={{ textAlign: 'center' }}>
                          <Link to={`/update2/${t.id}`}>
                            <Button className="custom-button">Update</Button>
                          </Link>
                        </p>
                        <p style={{ textAlign: 'center' }}>
                          <Button className="custom-button" onClick={() => confirmDelete(t.id)}>
                            Delete Account
                          </Button>
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultTemplate>
  );
};

export default Home;
