# Stage 1: Build Angular frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY podfeeder-client/package*.json ./
RUN npm ci
COPY podfeeder-client/ ./
RUN npm run build

# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-builder
WORKDIR /app/backend
COPY PodFeeder.Api/*.csproj ./
RUN dotnet restore
COPY PodFeeder.Api/ ./
RUN dotnet publish -c Release -o /app/publish

# Stage 3: Runtime container
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Copy built backend
COPY --from=backend-builder /app/publish .

# Copy built frontend to wwwroot (where ASP.NET serves static files)
RUN mkdir -p wwwroot
COPY --from=frontend-builder /app/frontend/dist/podfeeder-client/browser/* wwwroot/

# Create data directory for database persistence
RUN mkdir -p /app/data

# Expose port 6969 (the hilarious port)
EXPOSE 6969

# Volume for database persistence
VOLUME ["/app/data"]

# Set environment variables
ENV ASPNETCORE_URLS=http://+:6969
ENV ASPNETCORE_ENVIRONMENT=Production
ENV DATABASE_PATH=/app/data/podcasts.db

# Run the API
ENTRYPOINT ["dotnet", "PodFeeder.Api.dll"]
