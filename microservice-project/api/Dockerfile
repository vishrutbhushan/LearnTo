# Use an official OpenJDK 23 image as a parent image
FROM openjdk:23-slim

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy the API project file
COPY . .

# Build the API project
RUN mvn clean

# Build the API project
RUN mvn package

# Expose the port the API runs on
EXPOSE 8080

# Define the command to run the API
CMD ["java", "-jar", "target/api-1.0-SNAPSHOT.jar"]