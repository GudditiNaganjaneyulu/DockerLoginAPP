# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Define environment variables for MySQL connection
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=mydb

# Start the app
CMD ["npm", "start"]
