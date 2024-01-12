# Utiliza una imagen de Node.js como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación Nest.js escucha (por defecto 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor se inicia
CMD [ "npm", "start" ]
