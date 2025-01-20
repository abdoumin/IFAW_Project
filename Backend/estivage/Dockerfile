# Use a base image with JBoss EAP 8.1
FROM quay.io/wildfly/wildfly:28.0.0.Final-jdk17

# Set the working directory
WORKDIR /opt/jboss

# Copy your WAR file to the deployments directory
COPY target/estivage.war /opt/jboss/standalone/deployments/

# Expose the application port
EXPOSE 8080

# Set environment variables if needed
# ENV JAVA_OPTS="-Xms512m -Xmx1024m"

# Start JBoss EAP
CMD ["/opt/jboss/bin/standalone.sh", "-b", "0.0.0.0"]