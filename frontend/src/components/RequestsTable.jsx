// import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { deleteRequest, getRequests } from '../api/request';
import EditRequest from './EditRequest';
import { useState } from 'react';
import Swal from 'sweetalert2';

function RequestsTable() {
  const { state, dispatch } = useAuth();
  const token = state.token;
  const requests = state.requests?.data || [];
  const { page, limit, pages } = state.requests;
  const role = state.user?.role || 'employee';

  const [currentRequest, setCurrentRequest] = useState({});

  const handlePrevPage = async () => {
    try {
      const payload = await getRequests(token, page - 1);
      dispatch({ type: 'UPDATE_REQUESTS', payload });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = async () => {
    try {
      const payload = await getRequests(token, page + 1);
      dispatch({ type: 'UPDATE_REQUESTS', payload });
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = (requestData) => {
    setCurrentRequest(requestData);
    document.getElementById('edit_request').showModal();
  };

  const handleDelete = async (requestId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest(token, requestId)
          .then(() => {
            if (state.requests.page === 1) {
              getRequests(state.token).then((payload) => {
                dispatch({ type: 'UPDATE_REQUESTS', payload });
              });
            }
            Swal.fire({
              title: '¡Borrado!',
              text: 'El registro ha sido eliminado.',
              icon: 'success',
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el registro, intente de nuevo.',
              icon: 'error',
            });
          });
      }
    });
  };

  // const [status, setStatus] = useState({ status: '', message: '' });
  // const [showAlert, setShowAlert] = useState(false);
  return (
    <div className="overflow-x-auto">
      <EditRequest request={currentRequest} />
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Resumen</th>
            <th>Empleado</th>
            <th>Creación</th>
            <th>Actualizacion</th>
            {role === 'admin' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.code + index}>
              <th>{(parseInt(page) - 1) * parseInt(limit) + index + 1}</th>
              <td>{request.code}</td>
              <td>{request.description}</td>
              <td>{request.summary}</td>
              <td>{request.employee}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>{new Date(request.updatedAt).toLocaleString()}</td>
              {role === 'admin' && (
                <td className="flex justify-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 cursor-pointer hover:text-primary"
                    onClick={() => showModal(request)}
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 cursor-pointer hover:text-primary"
                    onClick={() => handleDelete(request.id)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join mt-5 flex w-full justify-center">
        <button
          className="btn join-item"
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          «
        </button>
        <button className="btn join-item">Página {page}</button>
        <button
          className="btn join-item"
          disabled={page === pages}
          onClick={handleNextPage}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default RequestsTable;
