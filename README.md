**Hotelinking** es una pequeña plataforma donde los usuarios pueden registrarse, ver una lista de ofertas, generar códigos promocionales únicos y canjearlos en su cuenta. Este es el backend del proyecto, creado con **Express** y utilizando **Sequelize** para interactuar con la base de datos MySQL.

## Descripción

La aplicación permite que un usuario se registre o haga login, vea una lista de ofertas y genere un código promocional único. Los códigos se guardan en la base de datos, y el usuario puede ver sus códigos generados en una página de detalle. Además, puede canjear esos códigos, los cuales se marcarán como "canjeados" en la base de datos.

### Funcionalidades principales

- Registro y login de usuarios.
- Generación de códigos promocionales únicos.
- Visualización y canje de códigos promocionales.
- Confirmaciones de operaciones realizadas (feedback al usuario).

## Instalación

### Prerrequisitos

Asegúrate de tener **Node.js** y **npm** instalados.  
Puedes descargarlos desde [nodejs.org](https://nodejs.org/).

### Pasos para la instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Javierdigital85/hotelinking-backend
cd Hotelinking-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   PORT=8000
   DB_USERNAME=tu_usuario_mysql
   DB_PASSWORD=tu_contraseña_mysql
   DB_NAME=hotelinking_db
   DB_HOST=127.0.0.1
   DIALECT=mysql

4. Si deseas usar Docker:

Asegúrate de tener Docker instalado y configura un archivo `docker-compose.yml` para correr la base de datos y el servidor juntos.

5. Insertar ofertas de ejemplo en la base de datos ejecutando el siguiente comando:

```bash
npm run load:data
```

Este script llenará automáticamente la base de datos con ofertas de prueba, útil para desarrollo y demostraciones.

6. Inicia el servidor en desarrollo:

```bash
npm run dev
```

## Ejecutar las pruebas

Este proyecto tiene pruebas unitarias y de integración configuradas con **Jest**.

- Para ejecutar las pruebas unitarias:

```bash
npm run test:unit
```

- Para ejecutar las pruebas de integración:

```bash
npm run test:integration
```

## Rutas API

### Usuarios

- `POST /api/users/register`: Registra un nuevo usuario.
- `POST /api/users/login`: Inicia sesión.
- `GET /api/users/:id`: Obtiene un usuario por su ID.
- `GET /api/users/me`: Obtiene la información del usuario autenticado (requiere token).

### Ofertas

- `POST /api/offer/create-offer`: Crea una nueva oferta.
- `GET /api/offer/get-offers`: Obtiene una lista de ofertas.
- `GET /api/offer/offer/:id`: Obtiene una oferta específica por ID.

### Códigos Promocionales

- `POST /api/promo-code/create-promo`: Genera un nuevo código promocional.
- `PUT /api/promo-code/:codeId`: Canjea un código por ID.
- `GET /api/promo-code/get-promos`: Lista los códigos del usuario.

## Tecnologías utilizadas

- **Express.js**: Framework para crear el servidor HTTP.
- **Sequelize**: ORM para interactuar con MySQL.
- **MySQL**: Base de datos relacional.
- **Jest**: Framework de testing.
- **TypeScript**: Tipado estático para JavaScript.
