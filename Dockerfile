# Gunakan image Node.js
FROM node:20

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file dari proyek ke dalam container
COPY . .

# Expose port yang digunakan oleh Vite (default: 5173)
EXPOSE 5173

# Jalankan aplikasi dengan vite
CMD ["npm", "run", "dev"]
