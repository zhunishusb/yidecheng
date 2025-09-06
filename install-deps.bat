@echo off
setlocal
set "NODE_EXE=c:\Users\ASUS\Desktop\qq bot\node\node-v20.10.0-win-x64\node.exe"
set "NPM_CLI_JS=c:\Users\ASUS\Desktop\qq bot\node\node-v20.10.0-win-x64\node_modules\npm\bin\npm-cli.js"
set "INSTALL_LOG=npm-install.log"
set "ERROR_LOG=npm-error.log"

echo [DEBUG] Batch file started > %INSTALL_LOG%
echo [DEBUG] Current directory: %CD% >> %INSTALL_LOG%
echo [DEBUG] NODE_EXE: %NODE_EXE% >> %INSTALL_LOG%
echo [DEBUG] NPM_CLI_JS: %NPM_CLI_JS% >> %INSTALL_LOG%

echo [DEBUG] Checking Node.js existence...
if not exist "%NODE_EXE%" (
    echo [ERROR] Node.js not found at: "%NODE_EXE%"
    echo [ERROR] Node.js not found at: "%NODE_EXE%" >> %INSTALL_LOG%
    exit /b 1
)

if not exist "%NPM_CLI_JS%" (
    echo [ERROR] npm CLI not found at: "%NPM_CLI_JS%"
    echo [ERROR] npm CLI not found at: "%NPM_CLI_JS%" >> %INSTALL_LOG%
    exit /b 1
)

echo Node.js version:
"%NODE_EXE%" --version >> %INSTALL_LOG% 2>&1
"%NODE_EXE%" --version || (
    echo [ERROR] Failed to get Node.js version
    exit /b 1
)

echo npm version:
"%NODE_EXE%" "%NPM_CLI_JS%" --version >> %INSTALL_LOG% 2>&1
"%NODE_EXE%" "%NPM_CLI_JS%" --version || (
    echo [ERROR] Failed to get npm version
    exit /b 1
)

echo [DEBUG] Executing npm install command...
echo [DEBUG] Command: "%NODE_EXE%" "%NPM_CLI_JS%" install --save-dev @cloudflare/next-on-pages --registry=https://registry.npmmirror.com --force --unsafe-perm --loglevel=error >> %INSTALL_LOG%

rem Execute npm install and capture output
"%NODE_EXE%" "%NPM_CLI_JS%" install --save-dev @cloudflare/next-on-pages --registry=https://registry.npmmirror.com --force --unsafe-perm --loglevel=error > npm-install-temp.log 2> %ERROR_LOG%
findstr /v /c:"deprecated" npm-install-temp.log >> %INSTALL_LOG%
del npm-install-temp.log

set "ERROR_LEVEL=%errorlevel%"
echo [DEBUG] npm install exit code: %ERROR_LEVEL% >> %INSTALL_LOG%
if %ERROR_LEVEL% equ 0 (
    echo Installation completed successfully
    echo Installation completed successfully >> %INSTALL_LOG%
    echo [DEBUG] Verifying package.json modification... >> %INSTALL_LOG%
    findstr /C:"@cloudflare/next-on-pages" package.json >> %INSTALL_LOG%
    if %errorlevel% equ 0 (
        echo [DEBUG] Package found in package.json >> %INSTALL_LOG%
    ) else (
        echo [DEBUG] Package NOT found in package.json >> %INSTALL_LOG%
        set "ERROR_LEVEL=1"
    )
) else (
    echo Installation failed with error code: %ERROR_LEVEL%
    echo Installation failed with error code: %ERROR_LEVEL% >> %INSTALL_LOG%
    echo [ERROR] See %ERROR_LOG% for details
    type %ERROR_LOG%
)

echo [DEBUG] Batch file completed >> %INSTALL_LOG%
exit /b %ERROR_LEVEL%
endlocal