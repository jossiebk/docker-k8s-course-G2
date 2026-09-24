# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["UsersApi.csproj", "./"]
RUN dotnet restore

COPY . . 

RUN dotnet publish "UsersApi.csproj" -c Release -o /app/publish /p:UseAppHost=false


# Etapa de ejecucion
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as final

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:6001
EXPOSE 6001

ENTRYPOINT ["dotnet", "UsersApi.dll"]

