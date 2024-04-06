# Build the Next.js app
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Set up the Python environment
FROM python:3.7-slim
WORKDIR /app
COPY --from=build-stage /app/out ./out
COPY ./api ./api
RUN pip install -r ./api/requirements.txt

# Copy the real_500.jpg file
COPY ./api/real_500.jpg ./api/real_500.jpg

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
