# EmployeeManagerApp

Este proyecto es una aplicación web para la gestión de empleados y sus solicitudes. Incluye un backend construido con Node.js, Sequelize, y PostgreSQL, y un frontend desarrollado con React y Vite.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- **Node.js** (versión 16 o superior): [Descargar Node.js](https://nodejs.org)
- **PostgreSQL** (versión 12 o superior): [Descargar PostgreSQL](https://www.postgresql.org/download/)
- **Docker** (para el despliegue con contenedores): [Descargar Docker](https://www.docker.com/products/docker-desktop)

---

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

### Clonar el Repositorio

```bash
git clone https://github.com/YepesF/EmployeeManagerApp.git
cd EmployeeManagerApp
```

### Despliegue con Docker

1. Construye y ejecuta los contenedores:

   ```bash
   docker compose up -d --build
   ```

   `NOTA: Dado que se creó un servicio para la base de datos, este tarda aproximadamente 15 segundos en iniciarse. Por lo tanto, el Backend realiza algunos intentos de reconexión antes de estar completamente operativo. Para verificar el estado, puede usar el comando:`

   ```bash
   docker logs -f backend
   ```

2. La aplicación estará disponible en:
   - Backend: `http://localhost:3001`
   - Frontend: `http://localhost:3000`

---

## Mejores Prácticas

1. **Estructura de Código**:

   - Mantén los controladores separados de las rutas.
   - Utiliza servicios para encapsular lógica de negocio.

2. **Manejo de Errores**:

   - Utiliza un middleware de manejo de errores en el backend.
   - Muestra mensajes de error claros en el frontend.

3. **Autenticación y Autorización**:

   - Utiliza JWT para gestionar sesiones.
   - Valida roles y permisos en cada endpoint.

4. **Validación de Datos**:
   - Usa `express-validator` para validar los datos en el backend.
   - Valida formularios en el frontend antes de enviarlos al servidor.

---

## Seguridad

1. **Protección de Datos**:

   - Hashea las contraseñas con `bcrypt` antes de almacenarlas.

2. **Control de Acceso**:

   - Valida los tokens de usuario en cada endpoint protegido.
   - Restringe el acceso según el rol (`admin` o `employee`).

---

## Pruebas

1. **Variables de Entorno**:

   - Abre el archivo `docker-compose.yml`.
   - Localiza el servicio `backend`.
   - Cambia el valor de la variable de entorno `NODE_ENV` a `test`.
   - Guarda los cambios.

2. **Ingresar al contenedor del Backend**:
   Ejecuta el siguiente comando para acceder al contenedor:
   ```bash
      docker exec -it backend sh
   ```
3. **Ejecuta las pruebas**:
   Una vez dentro del contenedor, ejecuta:
   ```bash
      npm test
   ```
4. **Validar resultados**:
   Revisa la salida del comando para asegurarte de que todas las pruebas se ejecutaron correctamente.
