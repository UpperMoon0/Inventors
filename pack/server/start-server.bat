@echo off
setlocal
set "NEOFORGE_VERSION=21.1.247"
set "INSTALLER=neoforge-%NEOFORGE_VERSION%-installer.jar"

if not exist "libraries\net\neoforged\neoforge\%NEOFORGE_VERSION%\win_args.txt" (
  echo Installing NeoForge %NEOFORGE_VERSION%...
  java -jar "%INSTALLER%" --installServer
  if errorlevel 1 exit /b %errorlevel%
)

java @user_jvm_args.txt @libraries/net/neoforged/neoforge/%NEOFORGE_VERSION%/win_args.txt nogui
