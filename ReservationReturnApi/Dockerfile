FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["ReservationReturnApi.csproj", "./"]

RUN dotnet restore

COPY . .

RUN dotnet publish "ReservationReturnApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:6005

EXPOSE 6005

ENTRYPOINT ["dotnet", "ReservationReturnApi.dll"]