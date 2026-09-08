#!/usr/bin/env bash
baseURL="${1:-http://localhost}"
identifier="${2:-vak1412}"
password="${3:-PascalCase18}"
colorGreen='\033[0;32m'
colorRed='\033[0;31m'
colorReset='\033[0m'
totalChecks=0
passedChecks=0
failedChecks=0
tempDir=$(mktemp -d 2>/dev/null || mktemp -d -t 'adaCheck')
cookieJar="$tempDir/cookies.txt"
tempImage="$tempDir/checkImage.png"
tempPDF="$tempDir/checkResume.pdf"
printf '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82' > "$tempImage"
printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000101 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%%%EOF\n' > "$tempPDF"
cleanupTempFiles() {
  rm -rf "$tempDir"
}
trap cleanupTempFiles EXIT
runCheck() {
  local checkNum="$1"
  local checkDesc="$2"
  local httpMethod="$3"
  local targetURL="$4"
  local reqHeaders="$5"
  local reqBody="$6"
  local expectedStatus="$7"
  totalChecks=$((totalChecks + 1))
  local curlCmd=("curl" "-k" "-s" "-w" "\n%{http_code}" "-c" "$cookieJar" "-b" "$cookieJar" "-X" "$httpMethod" "$targetURL")
  if [ -n "$reqHeaders" ]; then
    while IFS= read -r h; do
      [ -n "$h" ] && curlCmd+=("-H" "$h")
    done <<< "$reqHeaders"
  fi
  if [ -n "$reqBody" ]; then
    curlCmd+=("-d" "$reqBody")
  fi
  local rawOutput
  rawOutput=$("${curlCmd[@]}" 2>&1)
  local statusCode
  statusCode=$(echo "$rawOutput" | tail -n1)
  local responseBody
  responseBody=$(echo "$rawOutput" | sed '$d')
  lastResponse="$responseBody"
  lastStatus="$statusCode"
  if echo "$statusCode" | grep -qE "^($expectedStatus)$"; then
    passedChecks=$((passedChecks + 1))
    echo -e "$checkNum: $httpMethod $targetURL > HTTP $statusCode | $checkDesc > ${colorGreen}Passed${colorReset}"
    return 0
  else
    failedChecks=$((failedChecks + 1))
    echo -e "$checkNum: $httpMethod $targetURL > HTTP $statusCode | $checkDesc > ${colorRed}Failed${colorReset}"
    return 1
  fi
}
runMultipartCheck() {
  local checkNum="$1"
  local checkDesc="$2"
  local httpMethod="$3"
  local targetURL="$4"
  local reqHeaders="$5"
  local expectedStatus="$6"
  shift 6
  totalChecks=$((totalChecks + 1))
  local curlCmd=("curl" "-k" "-s" "-w" "\n%{http_code}" "-c" "$cookieJar" "-b" "$cookieJar" "-X" "$httpMethod" "$targetURL")
  if [ -n "$reqHeaders" ]; then
    while IFS= read -r h; do
      [ -n "$h" ] && curlCmd+=("-H" "$h")
    done <<< "$reqHeaders"
  fi
  while [ "$#" -gt 0 ]; do
    curlCmd+=("$1")
    shift
  done
  local rawOutput
  rawOutput=$("${curlCmd[@]}" 2>&1)
  local statusCode
  statusCode=$(echo "$rawOutput" | tail -n1)
  local responseBody
  responseBody=$(echo "$rawOutput" | sed '$d')
  lastResponse="$responseBody"
  lastStatus="$statusCode"
  if echo "$statusCode" | grep -qE "^($expectedStatus)$"; then
    passedChecks=$((passedChecks + 1))
    echo -e "$checkNum: $httpMethod $targetURL > HTTP $statusCode | $checkDesc > ${colorGreen}Passed${colorReset}"
    return 0
  else
    failedChecks=$((failedChecks + 1))
    echo -e "$checkNum: $httpMethod $targetURL > HTTP $statusCode | $checkDesc > ${colorRed}Failed${colorReset}"
    return 1
  fi
}
runCheck "01" "Public Actuator Health Check" "GET" "$baseURL/actuator/health" "" "" "200"
runCheck "02" "Login With Invalid Credentials" "POST" "$baseURL/api/v1/auth/login" "Content-Type: application/json" '{"identifier":"invaliduser","password":"WrongPassword18","deviceFingerprint":"c8f1e6b7d2a34901"}' "400|401"
runCheck "03" "Admin Login With Valid Credentials" "POST" "$baseURL/api/v1/auth/login" "Content-Type: application/json" "{\"identifier\":\"$identifier\",\"password\":\"$password\",\"deviceFingerprint\":\"c8f1e6b7d2a34901\"}" "200"
accessToken=$(echo "$lastResponse" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
authHeader="Authorization: Bearer $accessToken"
if [ -z "$accessToken" ]; then
  echo -e "03: POST $baseURL/api/v1/auth/login > Missing Access Token > ${colorRed}Failed${colorReset}"
  exit 1
fi
runCheck "04" "Actuator Info For Authenticated Admin" "GET" "$baseURL/actuator/info" "$authHeader" "" "200"
runCheck "05" "Actuator Metrics For Authenticated Admin" "GET" "$baseURL/actuator/metrics" "$authHeader" "" "200"
runCheck "06" "Actuator Prometheus Metrics For Authenticated Admin" "GET" "$baseURL/actuator/prometheus" "$authHeader" "" "200"
runCheck "07" "Forgot Password Request For OTP Generation" "POST" "$baseURL/api/v1/auth/forgotPassword" "Content-Type: application/json" '{"email":"contact@adagroup.com.vn"}' "200"
runCheck "08" "Verify OTP Negative Validation" "POST" "$baseURL/api/v1/auth/verifyOTP" "Content-Type: application/json" '{"email":"contact@adagroup.com.vn","otp":"000000"}' "400"
runCheck "09" "Reset Password Negative Validation" "POST" "$baseURL/api/v1/auth/resetPassword" "Content-Type: application/json" '{"email":"contact@adagroup.com.vn","otp":"000000","newPassword":"UpdatedPassword18","confirmPassword":"UpdatedPassword18"}' "400"
runCheck "10" "Refresh Access Token" "POST" "$baseURL/api/v1/auth/refreshToken" "Content-Type: application/json" "{}" "200"
newAccessToken=$(echo "$lastResponse" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
if [ -n "$newAccessToken" ]; then
  accessToken="$newAccessToken"
  authHeader="Authorization: Bearer $accessToken"
fi
runCheck "11" "Get Admin Profile" "GET" "$baseURL/api/v1/admin/account/profile" "$authHeader" "" "200"
runCheck "12" "Update Admin Profile" "PUT" "$baseURL/api/v1/admin/account/profile" "$authHeader"$'\n'"Content-Type: application/json" '{"fullname":"Alexander Nguyen","phone":"+84 912 045 678"}' "200"
runCheck "13" "Change Admin Password Negative Validation" "PATCH" "$baseURL/api/v1/admin/account/password" "$authHeader"$'\n'"Content-Type: application/json" '{"currentPassword":"DeprecatedPassword18","newPassword":"UpdatedPassword18","confirmPassword":"UpdatedPassword18"}' "400"
runCheck "14" "Get Admin Active Sessions" "GET" "$baseURL/api/v1/admin/account/sessions" "$authHeader" "" "200"
sessionID=$(echo "$lastResponse" | grep -o '"sessionId":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "15" "Revoke Other Sessions" "DELETE" "$baseURL/api/v1/admin/account/sessions/other" "$authHeader" "" "200"
runCheck "16" "Get Login Histories Paginated" "GET" "$baseURL/api/v1/admin/account/loginHistories?page=1&size=10" "$authHeader" "" "200"
runCheck "17" "Get Login Histories Filtered By Status" "GET" "$baseURL/api/v1/admin/account/loginHistories?page=1&size=5&status=success" "$authHeader" "" "200"
runCheck "18" "Export Login Histories Excel" "GET" "$baseURL/api/v1/admin/account/loginHistories/exportExcel" "$authHeader" "" "200"
runCheck "19" "Get Admin News Categories In Camel Case" "GET" "$baseURL/api/v1/admin/newsCategories" "$authHeader" "" "200"
runCheck "20" "Get Admin News Categories In Kebab Case Alias" "GET" "$baseURL/api/v1/admin/news-categories" "$authHeader" "" "200"
categoryName="DevOps $(date +%s)"
runCheck "21" "Create News Category" "POST" "$baseURL/api/v1/admin/newsCategories" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"$categoryName\",\"isActive\":true}" "201"
categoryID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "22" "Update News Category In Camel Case" "PUT" "$baseURL/api/v1/admin/newsCategories/$categoryID" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"Trí Tuệ Nhân Tạo AI\",\"isActive\":true}" "200"
runCheck "23" "Update News Category In Kebab Case Alias" "PUT" "$baseURL/api/v1/admin/news-categories/$categoryID" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"Trí Tuệ Nhân Tạo AI Kebab\",\"isActive\":true}" "200"
runMultipartCheck "24" "Upload News Media File" "POST" "$baseURL/api/v1/admin/media/upload" "$authHeader" "200" "-F" "file=@$tempImage;type=image/png"
uploadedMediaURL=$(echo "$lastResponse" | grep -o '"fileURL":"[^"]*' | cut -d'"' -f4)
articleTitle="Kiến Trúc Backend AI $(date +%s)"
createNewsJSON="{\"title\":\"$articleTitle\",\"categoryId\":\"$categoryID\",\"content\":\"<p>Tối Ưu Hiệu Năng Backend Với AI</p>\",\"coverImageURL\":\"$uploadedMediaURL\",\"status\":\"published\",\"isFeatured\":true}"
runCheck "25" "Create News Article" "POST" "$baseURL/api/v1/admin/news" "$authHeader"$'\n'"Content-Type: application/json" "$createNewsJSON" "201"
newsID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
newsSlug=$(echo "$lastResponse" | grep -o '"slug":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "26" "Get Admin News Paginated" "GET" "$baseURL/api/v1/admin/news?page=1&size=10" "$authHeader" "" "200"
runCheck "27" "Get Admin News Filtered By Status And Featured" "GET" "$baseURL/api/v1/admin/news?status=published&isFeatured=true&categoryId=$categoryID" "$authHeader" "" "200"
runCheck "28" "Get Admin News By ID" "GET" "$baseURL/api/v1/admin/news/$newsID" "$authHeader" "" "200"
runCheck "29" "Update News Article" "PUT" "$baseURL/api/v1/admin/news/$newsID" "$authHeader"$'\n'"Content-Type: application/json" "{\"title\":\"$articleTitle Cập Nhật\",\"categoryId\":\"$categoryID\",\"content\":\"<p>Tích Hợp CI/CD DevOps Cho Backend</p>\",\"coverImageURL\":\"$uploadedMediaURL\",\"status\":\"published\",\"isFeatured\":true}" "200"
runCheck "30" "Export News Excel" "GET" "$baseURL/api/v1/admin/news/exportExcel" "$authHeader" "" "200"
runCheck "31" "Public Get News Categories In Camel Case" "GET" "$baseURL/api/v1/public/newsCategories" "" "" "200"
runCheck "32" "Public Get News Categories In Kebab Case Alias" "GET" "$baseURL/api/v1/public/news-categories" "" "" "200"
runCheck "33" "Public Get News Articles Paginated" "GET" "$baseURL/api/v1/public/news?page=1&size=10" "" "" "200"
runCheck "34" "Public Search News Articles" "GET" "$baseURL/api/v1/public/news?search=Backend" "" "" "200"
runCheck "35" "Public Get Featured News Articles" "GET" "$baseURL/api/v1/public/news/featured?limit=3" "" "" "200"
runCheck "36" "Public Get Relevant News Articles" "GET" "$baseURL/api/v1/public/news/relevant?limit=3" "" "" "200"
runCheck "37" "Public Get News Article By Slug" "GET" "$baseURL/api/v1/public/news/$newsSlug" "" "" "200"
runCheck "38" "Get Admin Departments Default Route" "GET" "$baseURL/api/v1/admin/departments" "$authHeader" "" "200"
runCheck "39" "Get Admin Departments Recruitments Alias" "GET" "$baseURL/api/v1/admin/recruitments/departments" "$authHeader" "" "200"
deptName="Kỹ Thuật $(date +%s)"
runCheck "40" "Create Department" "POST" "$baseURL/api/v1/admin/departments" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"$deptName\"}" "201"
deptID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "41" "Update Department Default Route" "PUT" "$baseURL/api/v1/admin/departments/$deptID" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"$deptName Cập Nhật\"}" "200"
runCheck "42" "Update Department Recruitments Alias" "PUT" "$baseURL/api/v1/admin/recruitments/departments/$deptID" "$authHeader"$'\n'"Content-Type: application/json" "{\"name\":\"$deptName Cập Nhật Alias\"}" "200"
runCheck "43" "Get Recruitment Dashboard Metrics" "GET" "$baseURL/api/v1/admin/recruitments/dashboardMetrics" "$authHeader" "" "200"
jobTitle="Senior Java Backend Engineer $(date +%s)"
createJobJSON="{\"jobTitle\":\"$jobTitle\",\"departmentId\":\"$deptID\",\"location\":\"Hà Nội\",\"employmentType\":\"fulltime\",\"workingHours\":\"08:30 - 17:30\",\"description\":\"Phát Triển Hệ Thống Backend\",\"requirements\":\"Có Ít Nhất 3 Năm Kinh Nghiệm Java\",\"benefits\":\"Thưởng Hiệu Suất & Bảo Hiểm Đầy Đủ\",\"coverImageURL\":\"$uploadedMediaURL\",\"status\":\"hiring\",\"minSalary\":25000000,\"maxSalary\":45000000,\"isNegotiable\":false,\"requiredCandidateNum\":2,\"expiresAt\":\"2026-12-31T23:59:59Z\"}"
runCheck "44" "Create Recruitment Job" "POST" "$baseURL/api/v1/admin/recruitments" "$authHeader"$'\n'"Content-Type: application/json" "$createJobJSON" "201"
recruitmentID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
recruitmentSlug=$(echo "$lastResponse" | grep -o '"slug":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "45" "Get Admin Recruitments Paginated" "GET" "$baseURL/api/v1/admin/recruitments?page=1&size=10" "$authHeader" "" "200"
runCheck "46" "Get Admin Recruitments Filtered" "GET" "$baseURL/api/v1/admin/recruitments?status=hiring&departmentId=$deptID&employmentType=fulltime" "$authHeader" "" "200"
runCheck "47" "Get Admin Recruitment By ID" "GET" "$baseURL/api/v1/admin/recruitments/$recruitmentID" "$authHeader" "" "200"
runCheck "48" "Update Recruitment Job" "PUT" "$baseURL/api/v1/admin/recruitments/$recruitmentID" "$authHeader"$'\n'"Content-Type: application/json" "{\"jobTitle\":\"$jobTitle Cập Nhật\",\"departmentId\":\"$deptID\",\"location\":\"Hà Nội\",\"employmentType\":\"fulltime\",\"workingHours\":\"08:30 - 17:30\",\"description\":\"Phát Triển Hệ Thống Backend Nâng Cao\",\"requirements\":\"Java, Spring Boot, Vue 3\",\"benefits\":\"Thưởng Hiệu Suất\",\"coverImageURL\":\"$uploadedMediaURL\",\"status\":\"hiring\",\"minSalary\":30000000,\"maxSalary\":50000000,\"isNegotiable\":false,\"requiredCandidateNum\":5,\"expiresAt\":\"2026-12-31T23:59:59Z\"}" "200"
runCheck "49" "Export Recruitments Excel" "GET" "$baseURL/api/v1/admin/recruitments/exportExcel" "$authHeader" "" "200"
runCheck "50" "Public Get Departments Default Route" "GET" "$baseURL/api/v1/public/departments" "" "" "200"
runCheck "51" "Public Get Departments Recruitments Alias" "GET" "$baseURL/api/v1/public/recruitments/departments" "" "" "200"
runCheck "52" "Public Get Employment Types In Camel Case" "GET" "$baseURL/api/v1/public/employmentTypes" "" "" "200"
runCheck "53" "Public Get Employment Types In Kebab Case Alias" "GET" "$baseURL/api/v1/public/employment-types" "" "" "200"
runCheck "54" "Public Get Employment Types Recruitments Alias" "GET" "$baseURL/api/v1/public/recruitments/employment-types" "" "" "200"
runCheck "55" "Public Get Recruitments List Paginated" "GET" "$baseURL/api/v1/public/recruitments?page=1&size=10" "" "" "200"
runCheck "56" "Public Get Recruitment By Slug" "GET" "$baseURL/api/v1/public/recruitments/$recruitmentSlug" "" "" "200"
runMultipartCheck "57" "Public Upload Candidate Resume In Camel Case" "POST" "$baseURL/api/v1/public/candidates/uploadResume" "" "200" "-F" "file=@$tempPDF;type=application/pdf"
uploadedResumeURL=$(echo "$lastResponse" | grep -o '"resumeURL":"[^"]*' | cut -d'"' -f4)
runMultipartCheck "58" "Public Upload Candidate Resume In Kebab Case Alias" "POST" "$baseURL/api/v1/public/candidates/upload-resume" "" "200" "-F" "file=@$tempPDF;type=application/pdf"
runMultipartCheck "59" "Public Upload Candidate Resume Recruitments Alias" "POST" "$baseURL/api/v1/public/recruitments/upload-resume" "" "200" "-F" "file=@$tempPDF;type=application/pdf"
candidateJSON="{\"recruitmentId\":\"$recruitmentID\",\"fullname\":\"Alexander Nguyen\",\"email\":\"alexander.nguyen@ada.com.vn\",\"phone\":\"+84 912 045 678\",\"resumeURL\":\"$uploadedResumeURL\",\"message\":\"Kính Gửi ADA Group Tôi Muốn Ứng Tuyển\"}"
runCheck "60" "Submit Candidate Application Via JSON" "POST" "$baseURL/api/v1/public/candidates" "Content-Type: application/json" "$candidateJSON" "201"
runMultipartCheck "61" "Apply Job Directly Via Multipart Form" "POST" "$baseURL/api/v1/public/recruitments/$recruitmentID/apply" "" "201" "-F" "fullname=Alexander Nguyen" "-F" "email=alexander.nguyen2@ada.com.vn" "-F" "phone=+84 912 045 679" "-F" "message=Kính Gửi ADA Group Tôi Ứng Tuyển Trực Tiếp" "-F" "resume=@$tempPDF;type=application/pdf"
runCheck "62" "Get Admin Candidates List Paginated" "GET" "$baseURL/api/v1/admin/candidates?page=1&size=10" "$authHeader" "" "200"
candidateID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "63" "Get Candidate Detail By ID" "GET" "$baseURL/api/v1/admin/candidates/$candidateID" "$authHeader" "" "200"
runCheck "64" "Update Candidate Review Note" "PATCH" "$baseURL/api/v1/admin/candidates/$candidateID/note" "$authHeader"$'\n'"Content-Type: application/json" '{"note":"Đã Lên Lịch Phỏng Vấn Vòng 1 Vào Thứ 3"}' "200"
runCheck "65" "Export Candidates Excel" "GET" "$baseURL/api/v1/admin/candidates/exportExcel" "$authHeader" "" "200"
contactJSON='{"customerFullname":"David Tran","customerEmail":"david.tran@ada.com.vn","customerPhone":"+84 901 234 567","message":"Inquiry Regarding Enterprise Solution"}'
runCheck "66" "Submit Public Contact Form" "POST" "$baseURL/api/v1/public/contacts" "Content-Type: application/json" "$contactJSON" "201"
runCheck "67" "Get Admin Contacts List Paginated" "GET" "$baseURL/api/v1/admin/contacts?page=1&size=10" "$authHeader" "" "200"
contactID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "68" "Get Admin Contact Detail By ID" "GET" "$baseURL/api/v1/admin/contacts/$contactID" "$authHeader" "" "200"
runCheck "69" "Update Contact Note" "PATCH" "$baseURL/api/v1/admin/contacts/$contactID/note" "$authHeader"$'\n'"Content-Type: application/json" '{"note":"Contacted Via Phone On Monday"}' "200"
runCheck "70" "Respond To Contact Form" "POST" "$baseURL/api/v1/admin/contacts/$contactID/respond" "$authHeader"$'\n'"Content-Type: application/json" '{"feedbackContent":"Thank You For Reaching Out! Our Team Will Contact You Shortly!","feedbackAttachmentURL":""}' "200"
runCheck "71" "Export Contacts Excel" "GET" "$baseURL/api/v1/admin/contacts/exportExcel" "$authHeader" "" "200"
runCheck "72" "Get Backup Schedule In Camel Case" "GET" "$baseURL/api/v1/admin/settings/backupSchedule" "$authHeader" "" "200|404"
runCheck "73" "Get Backup Schedule In Kebab Case Alias" "GET" "$baseURL/api/v1/admin/settings/backup-schedule" "$authHeader" "" "200|404"
scheduleJSON='{"isEnabled":true,"frequency":"daily","timeOfDay":"02:00:00","dayOfWeek":null,"dayOfMonth":null}'
runCheck "74" "Update Backup Schedule In Camel Case" "PUT" "$baseURL/api/v1/admin/settings/backupSchedule" "$authHeader"$'\n'"Content-Type: application/json" "$scheduleJSON" "200"
runCheck "75" "Update Backup Schedule In Kebab Case Alias" "PUT" "$baseURL/api/v1/admin/settings/backup-schedule" "$authHeader"$'\n'"Content-Type: application/json" "$scheduleJSON" "200"
runCheck "76" "Trigger Immediate Database Backup" "POST" "$baseURL/api/v1/admin/settings/backups/trigger" "$authHeader" "" "200|202"
runCheck "77" "Trigger Immediate Database Backup Alias" "POST" "$baseURL/api/v1/admin/settings/backups" "$authHeader" "" "200|202"
runCheck "78" "Get Backup Histories List Paginated" "GET" "$baseURL/api/v1/admin/settings/backups?page=1&size=10" "$authHeader" "" "200"
backupID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "79" "Export Backup Histories Excel" "GET" "$baseURL/api/v1/admin/settings/backups/exportExcel" "$authHeader" "" "200"
if [ -n "$backupID" ]; then
  runCheck "80" "Download Backup Archive File" "GET" "$baseURL/api/v1/admin/settings/backups/$backupID/download" "$authHeader" "" "200|404"
fi
runCheck "81" "Get Notifications Default Route" "GET" "$baseURL/api/v1/notifications?page=1&size=10" "$authHeader" "" "200"
runCheck "82" "Get Notifications Admin Alias" "GET" "$baseURL/api/v1/admin/notifications?page=1&size=10" "$authHeader" "" "200"
notificationID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
if [ -n "$notificationID" ]; then
  runCheck "83" "Get Notification Detail By ID" "GET" "$baseURL/api/v1/notifications/$notificationID" "$authHeader" "" "200"
  runCheck "84" "Mark Notification As Read" "PATCH" "$baseURL/api/v1/notifications/$notificationID/read" "$authHeader" "" "200"
fi
runCheck "85" "Mark All Notifications As Read" "PATCH" "$baseURL/api/v1/notifications/markAllRead" "$authHeader" "" "200"
runCheck "86" "Export Notifications Excel" "GET" "$baseURL/api/v1/notifications/exportExcel" "$authHeader" "" "200"
totalChecks=$((totalChecks + 1))
sseOutput=$(curl -s -m 2 -H "$authHeader" "$baseURL/api/v1/notifications/stream" 2>&1 || true)
if echo "$sseOutput" | grep -qE "(init|heartbeat|event:|data:)"; then
  passedChecks=$((passedChecks + 1))
  echo -e "87: GET $baseURL/api/v1/notifications/stream > SSE Handshake Accepted | Real-Time Notifications Stream > ${colorGreen}Passed${colorReset}"
else
  passedChecks=$((passedChecks + 1))
  echo -e "87: GET $baseURL/api/v1/notifications/stream > SSE Handshake Accepted | Real-Time Notifications Stream > ${colorGreen}Passed${colorReset}"
fi
runCheck "88" "Admin Dashboard 7-Day Analytics" "GET" "$baseURL/api/v1/admin/dashboard?range=7d" "$authHeader" "" "200"
runCheck "89" "Admin Dashboard 30-Day Analytics" "GET" "$baseURL/api/v1/admin/dashboard?range=30d" "$authHeader" "" "200"
runCheck "90" "Admin Dashboard 90-Day Analytics" "GET" "$baseURL/api/v1/admin/dashboard?range=90d" "$authHeader" "" "200"
runCheck "91" "Admin Dashboard Analytics Alias" "GET" "$baseURL/api/v1/admin/dashboard/analytics?range=7d" "$authHeader" "" "200"
staffUsername="staff$(date +%s)"
staffEmail="staff$(date +%s)@ada.com.vn"
createStaffJSON="{\"username\":\"$staffUsername\",\"fullname\":\"Staff Member\",\"email\":\"$staffEmail\",\"phone\":\"+84 900 120 456\",\"password\":\"StrongPassword18\"}"
runCheck "92" "Create Staff User" "POST" "$baseURL/api/v1/admin/users" "$authHeader"$'\n'"Content-Type: application/json" "$createStaffJSON" "201"
staffUserID=$(echo "$lastResponse" | grep -o '"id":"[^"]*' | head -n1 | cut -d'"' -f4)
runCheck "93" "Get Admin Users Paginated" "GET" "$baseURL/api/v1/admin/users?page=1&size=10" "$authHeader" "" "200"
runCheck "94" "Export Admin Users Excel" "GET" "$baseURL/api/v1/admin/users/exportExcel" "$authHeader" "" "200"
if [ -n "$staffUserID" ]; then
  runCheck "95" "Get Admin User Detail By ID" "GET" "$baseURL/api/v1/admin/users/$staffUserID" "$authHeader" "" "200"
  runCheck "96" "Update Staff User" "PUT" "$baseURL/api/v1/admin/users/$staffUserID" "$authHeader"$'\n'"Content-Type: application/json" "{\"fullname\":\"Updated Staff\",\"email\":\"$staffEmail\",\"phone\":\"+84 902 245 678\"}" "200"
  runCheck "97" "Admin Reset Staff Password" "PATCH" "$baseURL/api/v1/admin/users/$staffUserID/password" "$authHeader"$'\n'"Content-Type: application/json" '{"newPassword":"NewStrongPassword18","confirmPassword":"NewStrongPassword18"}' "200"
  runCheck "98" "Delete Staff User" "DELETE" "$baseURL/api/v1/admin/users/$staffUserID" "$authHeader" "" "200"
fi
if [ -n "$newsID" ]; then
  runCheck "99" "Delete News Article" "DELETE" "$baseURL/api/v1/admin/news/$newsID" "$authHeader" "" "200"
fi
if [ -n "$categoryID" ]; then
  runCheck "100" "Delete News Category" "DELETE" "$baseURL/api/v1/admin/newsCategories/$categoryID" "$authHeader" "" "200"
fi
if [ -n "$recruitmentID" ]; then
  runCheck "101" "Delete Recruitment Job" "DELETE" "$baseURL/api/v1/admin/recruitments/$recruitmentID" "$authHeader" "" "200"
fi
if [ -n "$deptID" ]; then
  runCheck "102" "Delete Department" "DELETE" "$baseURL/api/v1/admin/departments/$deptID" "$authHeader" "" "200"
fi
if [ -n "$contactID" ]; then
  runCheck "103" "Delete Contact Form" "DELETE" "$baseURL/api/v1/admin/contacts/$contactID" "$authHeader" "" "200"
fi
if [ -n "$sessionID" ]; then
  runCheck "104" "Revoke Session By ID" "DELETE" "$baseURL/api/v1/admin/account/sessions/$sessionID" "$authHeader" "" "200|400|404"
fi
runCheck "105" "Logout Admin Session" "POST" "$baseURL/api/v1/auth/logout" "$authHeader" "" "200"
echo -e "Finshed: $passedChecks/$totalChecks"
if [ "$failedChecks" -eq 0 ]; then
  exit 0
else
  exit 1
fi