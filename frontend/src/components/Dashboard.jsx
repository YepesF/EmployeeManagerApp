import { useAuth } from '../context/AuthContext';
import NewRequest from './NewRequest';
import PageLayout from './PageLayout';
import RequestsTable from './RequestsTable';

function Dashboard() {
  const { state } = useAuth();
  const showModal = () => {
    document.getElementById('new_request').showModal();
  };
  return (
    <PageLayout>
      <NewRequest />
      <div className="flex min-h-screen w-full flex-col gap-10 px-4 pt-24 2xl:px-28">
        <div className="flex w-full justify-between">
          <h1 className="text-start text-3xl font-semibold">Solicitudes</h1>
          {state.user?.role === 'admin' && (
            <button className="btn btn-primary btn-sm" onClick={showModal}>
              Agregar Solicitud
            </button>
          )}
        </div>
        {state.requests?.data.length === 0 ? (
          <div className="flex min-h-[60rem] items-center justify-center overflow-x-auto">
            <h3 className="text-start text-3xl font-semibold">
              No hay solicitudes disponibles para mostrar en este momento.
            </h3>
          </div>
        ) : (
          <RequestsTable />
        )}
      </div>
    </PageLayout>
  );
}

export default Dashboard;
