import { useAuth } from '../context/AuthContext';
import EmployeesTable from './EmployeesTable';
import NewEmployee from './NewEmployee';
import PageLayout from './PageLayout';

function Employee() {
  const { state } = useAuth();
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
        {state.employees?.data.length === 0 ? (
          <div className="flex min-h-[60rem] items-center justify-center overflow-x-auto">
            <h3 className="text-start text-3xl font-semibold">
              No hay solicitudes disponibles para mostrar en este momento.
            </h3>
          </div>
        ) : (
          <EmployeesTable />
        )}
      </div>
    </PageLayout>
  );
}

export default Employee;
