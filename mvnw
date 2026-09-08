#!/bin/sh
set -euf
[ "${MVNW_VERBOSE-}" != debug ] || set -x
NativePath() { printf %s\\n "$1"; }
case "$(uname)" in
CYGWIN* | MINGW*)
  [ -z "${JAVA_HOME-}" ] || JAVA_HOME="$(cygpath --unix "$JAVA_HOME")"
  NativePath() { cygpath --path --windows "$1"; }
  ;;
esac
SetJavaHome() {
  if [ -n "${JAVA_HOME-}" ]; then
    if [ -x "$JAVA_HOME/jre/sh/java" ]; then
      javaCMD="$JAVA_HOME/jre/sh/java"
      javacCMD="$JAVA_HOME/jre/sh/javac"
    else
      javaCMD="$JAVA_HOME/bin/java"
      javacCMD="$JAVA_HOME/bin/javac"
      if [ ! -x "$javaCMD" ] || [ ! -x "$javacCMD" ]; then
        echo "The JAVA_HOME Environment Variable Is Not Defined Correctly So mvnw Cannot Run" >&2
        echo "JAVA_HOME Is Set To \"$JAVA_HOME\" But \"\$JAVA_HOME/bin/java\" Or \"\$JAVA_HOME/bin/javac\" Does Not Exist" >&2
        return 1
      fi
    fi
  else
    javaCMD="$(
      'set' +e
      'unset' -f command 2>/dev/null
      'command' -v java
    )" || :
    javacCMD="$(
      'set' +e
      'unset' -f command 2>/dev/null
      'command' -v javac
    )" || :
    if [ ! -x "${javaCMD-}" ] || [ ! -x "${javacCMD-}" ]; then
      echo "The java/javac Command Does Not Exist In PATH Nor Is JAVA_HOME Set So mvnw Cannot Run" >&2
      return 1
    fi
  fi
}
HashString() {
  Str="${1:-}" H=0
  while [ -n "$Str" ]; do
    Char="${Str%"${Str#?}"}"
    H=$(((H * 31 + $(LC_CTYPE=C printf %d "'$Char")) % 4294967296))
    Str="${Str#?}"
  done
  printf %x\\n $H
}
Verbose() { :; }
[ "${MVNW_VERBOSE-}" != true ] || Verbose() { printf %s\\n "${1-}"; }
Die() {
  printf %s\\n "$1" >&2
  exit 1
}
Trim() {
  printf "%s" "${1}" | tr -d '[:space:]'
}
ScriptDir="$(dirname "$0")"
ScriptName="$(basename "$0")"
while IFS="=" read -r Key Value; do
  case "${Key-}" in
  distributionUrl) distributionUrl=$(Trim "${Value-}") ;;
  distributionSha256Sum) distributionSha256Sum=$(Trim "${Value-}") ;;
  esac
done <"$ScriptDir/.mvn/wrapper/maven-wrapper.properties"
[ -n "${distributionUrl-}" ] || Die "Cannot Read distributionUrl Property In $ScriptDir/.mvn/wrapper/maven-wrapper.properties"
case "${distributionUrl##*/}" in
maven-mvnd-*bin.*)
  MVNCMD=mvnd.sh MVNWRepoPattern=/maven/mvnd/
  case "${PROCESSOR_ARCHITECTURE-}${PROCESSOR_ARCHITEW6432-}:$(uname -a)" in
  *AMD64:CYGWIN* | *AMD64:MINGW*) distributionPlatform=windows-amd64 ;;
  :Darwin*x86_64) distributionPlatform=darwin-amd64 ;;
  :Darwin*arm64) distributionPlatform=darwin-aarch64 ;;
  :Linux*x86_64*) distributionPlatform=linux-amd64 ;;
  *)
    echo "Cannot Detect Native Platform For mvnd On $(uname)-$(uname -m) - Use Pure java Version" >&2
    distributionPlatform=linux-amd64
    ;;
  esac
  distributionUrl="${distributionUrl%-bin.*}-$distributionPlatform.zip"
  ;;
