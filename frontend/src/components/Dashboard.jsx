import NewRequest from './NewRequest';
import PageLayout from './PageLayout';
import RequestsTable from './RequestsTable';

function Dashboard() {
  const showModal = () => {
    document.getElementById('new_request').showModal();
  };
  return (
    <PageLayout>
      <NewRequest />
      <div className="flex min-h-screen w-full flex-col gap-10 px-28 pt-24">
        <div className="flex w-full justify-between">
          <h1 className="text-start text-3xl font-semibold">Solicitudes</h1>
          <button className="btn btn-primary btn-sm" onClick={showModal}>
            Agregar Solicitud
          </button>
        </div>
        <RequestsTable />
      </div>
    </PageLayout>
  );
}

export default Dashboard;
