import { Link, useNavigate } from 'react-router';
import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { login, register } from '../api/auth';
import Alert from './Alert';
import { useAuth } from '../context/AuthContext';
import { getRequests } from '../api/request';
import { getEmployees } from '../api/employee';

function Register() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    hireDate: '',
    salary: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({ status: '', message: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(
        userData.name,
        userData.hireDate,
        userData.salary,
        userData.email,
        userData.password
      );
      setStatus({ status: 'success', message: 'Registro exitoso.' });

      const { user, token } = await login(userData.email, userData.password);
      const requests = await getRequests(token);
      const role = user.role;

      let employees;
      if (role === 'admin') {
        employees = await getEmployees(token);
      }

      const payload = { user, token, requests, employees };
      dispatch({ type: 'LOGIN', payload });
      navigate('/dashboard');
    } catch (err) {
      setStatus({ status: 'error', message: err.message });
    }
  };

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <PageLayout>
      {showAlert && <Alert status={status.status} message={status.message} />}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="hero-content flex-col gap-12 lg:flex-row-reverse">
            <div className="max-w-xl text-center lg:text-left">
              <h1 className="text-6xl font-bold">¡Regístrate ahora!</h1>
              <p className="py-6 text-lg">
                Únete a nuestra plataforma y accede a un entorno diseñado para
                facilitar tu gestión diaria. Regístrate ahora para ser parte de
                nuestra comunidad y empezar a aprovechar todas las herramientas
                disponibles.
              </p>
            </div>
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    type="text"
                    placeholder="nombre"
                    name="name"
                    className="input input-bordered text-gray-600"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fecha de ingreso</span>
                  </label>
                  <input
                    type="date"
                    name="hireDate"
                    className="input input-bordered text-gray-600"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Salario</span>
                  </label>
                  <input
                    type="number"
                    placeholder="salario"
                    name="salary"
                    min={1}
                    className="input input-bordered text-gray-600"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered text-gray-600"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered text-gray-600"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Regístrate</button>
                </div>
                <div className="divider">or</div>
                <Link className="btn btn-neutral" to="/">
                  Inicia Sesion
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Register;
