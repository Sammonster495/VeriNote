# Build the Next.js app
FROM node:18.17.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Set up the Python environment
FROM python:3.11.3-slim
WORKDIR /app
COPY --from=build-stage /app/.next ./.next
COPY ./api ./api

# Install Rust and Cargo
RUN apt-get update && \
    apt-get install -y curl && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    export PATH="$HOME/.cargo/bin:$PATH" && \
    rustup install stable && \
    rustup default stable

# Set Rust and Cargo environment variables
ENV PATH="/root/.cargo/bin:$PATH"

# Install pip-tools
RUN pip install pip-tools

# Compile requirements
COPY ./api/requirements.in .
RUN pip-compile requirements.in

# Install Python dependencies
RUN pip-sync

# Install the missing library
RUN apt-get update && apt-get install -y libgl1-mesa-glx libglib2.0-0

# Copy the real_500.jpg file
COPY ./api/real_500.jpg ./api/real_500.jpg

# Set FLASK_APP environment variable
ENV FLASK_APP=api/app.py

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
