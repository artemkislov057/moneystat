rem build frontend
cd frontend
call npm i
call npm run build

rem build backend
cd ..
dotnet build backend\MoneyStat.WebApi\MoneyStat.WebApi.Api\MoneyStat.WebApi.Api.csproj -o build\WebApi

rem copy frontend build to backend
xcopy frontend\build build\WebApi\wwwroot /S /Y /I

rem start app
cd build\WebApi
start MoneyStat.WebApi.Api.exe

cd ..