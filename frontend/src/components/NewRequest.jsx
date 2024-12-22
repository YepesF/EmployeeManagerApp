import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchRequest, getRequests } from '../api/request';

function NewRequest() {
  const { state, dispatch } = useAuth();
  const { employees, requests } = state;

  const [requestData, setRequestData] = useState({
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
      await fetchRequest(
        state.token,
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
        code: '',
        description: '',
        summary: '',
        employeeId: '',
      });
      document.getElementById('new_request').close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog id="new_request" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-xl font-bold">Crear Solicitud</h3>
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
              defaultValue="Seleccione un empleado"
              value={requestData.employeeId || 'Seleccione un empleado'}
              onChange={(e) => {
                setRequestData({
                  ...requestData,
                  employeeId: e.target.value,
                });
              }}
            >
              <option disabled>Seleccione un empleado</option>
              {employees.data.map(({ id, name }) => (
                <option key={name} value={id} name="employeeId">
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

export default NewRequest;
