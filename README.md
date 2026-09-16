# Backend didáctico

Proyecto de enseñanza de backend con Express, MySQL, CRUD, bcrypt, JWT y variables de entorno.

## 1. Instalar

```bash
npm install
```

## 2. Configurar desarrollo

Copia `.env.example` con el nombre `.env` y ajusta las credenciales de MySQL.

En Windows puedes hacerlo desde el Explorador o VS Code. En Git Bash:

```bash
cp .env.example .env
```

## 3. Base de datos

Ejecuta el archivo `src/sql/DB.sql` en MySQL.

## 4. Iniciar

```bash
npm run dev
```

Servidor: `http://localhost:3000`

## 5. Registrar usuario

`POST /api/auth/register`

```json
{
  "nombre": "Ana",
  "email": "ana@correo.com",
  "password": "123456"
}
```

La contraseña se transforma con `bcrypt.hash()` antes de guardarse.

## 6. Login

`POST /api/auth/login`

```json
{
  "email": "ana@correo.com",
  "password": "123456"
}
```

La respuesta entrega un JWT.

## 7. Consumir el CRUD protegido

En las solicitudes al CRUD agrega:

```text
Authorization: Bearer TU_TOKEN
```

Ejemplo:

`GET /api/equipos`

En `back_basico`, las rutas de equipos están protegidas.

En `backend_dinamico`, todas las tablas registradas en `src/config/tablas.js` están protegidas.

## 8. Ambientes

- `.env.example`: plantilla pública para desarrollo.
- `.env.production.example`: plantilla pública para producción.
- `.env`: configuración local real, ignorada por Git.
- `.env.production`: configuración real de producción, ignorada por Git.

El código carga `.env.<NODE_ENV>` cuando existe y usa `.env` como respaldo.

Nunca subas al repositorio contraseñas de MySQL, JWT secrets, API keys u otros secretos.

## 9. Orden pedagógico recomendado

1. CRUD básico.
2. Variables de entorno.
3. Registro de usuario.
4. `bcrypt.hash()`.
5. Login.
6. `bcrypt.compare()`.
7. JWT.
8. Middleware de autenticación.
9. CRUD protegido.
10. CRUD genérico.

## Nota didáctica

La autenticación se mantiene separada del CRUD. La tabla `usuarios` no se expone mediante el CRUD genérico; se administra mediante `/api/auth/register` y `/api/auth/login`.
