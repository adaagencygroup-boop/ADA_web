<# : batch portion
@IF "%MVNWArg0Name%"=="" (SET MVNWArg0Name=%~nx0)
@SET MVNCMD=
@SET MVNWPSError=
@SET MVNWPSModulePSave=%PSModulePath%
@SET PSModulePath=
@FOR /F "usebackq tokens=1* delims==" %%A IN (`powershell -noprofile "& {$ScriptDir='%~dp0'; $Script='%MVNWArg0Name%'; icm -ScriptBlock ([Scriptblock]::Create((Get-Content -Raw '%~f0'))) -NoNewScope}"`) DO @(
  IF "%%A"=="MVN_CMD" (set MVNCMD=%%B) ELSE IF "%%B"=="" (echo %%A) ELSE (echo %%A=%%B)
)
@SET PSModulePath=%MVNWPSModulePSave%
@SET MVNWPSModulePSave=
@SET MVNWArg0Name=
@SET MVNW_USERNAME=
@SET MVNW_PASSWORD=
@IF NOT "%MVNCMD%"=="" ("%MVNCMD%" %*)
@echo Cannot Start Maven From Wrapper >&2 && exit /b 1
@GOTO :EOF
: end batch / begin powershell #>
$ErrorActionPreference = "Stop"
if ($env:MVNW_VERBOSE -eq "true") {
  $VerbosePreference = "Continue"
}
$distributionUrl = (Get-Content -Raw "$ScriptDir/.mvn/wrapper/maven-wrapper.properties" | ConvertFrom-StringData).distributionUrl
if (!$distributionUrl) {
  Write-Error "Cannot Read distributionUrl Property In $ScriptDir/.mvn/wrapper/maven-wrapper.properties"
}
switch -wildcard -casesensitive ( $($distributionUrl -replace '^.*/','') ) {
  "maven-mvnd-*" {
    $UseMVND = $true
    $distributionUrl = $distributionUrl -replace '-bin\.[^.]*$',"-windows-amd64.zip"
    $MVNCMD = "mvnd.cmd"
    break
  }
  default {
    $UseMVND = $false
    $MVNCMD = $Script -replace '^mvnw','mvn'
    break
  }
}
if ($env:MVNW_REPOURL) {
  $MVNWRepoPattern = if ($UseMVND -eq $False) { "/org/apache/maven/" } else { "/maven/mvnd/" }
  $distributionUrl = "$env:MVNW_REPOURL$MVNWRepoPattern$($distributionUrl -replace "^.*$MVNWRepoPattern",'')"
}
$distributionUrlName = $distributionUrl -replace '^.*/',''
$distributionUrlNameMain = $distributionUrlName -replace '\.[^.]*$','' -replace '-bin$',''
$MavenM2Path = "$HOME/.m2"
if ($env:MAVEN_USER_HOME) {
  $MavenM2Path = "$env:MAVEN_USER_HOME"
}
if (-not (Test-Path -Path $MavenM2Path)) {
  New-Item -Path $MavenM2Path -ItemType Directory | Out-Null
}
$MavenWrapperDists = $null
if ((Get-Item $MavenM2Path).Target[0] -eq $null) {
  $MavenWrapperDists = "$MavenM2Path/wrapper/dists"
} else {
  $MavenWrapperDists = (Get-Item $MavenM2Path).Target[0] + "/wrapper/dists"
}
$MavenHomeParent = "$MavenWrapperDists/$distributionUrlNameMain"
$MavenHomeName = ([System.Security.Cryptography.SHA256]::Create().ComputeHash([byte[]][char[]]$distributionUrl) | ForEach-Object {$_.ToString("x2")}) -join ''
$MavenHome = "$MavenHomeParent/$MavenHomeName"
if (Test-Path -Path "$MavenHome" -PathType Container) {
  Write-Verbose "Found Existing MAVEN_HOME At $MavenHome"
  Write-Output "MVN_CMD=$MavenHome/bin/$MVNCMD"
  exit $?
}
if (! $distributionUrlNameMain -or ($distributionUrlName -eq $distributionUrlNameMain)) {
  Write-Error "distributionUrl Is Not Valid - Must End With *-bin.zip But Found $distributionUrl"
}
$TMPDownloadDirHolder = New-TemporaryFile
$TMPDownloadDir = New-Item -Itemtype Directory -Path "$TMPDownloadDirHolder.dir"
$TMPDownloadDirHolder.Delete() | Out-Null
trap {
  if ($TMPDownloadDir.Exists) {
    try { Remove-Item $TMPDownloadDir -Recurse -Force | Out-Null }
    catch { Write-Warning "Cannot Remove $TMPDownloadDir" }
  }
}
New-Item -Itemtype Directory -Path "$MavenHomeParent" -Force | Out-Null
Write-Verbose "Could Not Find MAVEN_HOME > Downloading & Installing It"
Write-Verbose "Downloading From: $distributionUrl"
Write-Verbose "Downloading To: $TMPDownloadDir/$distributionUrlName"
$WebClient = New-Object System.Net.WebClient
if ($env:MVNW_USERNAME -and $env:MVNW_PASSWORD) {
  $WebClient.Credentials = New-Object System.Net.NetworkCredential($env:MVNW_USERNAME, $env:MVNW_PASSWORD)
}
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$WebClient.DownloadFile($distributionUrl, "$TMPDownloadDir/$distributionUrlName") | Out-Null
$distributionSha256Sum = (Get-Content -Raw "$ScriptDir/.mvn/wrapper/maven-wrapper.properties" | ConvertFrom-StringData).distributionSha256Sum
if ($distributionSha256Sum) {
  if ($UseMVND) {
    Write-Error "Checksum Validation Is Not Supported For maven-mvnd`nPlease Disable Validation By Removing 'distributionSha256Sum' From Your maven-wrapper.properties"
  }
  Import-Module $PSHOME\Modules\Microsoft.PowerShell.Utility -Function Get-FileHash
  if ((Get-FileHash "$TMPDownloadDir/$distributionUrlName" -Algorithm SHA256).Hash.ToLower() -ne $distributionSha256Sum) {
    Write-Error "Error: Failed To Validate Maven Distribution SHA-256, Your Maven Distribution Might Be Compromised If You Updated Your Maven Version, You Need To Update The Specified distributionSha256Sum Property"
  }
}
Expand-Archive "$TMPDownloadDir/$distributionUrlName" -DestinationPath "$TMPDownloadDir" | Out-Null
$actualDistributionDir = ""
$expectedPath = Join-Path "$TMPDownloadDir" "$distributionUrlNameMain"
$expectedMVNPath = Join-Path "$expectedPath" "bin/$MVNCMD"
if ((Test-Path -Path $expectedPath -PathType Container) -and (Test-Path -Path $expectedMVNPath -PathType Leaf)) {
  $actualDistributionDir = $distributionUrlNameMain
}
if (!$actualDistributionDir) {
  Get-ChildItem -Path "$TMPDownloadDir" -Directory | ForEach-Object {
    $testPath = Join-Path $_.FullName "bin/$MVNCMD"
    if (Test-Path -Path $testPath -PathType Leaf) {
      $actualDistributionDir = $_.Name
    }
  }
}
if (!$actualDistributionDir) {
  Write-Error "Could Not Find Maven Distribution Directory In Extracted Archive"
}
Write-Verbose "Found Extracted Maven Distribution Directory: $actualDistributionDir"
Rename-Item -Path "$TMPDownloadDir/$actualDistributionDir" -NewName $MavenHomeName | Out-Null
try {
  Move-Item -Path "$TMPDownloadDir/$MavenHomeName" -Destination $MavenHomeParent | Out-Null
} catch {
  if (! (Test-Path -Path "$MavenHome" -PathType Container)) {
    Write-Error "Failed To Move MAVEN_HOME"
  }
} finally {
  try { Remove-Item $TMPDownloadDir -Recurse -Force | Out-Null }
  catch { Write-Warning "Cannot Remove $TMPDownloadDir" }
}
Write-Output "MVN_CMD=$MavenHome/bin/$MVNCMD"