import { Link } from 'react-router';

function NotFound() {
  return (
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
            <h1 className="text-6xl font-bold">404 - Página no encontrada</h1>
            <p className="py-6 text-lg">
              La página que estás buscando no existe.
            </p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