maven-mvnd-*) MVNCMD=mvnd.sh MVNWRepoPattern=/maven/mvnd/ ;;
*) MVNCMD="mvn${ScriptName#mvnw}" MVNWRepoPattern=/org/apache/maven/ ;;
esac
[ -z "${MVNW_REPOURL-}" ] || distributionUrl="$MVNW_REPOURL$MVNWRepoPattern${distributionUrl#*"$MVNWRepoPattern"}"
distributionUrlName="${distributionUrl##*/}"
distributionUrlNameMain="${distributionUrlName%.*}"
distributionUrlNameMain="${distributionUrlNameMain%-bin}"
MavenUserHome="${MAVEN_USER_HOME:-${HOME}/.m2}"
MavenHome="${MavenUserHome}/wrapper/dists/${distributionUrlNameMain-}/$(HashString "$distributionUrl")"
ExecMaven() {
  unset MVNW_VERBOSE MVNW_USERNAME MVNW_PASSWORD MVNW_REPOURL || :
  exec "$MavenHome/bin/$MVNCMD" "$@" || Die "Cannot Exec $MavenHome/bin/$MVNCMD"
}
if [ -d "$MavenHome" ]; then
  Verbose "Found Existing MAVEN_HOME At $MavenHome"
  ExecMaven "$@"
fi
case "${distributionUrl-}" in
*?-bin.zip | *?maven-mvnd-?*-?*.zip) ;;
*) Die "distributionUrl Is Not Valid - Must Match *-bin.zip Or maven-mvnd-*.zip But Found '${distributionUrl-}'" ;;
esac
if TMPDownloadDir="$(mktemp -d)" && [ -d "$TMPDownloadDir" ]; then
  Clean() { rm -rf -- "$TMPDownloadDir"; }
  trap Clean HUP INT TERM EXIT
else
  Die "Cannot Create Temp Dir"
fi
mkdir -p -- "${MavenHome%/*}"
Verbose "Could Not Find MAVEN_HOME > Downloading & Installing It"
Verbose "Downloading From: $distributionUrl"
Verbose "Downloading To: $TMPDownloadDir/$distributionUrlName"
if ! command -v unzip >/dev/null; then
  distributionUrl="${distributionUrl%.zip}.tar.gz"
  distributionUrlName="${distributionUrl##*/}"
fi
MVNWQuietWget=--quiet MVNWQuietCurl=--silent MVNWQuietUnzip=-q MVNWQuietTar=''
[ "${MVNW_VERBOSE-}" != true ] || MVNWQuietWget='' MVNWQuietCurl='' MVNWQuietUnzip='' MVNWQuietTar=v
case "${MVNW_PASSWORD:+has-password}" in
'') MVNW_USERNAME='' MVNW_PASSWORD='' ;;
has-password) [ -n "${MVNW_USERNAME-}" ] || MVNW_USERNAME='' MVNW_PASSWORD='' ;;
esac
if [ -z "${MVNW_USERNAME-}" ] && command -v wget >/dev/null; then
  Verbose "Found wget > Using wget"
  wget ${MVNWQuietWget:+"$MVNWQuietWget"} "$distributionUrl" -O "$TMPDownloadDir/$distributionUrlName" || Die "wget: Failed To Fetch $distributionUrl"
elif [ -z "${MVNW_USERNAME-}" ] && command -v curl >/dev/null; then
  Verbose "Found curl > Using curl"
  curl ${MVNWQuietCurl:+"$MVNWQuietCurl"} -f -L -o "$TMPDownloadDir/$distributionUrlName" "$distributionUrl" || Die "curl: Failed To Fetch $distributionUrl"
