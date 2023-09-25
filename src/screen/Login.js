import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        sessionStorage.clear();
    })

    const proceedLogin = (e) => {
        e.preventDefault();

        // Send a request to the server to get the user data based on the provided username and password
        fetch(`http://localhost:9999/teachers?email=${email}&password=${password}`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    alert("Login successfully!");
                    sessionStorage.setItem('email', email); 
                    navigate('/home');
                } else {
                    alert("Invalid username or password. Please try again.");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={proceedLogin}>Login</button>

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Login;
