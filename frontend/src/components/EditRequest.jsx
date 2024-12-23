import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { getRequests, updateRequest } from '../api/request';

function EditRequest({ request }) {
  const { state, dispatch } = useAuth();
  const { employees, requests } = state;

  const [requestData, setRequestData] = useState({
    id: '',
    code: '',
    description: '',
    summary: '',
    employeeId: '',
  });

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRequest(
        state.token,
        requestData.id,
        requestData.code,
        requestData.description,
        requestData.summary,
        requestData.employeeId
      );
      if (requests.page === 1) {
        const payload = await getRequests(state.token);
        dispatch({ type: 'UPDATE_REQUESTS', payload });
      }
      setRequestData({
        id: '',
        code: '',
        description: '',
        summary: '',
        employeeId: '',
      });
      dispatch({
        type: 'SET_ALERT',
        payload: { status: 'success', message: 'Solicitud actualizada.' },
      });
      document.getElementById('edit_request').close();
    } catch (error) {
      dispatch({
        type: 'SET_ALERT',
        payload: { status: 'error', message: error.message },
      });
    }
  };

  useEffect(() => {
    setRequestData({
      id: request?.id,
      code: request?.code,
      description: request?.description,
      summary: request?.summary,
      employeeId: employees.allEmployees.find(
        (employee) => employee.name === request?.employee
      )?.id,
    });
  }, [request, employees.allEmployees]);

  return (
    <dialog id="edit_request" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-xl font-bold">Editar Solicitud</h3>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Código</span>
            </label>
            <input
              type="text"
              placeholder="código"
              name="code"
              value={requestData.code}
              className="input input-bordered text-gray-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>
            <input
              type="text"
              placeholder="descripción"
              name="description"
              value={requestData.description}
              className="input input-bordered text-gray-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resumen</span>
            </label>
            <input
              type="text"
              placeholder="resumen"
              name="summary"
              value={requestData.summary}
              className="input input-bordered text-gray-600"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Empleado</span>
            </label>
            <select
              className="select select-bordered w-full text-gray-600"
              value={requestData.employeeId || 'Seleccione un empleado'}
              onChange={(e) => {
                setRequestData({
                  ...requestData,
                  employeeId: e.target.value,
                });
              }}
            >
              <option disabled>Seleccione un empleado</option>
              {employees.allEmployees.map(({ id, name }) => (
                <option key={name + id} value={id} name="employee">
                  {name}
                </option>
              ))}
            </select>
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
EditRequest.propTypes = {
  request: PropTypes.object.isRequired,
};

export default EditRequest;