elif SetJavaHome; then
  Verbose "Falling Back To Use java To Download"
  javaSource="$TMPDownloadDir/Downloader.java"
  targetZip="$TMPDownloadDir/$distributionUrlName"
  cat >"$javaSource" <<-END
	public class Downloader extends java.net.Authenticator
	{
	  protected java.net.PasswordAuthentication getPasswordAuthentication()
	  {
	    return new java.net.PasswordAuthentication( System.getenv( "MVNW_USERNAME" ), System.getenv( "MVNW_PASSWORD" ).toCharArray() );
	  }
	  public static void main( String[] args ) throws Exception
	  {
	    setDefault( new Downloader() );
	    java.nio.file.Files.copy( java.net.URI.create( args[0] ).toURL().openStream(), java.nio.file.Paths.get( args[1] ).toAbsolutePath().normalize() );
	  }
	}
	END
  Verbose " - Compiling Downloader.java"
  "$(NativePath "$javacCMD")" "$(NativePath "$javaSource")" || Die "Failed To Compile Downloader.java"
  Verbose " - Running Downloader.java"
  "$(NativePath "$javaCMD")" -cp "$(NativePath "$TMPDownloadDir")" Downloader "$distributionUrl" "$(NativePath "$targetZip")"
fi
if [ -n "${distributionSha256Sum-}" ]; then
  distributionSha256Result=false
  if [ "$MVNCMD" = mvnd.sh ]; then
    echo "Checksum Validation Is Not Supported For maven-mvnd" >&2
    echo "Please Disable Validation By Removing 'distributionSha256Sum' From Your maven-wrapper.properties" >&2
    exit 1
  elif command -v sha256sum >/dev/null; then
    if echo "$distributionSha256Sum  $TMPDownloadDir/$distributionUrlName" | sha256sum -c - >/dev/null 2>&1; then
      distributionSha256Result=true
    fi
  elif command -v shasum >/dev/null; then
    if echo "$distributionSha256Sum  $TMPDownloadDir/$distributionUrlName" | shasum -a 256 -c >/dev/null 2>&1; then
      distributionSha256Result=true
    fi
  else
    echo "Checksum Validation Was Requested But Neither 'sha256sum' Or 'shasum' Are Available" >&2
    echo "Please Install Either Command Or Disable Validation By Removing 'distributionSha256Sum' From Your maven-wrapper.properties" >&2
    exit 1
  fi
  if [ $distributionSha256Result = false ]; then
    echo "Error: Failed To Validate Maven Distribution SHA-256, Your Maven Distribution Might Be Compromised" >&2
    echo "If You Updated Your Maven Version, You Need To Update The Specified distributionSha256Sum Property" >&2
    exit 1
  fi
fi
if command -v unzip >/dev/null; then
  unzip ${MVNWQuietUnzip:+"$MVNWQuietUnzip"} "$TMPDownloadDir/$distributionUrlName" -d "$TMPDownloadDir" || Die "Failed To Unzip"
else
  tar xzf${MVNWQuietTar:+"$MVNWQuietTar"} "$TMPDownloadDir/$distributionUrlName" -C "$TMPDownloadDir" || Die "Failed To Untar"
fi
actualDistributionDir=""
if [ -d "$TMPDownloadDir/$distributionUrlNameMain" ]; then
  if [ -f "$TMPDownloadDir/$distributionUrlNameMain/bin/$MVNCMD" ]; then
    actualDistributionDir="$distributionUrlNameMain"
  fi
fi
if [ -z "$actualDistributionDir" ]; then
  set +f
  for Dir in "$TMPDownloadDir"/*; do
    if [ -d "$Dir" ]; then
      if [ -f "$Dir/bin/$MVNCMD" ]; then
        actualDistributionDir="$(basename "$Dir")"
        break
      fi
    fi
  done
  set -f
fi
if [ -z "$actualDistributionDir" ]; then
  Verbose "Contents Of $TMPDownloadDir:"
  Verbose "$(ls -la "$TMPDownloadDir")"
  Die "Could Not Find Maven Distribution Directory In Extracted Archive"
fi
Verbose "Found Extracted Maven Distribution Directory: $actualDistributionDir"
printf %s\\n "$distributionUrl" >"$TMPDownloadDir/$actualDistributionDir/mvnw.url"
mv -- "$TMPDownloadDir/$actualDistributionDir" "$MavenHome" || [ -d "$MavenHome" ] || Die "Failed To Move MAVEN_HOME"
Clean || :
ExecMaven "$@"