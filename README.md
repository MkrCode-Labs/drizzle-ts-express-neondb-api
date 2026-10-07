# Student & Course Management API

API REST para la gestion de estudiantes, cursos e inscripciones escolares, implementada con Node.js, Express, TypeScript y Drizzle ORM sobre PostgreSQL (Neon Serverless), estructurada bajo la arquitectura MVC.

## Tecnologias

![TypeScript](https://img.shields.io/badge/TypeScript-1e1e1e?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Node.js](https://img.shields.io/badge/Node.js-1e1e1e?style=for-the-badge&logo=node.js&logoColor=5FA04E)
![Express](https://img.shields.io/badge/Express.js-1e1e1e?style=for-the-badge&logo=express&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-1e1e1e?style=for-the-badge&logo=drizzle&logoColor=C5F74F)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-1e1e1e?style=for-the-badge&logo=postgresql&logoColor=4169E1)
![Neon](https://img.shields.io/badge/Neon-1e1e1e?style=for-the-badge&logo=neon&logoColor=00E599)

## Caracteristicas

- Arquitectura MVC (Modelos, Controladores y Rutas) para separacion de responsabilidades.
- Tipado estricto de esquemas, consultas e identificadores UUID con TypeScript.
- Modelado relacional muchos a muchos (N:M) entre estudiantes y cursos mediante tabla intermedia `enrollments`.
- Clave primaria compuesta en tabla pivote para garantizar unicidad de inscripciones a nivel de base de datos.
- Consultas relacionales con joins para listar materias asociadas por estudiante.
- Migraciones y administracion visual de datos integradas con Drizzle Kit.

## Endpoints

Base URL: `/api/v1`

### Estudiantes
- `GET /students` - Lista todos los estudiantes registrados.
- `POST /students` - Crea un estudiante (`name`, `email`).
- `GET /students/:studentId/courses` - Obtiene los cursos en los que esta inscrito un estudiante especifico.

### Cursos
- `GET /courses` - Lista todos los cursos disponibles.
- `POST /courses` - Crea un curso (`title`).

### Inscripciones
- `POST /enrollments` - Inscribe un estudiante en un curso (`studentId`, `courseId`).

## Requisitos

- Node.js 18 o superior.
- Base de datos PostgreSQL (o instancia en Neon).

## Instalacion y Ejecucion

1. Clonar el repositorio e instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   Crear un archivo `.env` en la raiz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:password@host/dbname?sslmode=require
   ```

3. Generar migraciones de base de datos:
   ```bash
   npm run db:generate
   ```

4. Ejecutar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

5. Compilar y ejecutar para produccion:
   ```bash
   npm run build
   npm start
   ```

## Comandos Utiles

- `npm run db:generate` - Genera los archivos SQL de migracion basados en el esquema de Drizzle.
- `npm run db:migrate` - Aplica las migraciones pendientes en la base de datos.
- `npm run db:studio` - Abre la interfaz grafica Drizzle Studio en el navegador para explorar los datos.
