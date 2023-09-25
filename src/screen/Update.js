import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:9999/teachers/' + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    axios.put('http://localhost:9999/teachers/' + id, data)
      .then(res => {
        toast.success("Data update succesfully")
        navigate('/home')
      })
  }
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
                        value={data.name}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, name: e.target.value })}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        value={data.email}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, email: e.target.value })}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="phone">Password</label>
                      <input
                        type="text"
                        id="password"
                        value={data.password}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, password: e.target.value })}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="phone">Gender</label>
                      <input
                        type="text"
                        id="gender"
                        value={data.gender}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, gender: e.target.value })}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="age">Age</label>
                      <input
                        type="text"
                        id="age"
                        value={data.age}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, age: e.target.value })}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        value={data.address}
                        className="form-control form-control-lg"
                        onChange={e => setData({ ...data, address: e.target.value })}
                      />
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Update</button>
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

export default Update;
