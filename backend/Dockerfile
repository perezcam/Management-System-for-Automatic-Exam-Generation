# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Compila TypeScript a JavaScript en la carpeta `dist/`
RUN npx tsc

# Expone el puerto 3000, donde la app escuchará
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/server.js"]
