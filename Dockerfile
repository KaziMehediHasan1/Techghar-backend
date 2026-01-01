# 1. Base Image
FROM node:20-alpine

# 2. Working Directory
WORKDIR /app

# 3. Copy Package files
COPY package*.json ./

# 4. Install Dependencies
RUN npm install

# 5. Copy Source Code
COPY . .

# volume localhost er sathe sync korar jonno - annonimous volume
# VOLUME [ "/app/logs" ]



# 6. TypeScript ke Build kora (dist folder toiri hobe)
RUN npm run build

# 7. Port Expose
EXPOSE 5000

# Server start korar command
CMD ["npm", "run", "dev"]