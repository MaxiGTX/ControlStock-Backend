# ControlStock - Gestión de Inventarios

¡Bienvenido a ControlStock! Esta aplicación está diseñada para ayudarte a gestionar tus productos de manera eficiente y mantener tu inventario siempre actualizado.

## Instalación del Backend

Para instalar y configurar el backend del proyecto, sigue estos pasos:

1 **Clona el repositorio**:
```
   git clone https://github.com/tu-usuario/ControlStock-Backend.git
```
2 **Ingresa al directorio del proyecto**:
```
  cd ControlStock-Backend
```
3 **Instala las dependencias**:
```
  npm install
```
## Uso
1. En la raíz del proyecto, crea un archivo .env y configura las variables de entorno necesarias con el env.template de ejemplo:
```
  JWT_SECRET= d1ec1nuev9devbd
  MONGO_URL=mongodb+srv://MaximusGT:EZMrN6byRNPQGgtG@controlstock.sazai.mongodb.net/
  PORT: 5000
```
2. Ejecuta el servidor de Node.js:
   ```
   cd src/
   node app.js

## Funcionalidades Principales

- **Gestión de Productos**: Registra y administra la información de tus productos, incluyendo nombre, categoría, precio y stock.
- **Búsqueda Avanzada**: Busca productos por nombre o categoría y filtra los resultados según tus necesidades.
- **Control de Stock**: Mantén un registro actualizado de tu inventario y recibe alertas cuando los niveles de stock sean bajos.

## Tecnologías Utilizadas

- **FrontEnd**: HTML, CSS, JavaScript, React-JS, React-Bootstrap
- **BackEnd**: Express, Node.js
- **Base de Datos**: MongoDB (Base de Datos No-Relacional)

## Autores

- @MaxiGTX/Maximo Garcia Toledo - Developer



