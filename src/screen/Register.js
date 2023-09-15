import React, { useState } from 'react';
import DefaultTemplate from '../template/DefaultTemplate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatpasss, setRepeatpass] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    repeatpasss: '',
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Khởi tạo một object errors mới
    const newErrors = {
      name: '',
      email: '',
      password: '',
      repeatpasss: '',
    };
  
    // Kiểm tra từng trường thông tin và cập nhật errors nếu không hợp lệ
    if (!name) {
      newErrors.name = 'Please enter your name';
    }
    if (!email) {
      newErrors.email = 'Please enter your email';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    }
    if (password !== repeatpasss) {
      newErrors.repeatpasss = 'Passwords do not match';
    }
  
    // Nếu có bất kỳ lỗi nào thì cập nhật state errors và không thực hiện đăng ký
    if (Object.values(newErrors).some((error) => error !== '')) {
      setErrors(newErrors);
    } else {
      // Nếu không có lỗi, thực hiện đăng ký
      axios
        .post('http://localhost:9999/teachers', {
          name: name,
          email: email,
          password: password
        })
        .then((result) => {
          console.log(result.data);
          alert('success');
          navigate('/login');
        })
        .catch((err) => {
          console.error(err);
          alert('service error');
        });
    }
  };
  


  return (
    <DefaultTemplate>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                            <input type="text" id="form3Example1c" className={`form-control ${errors.name && 'is-invalid'}`} value={name} onChange={e => setName(e.target.value)} />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            <input type="email" id="form3Example3c" className={`form-control ${errors.email && 'is-invalid'}`} value={email} onChange={e => setEmail(e.target.value)} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type="password" id="form3Example4c" className={`form-control ${errors.password && 'is-invalid'}`} value={password} onChange={e => setPassword(e.target.value)} />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                            <input type="password" id="form3Example4cd" className={`form-control ${errors.repeatpasss && 'is-invalid'}`} value={repeatpasss} onChange={e => setRepeatpass(e.target.value)} />
                            {errors.repeatpasss && <div className="invalid-feedback">{errors.repeatpasss}</div>}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Register</button>  
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultTemplate>
  );
};

export default Register;
