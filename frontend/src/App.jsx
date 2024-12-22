import PageLayout from './components/PageLayout';

function App() {
  return (
    <PageLayout>
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
              <h1 className="text-6xl font-bold">Ingresa ahora!</h1>
              <p className="py-6 text-lg">
                Bienvenido a la plataforma de gestión empresarial. Aquí puedes
                acceder a tus solicitudes, consultar tu información y ser parte
                del crecimiento del equipo. ¡Inicia sesión para comenzar!
              </p>
            </div>
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
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
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="link-hover link label-text-alt">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Inicia Sesion</button>
                </div>
                <div className="divider">or</div>
                <a className="btn btn-neutral">Registrate</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default App;
