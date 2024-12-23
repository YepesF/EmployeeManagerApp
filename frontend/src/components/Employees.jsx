import EmployeesTable from './EmployeesTable';
import NewEmployee from './NewEmployee';
import PageLayout from './PageLayout';

function Employee() {
  const showModal = () => {
    document.getElementById('new_employee').showModal();
  };
  return (
    <PageLayout>
      <NewEmployee />
      <div className="flex min-h-screen w-full flex-col gap-10 px-28 pt-24">
        <div className="flex w-full justify-between">
          <h1 className="text-start text-3xl font-semibold">Empleados</h1>
          <button className="btn btn-primary btn-sm" onClick={showModal}>
            Agregar Empleado
          </button>
        </div>
        <EmployeesTable />
      </div>
    </PageLayout>
  );
}

export default Employee;
