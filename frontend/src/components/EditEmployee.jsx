import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { getEmployees, updateEmployee } from '../api/employee';

function EditEmployee({ employee }) {
  const { state, dispatch } = useAuth();
  const { employees } = state;

  const [employeeData, setEmployeeData] = useState({
    id: '',
    hireDate: '',
    name: '',
    salary: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(
        state.token,
        employeeData.id,
        employeeData.hireDate,
        employeeData.name,
        employeeData.salary,
        employeeData.email,
        employeeData.password,
        employeeData.role
      );
      if (employees.page === 1) {
        const payload = await getEmployees(state.token);
        dispatch({ type: 'UPDATE_EMPLOYEES', payload });
      }
      setEmployeeData({
        id: '',
        hireDate: '',
        name: '',
        salary: '',
        email: '',
        password: '',
        role: '',
      });
      dispatch({
        type: 'SET_ALERT',
        payload: { status: 'success', message: 'Empleado actualizado.' },
      });
      document.getElementById('edit_employee').close();
    } catch (error) {
      dispatch({
        type: 'SET_ALERT',
        payload: { status: 'error', message: error.message },
      });
    }
  };

  useEffect(() => {
    setEmployeeData({
      id: employee?.id,
      hireDate: employee?.hireDate,
      name: employee?.name,
      salary: employee?.salary,
      email: employee?.email,
      password: employee?.password,
      role: employee?.role,
    });
  }, [employee]);

  return (
    <dialog id="edit_employee" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-xl font-bold">Editar Empleado</h3>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="nombre"
              name="name"
              value={employeeData.name}
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
              value={employeeData.email}
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
              value={employeeData.password}
              className="input input-bordered text-gray-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              className="select select-bordered w-full text-gray-600"
              value={employeeData.role || 'Seleccione un role'}
              onChange={(e) => {
                setEmployeeData({
                  ...employeeData,
                  role: e.target.value,
                });
              }}
            >
              <option disabled>Seleccione un role</option>
              <option value="admin">admin</option>
              <option value="employee">employee</option>
            </select>
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
              value={employeeData.salary}
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
              value={employeeData.hireDate}
              className="input input-bordered text-gray-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
EditEmployee.propTypes = {
  employee: PropTypes.object.isRequired,
};

export default EditEmployee;
