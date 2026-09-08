## REST API Reference

### /api/v1/auth

1. POST `/api/v1/auth/login`
   - Sent: `identifier`, `password`, `deviceFingerprint`, `deviceName` *(Optional)*, `deviceType` *(Optional)*, `rememberMe` *(Optional)*
   - Returned: `accessToken`, `tokenType`, `user` (`id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`), `Set-Cookie` (`refreshToken`)

2. POST `/api/v1/auth/forgotPassword`
   - Sent: `email`
   - Returned: `success`, `message`

3. POST `/api/v1/auth/verifyOTP`
   - Sent: `email`, `otp`
   - Returned: `success`, `message`

4. POST `/api/v1/auth/resetPassword`
   - Sent: `email`, `otp`, `newPassword`, `confirmPassword`
   - Returned: `success`, `message`

5. POST `/api/v1/auth/refreshToken`
   - Sent: `refreshToken` *(Cookie)*
   - Returned: `accessToken`, `tokenType`, `Set-Cookie` (`refreshToken`)

6. POST `/api/v1/auth/logout`
   - Sent: `refreshToken` *(Cookie)*
   - Returned: `success`, `message`, `Set-Cookie` (`refreshToken` *Max-Age: 0*)

---

### /api/v1/admin/account

7. GET `/api/v1/admin/account/profile`
   - Sent: *(None)*
   - Returned: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`

8. PUT `/api/v1/admin/account/profile`
   - Sent: `fullname` *(Optional)*, `phone` *(Optional)*
   - Returned: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`

9. PATCH `/api/v1/admin/account/password`
   - Sent: `currentPassword`, `newPassword`, `confirmPassword`
   - Returned: `success`, `message`

10. GET `/api/v1/admin/account/sessions`
    - Sent: *(None)*
    - Returned: `sessionId`, `deviceId`, `deviceName`, `deviceType`, `OS`, `browser`, `IPAddress`, `isCurrentSession`, `lastSeenAt`, `issuedAt`

11. DELETE `/api/v1/admin/account/sessions/{sessionId}`
    - Sent: `sessionId` *(Path Param)*
    - Returned: `success`, `message`

12. DELETE `/api/v1/admin/account/sessions/other`
    - Sent: *(None)*
    - Returned: `success`, `message`

13. GET `/api/v1/admin/account/loginHistories`
    - Sent: `page`, `size`, `status` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `userId`, `sessionId`, `deviceId`, `deviceName`, `IPAddress`, `geoCountry`, `geoCity`, `isNewIP`, `userAgent`, `status`, `failureReason`, `createdAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

14. GET `/api/v1/admin/account/loginHistories/exportExcel`
    - Sent: `status` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

---

### /api/v1/admin/news + /api/v1/public/news

15. GET `/api/v1/admin/news`
    - Sent: `page`, `size`, `search` *(Optional)*, `status` *(Optional)*, `categoryId` *(Optional)*, `isFeatured` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `title`, `slug`, `coverImageURL`, `status`, `isFeatured`, `viewCount`, `categoryId`, `categoryName`, `createdAt`, `updatedAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

16. GET `/api/v1/admin/news/exportExcel`
    - Sent: `search` *(Optional)*, `status` *(Optional)*, `categoryId` *(Optional)*, `isFeatured` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

17. GET `/api/v1/admin/news/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `title`, `slug`, `content`, `coverImageURL`, `status`, `isFeatured`, `viewCount`, `categoryId`, `categoryName`, `authorName`, `createdAt`, `updatedAt`

18. POST `/api/v1/admin/news`
    - Sent: `title`, `categoryId`, `content`, `coverImageURL`, `status`, `isFeatured`
    - Returned: `id`, `title`, `slug`, `content`, `coverImageURL`, `status`, `isFeatured`, `viewCount`, `categoryId`, `categoryName`, `authorName`, `createdAt`, `updatedAt`

19. PUT `/api/v1/admin/news/{id}`
    - Sent: `id` *(Path Param)*, `title` *(Optional)*, `categoryId` *(Optional)*, `content` *(Optional)*, `coverImageURL` *(Optional)*, `status` *(Optional)*, `isFeatured` *(Optional)*
    - Returned: `id`, `title`, `slug`, `content`, `coverImageURL`, `status`, `isFeatured`, `viewCount`, `categoryId`, `categoryName`, `authorName`, `createdAt`, `updatedAt`

20. DELETE `/api/v1/admin/news/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

21. GET `/api/v1/admin/newsCategories`
    - Sent: `search` *(Optional)*
    - Returned: `id`, `name`, `isActive`, `createdAt`

22. POST `/api/v1/admin/newsCategories`
    - Sent: `name`, `isActive`
    - Returned: `id`, `name`, `isActive`, `createdAt`

23. PUT `/api/v1/admin/newsCategories/{id}`
    - Sent: `id` *(Path Param)*, `name` *(Optional)*, `isActive` *(Optional)*
    - Returned: `id`, `name`, `isActive`, `createdAt`

24. DELETE `/api/v1/admin/newsCategories/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

25. POST `/api/v1/admin/media/upload`
    - Sent: `file` *(Multipart)*
    - Returned: `fileURL`, `fileSizeBytes`, `mimeType`, `uploadedAt`

26. GET `/api/v1/public/news`
    - Sent: `page`, `size`, `search` *(Optional)*, `categoryId` *(Optional)*
    - Returned:
      - `items`: `id`, `title`, `slug`, `content`, `coverImageURL`, `categoryId`, `categoryName`, `updatedAt`, `createdAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

27. GET `/api/v1/public/news/featured`
    - Sent: `limit` *(Optional + Default: 3)*
    - Returned: `id`, `title`, `slug`, `coverImageURL`, `updatedAt`, `createdAt`

28. GET `/api/v1/public/news/relevant`
    - Sent: `limit` *(Optional + Default: 3)*
    - Returned: `id`, `title`, `slug`, `coverImageURL`, `updatedAt`, `createdAt`

29. GET `/api/v1/public/newsCategories`
    - Sent: *(None)*
    - Returned: `id`, `name`

30. GET `/api/v1/public/news/{slug}`
    - Sent: `slug` *(Path Param)*
    - Returned: `id`, `title`, `slug`, `content`, `coverImageURL`, `viewCount`, `categoryId`, `categoryName`, `updatedAt`, `createdAt`

---

### /api/v1/admin/recruitments + /api/v1/public/recruitments

31. GET `/api/v1/admin/recruitments/dashboardMetrics`
    - Sent: *(None)*
    - Returned: `activeCount`, `totalCandidatesCount`, `expiringSoonCount`, `closedCount`

32. GET `/api/v1/admin/recruitments`
    - Sent: `page`, `size`, `search` *(Optional)*, `status` *(Optional)*, `departmentId` *(Optional)*, `employmentType` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `location`, `employmentType`, `status`, `applicantCount`, `expiresAt`, `createdAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

33. GET `/api/v1/admin/recruitments/exportExcel`
    - Sent: `status` *(Optional)*, `departmentId` *(Optional)*, `employmentType` *(Optional)*, `search` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

34. GET `/api/v1/admin/recruitments/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `recruiterId`, `recruiterName`, `location`, `employmentType`, `workingHours`, `description`, `requirements`, `benefits`, `coverImageURL`, `status`, `minSalary`, `maxSalary`, `isNegotiable`, `requiredCandidateNum`, `viewCount`, `applicantCount`, `expiresAt`, `createdAt`, `updatedAt`

35. POST `/api/v1/admin/recruitments`
    - Sent: `departmentId`, `jobTitle`, `location`, `employmentType`, `workingHours`, `description`, `requirements`, `benefits`, `coverImageURL`, `status`, `minSalary`, `maxSalary`, `isNegotiable`, `requiredCandidateNum`, `expiresAt`
    - Returned: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `recruiterId`, `recruiterName`, `location`, `employmentType`, `workingHours`, `description`, `requirements`, `benefits`, `coverImageURL`, `status`, `minSalary`, `maxSalary`, `isNegotiable`, `requiredCandidateNum`, `viewCount`, `applicantCount`, `expiresAt`, `createdAt`, `updatedAt`

36. PUT `/api/v1/admin/recruitments/{id}`
    - Sent: `id` *(Path Param)*, `departmentId` *(Optional)*, `jobTitle` *(Optional)*, `location` *(Optional)*, `employmentType` *(Optional)*, `workingHours` *(Optional)*, `description` *(Optional)*, `requirements` *(Optional)*, `benefits` *(Optional)*, `coverImageURL` *(Optional)*, `status` *(Optional)*, `minSalary` *(Optional)*, `maxSalary` *(Optional)*, `isNegotiable` *(Optional)*, `requiredCandidateNum` *(Optional)*, `expiresAt` *(Optional)*
    - Returned: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `recruiterId`, `recruiterName`, `location`, `employmentType`, `workingHours`, `description`, `requirements`, `benefits`, `coverImageURL`, `status`, `minSalary`, `maxSalary`, `isNegotiable`, `requiredCandidateNum`, `viewCount`, `applicantCount`, `expiresAt`, `createdAt`, `updatedAt`

37. DELETE `/api/v1/admin/recruitments/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

38. GET `/api/v1/admin/departments`
    - Sent: `search` *(Optional)*
    - Returned: `id`, `name`

39. POST `/api/v1/admin/departments`
    - Sent: `name`
    - Returned: `id`, `name`

40. PUT `/api/v1/admin/departments/{id}`
    - Sent: `id` *(Path Param)*, `name` *(Optional)*
    - Returned: `id`, `name`

41. DELETE `/api/v1/admin/departments/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

42. GET `/api/v1/admin/candidates`
    - Sent: `page`, `size`, `search` *(Optional)*, `recruitmentId` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `recruitmentId`, `recruitmentTitle`, `fullname`, `email`, `appliedAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

43. GET `/api/v1/admin/candidates/exportExcel`
    - Sent: `recruitmentId` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

44. GET `/api/v1/admin/candidates/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `recruitmentId`, `recruitmentTitle`, `location`, `employmentType`, `fullname`, `email`, `phone`, `resumeURL`, `message`, `note`, `appliedAt`, `expiresAt`, `createdAt`, `updatedAt`

45. PATCH `/api/v1/admin/candidates/{id}/note`
    - Sent: `id` *(Path Param)*, `note`
    - Returned: `id`, `note`, `updatedAt`

46. GET `/api/v1/public/recruitments`
    - Sent: `page`, `size`, `search` *(Optional)*, `departmentId` *(Optional)*, `employmentType` *(Optional)*, `location` *(Optional)*
    - Returned:
      - `items`: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `location`, `employmentType`, `description`, `coverImageURL`, `minSalary`, `maxSalary`, `isNegotiable`, `expiresAt`, `updatedAt`, `createdAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

47. GET `/api/v1/public/recruitments/{slug}`
    - Sent: `slug` *(Path Param)*
    - Returned: `id`, `jobTitle`, `slug`, `departmentId`, `departmentName`, `location`, `employmentType`, `workingHours`, `description`, `requirements`, `benefits`, `coverImageURL`, `minSalary`, `maxSalary`, `isNegotiable`, `requiredCandidateNum`, `viewCount`, `expiresAt`, `updatedAt`, `createdAt`

48. GET `/api/v1/public/departments`
    - Sent: *(None)*
    - Returned: `id`, `name`

49. GET `/api/v1/public/employmentTypes`
    - Sent: *(None)*
    - Returned: `fulltime`, `parttime`, `remote`, `hybrid`

50. POST `/api/v1/public/recruitments/{id}/apply`
    - Sent: `id` *(Path Param)*, `fullname`, `email`, `phone` *(Optional)*, `message` *(Optional)*, `resume` *(Multipart File)*
    - Returned: `success`, `message`

---

### /api/v1/admin/contacts + /api/v1/public/contacts

51. GET `/api/v1/admin/contacts`
    - Sent: `page`, `size`, `search` *(Optional)*, `status` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `customerFullname`, `customerPhone`, `customerEmail`, `status`, `createdAt`, `updatedAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

52. GET `/api/v1/admin/contacts/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `customerFullname`, `customerPhone`, `customerEmail`, `message`, `note`, `status`, `feedbackContent`, `feedbackAttachmentURL`, `feedbackSentAt`, `createdAt`, `updatedAt`

53. POST `/api/v1/admin/contacts/{id}/respond`
    - Sent: `id` *(Path Param)*, `feedbackContent`, `feedbackAttachmentURL` *(Optional)*
    - Returned: `id`, `status`, `feedbackContent`, `feedbackAttachmentURL`, `feedbackSentAt`, `updatedAt`

54. PATCH `/api/v1/admin/contacts/{id}/note`
    - Sent: `id` *(Path Param)*, `note`
    - Returned: `id`, `note`, `updatedAt`

55. DELETE `/api/v1/admin/contacts/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

56. GET `/api/v1/admin/contacts/exportExcel`
    - Sent: `status` *(Optional)*, `search` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

57. POST `/api/v1/public/contacts`
    - Sent: `customerFullname`, `customerPhone`, `customerEmail`, `message`
    - Returned: `success`, `message`

---

### /api/v1/admin/settings

58. GET `/api/v1/admin/settings/backupSchedule`
    - Sent: *(None)*
    - Returned: `id`, `isEnabled`, `frequency`, `timeOfDay`, `dayOfWeek`, `dayOfMonth`

59. PUT `/api/v1/admin/settings/backupSchedule`
    - Sent: `isEnabled` *(Optional)*, `frequency`, `timeOfDay`, `dayOfWeek` *(Optional)*, `dayOfMonth` *(Optional)*
    - Returned: `id`, `isEnabled`, `frequency`, `timeOfDay`, `dayOfWeek`, `dayOfMonth`

60. POST `/api/v1/admin/settings/backups/trigger`
    - Sent: *(None)*
    - Returned: `backupId`, `status`, `message`

61. GET `/api/v1/admin/settings/backups`
    - Sent: `page`, `size`, `search` *(Optional)*, `status` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `fileURL`, `fileSizeBytes`, `status`, `errorMessage`, `startedAt`, `finishedAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

62. GET `/api/v1/admin/settings/backups/exportExcel`
    - Sent: `search` *(Optional)*, `status` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

63. GET `/api/v1/admin/settings/backups/{id}/download`
    - Sent: `id` *(Path Param)*
    - Returned: Binary ZIP Stream (`database.sql` + `/media` + `/resumes`)

---

### /api/v1/notifications

64. GET `/api/v1/notifications/stream`
    - Sent: *(None)*
    - Returned: SSE Event Stream (`id`, `title`, `content`, `type`, `createdAt`)

65. GET `/api/v1/notifications`
    - Sent: `page`, `size`, `search` *(Optional)*, `type` *(Optional)*, `isRead` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `title`, `content`, `type`, `isRead`, `readAt`, `createdAt`
      - `unreadCount`: `unreadCount`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

66. GET `/api/v1/notifications/exportExcel`
    - Sent: `type` *(Optional)*, `isRead` *(Optional)*, `search` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

67. GET `/api/v1/notifications/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `title`, `content`, `type`, `isRead`, `readAt`, `createdAt`

68. PATCH `/api/v1/notifications/{id}/read`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `isRead`, `readAt`

69. PATCH `/api/v1/notifications/markAllRead`
    - Sent: *(None)*
    - Returned: `success`, `message`

---

### /api/v1/admin/dashboard

70. GET `/api/v1/admin/dashboard`
    - Sent: `range` *(Optional + Default: 7d)*
    - Returned:
      - `totalNews`: `totalNews`
      - `totalRecruitments`: `totalRecruitments`
      - `totalContacts`: `totalContacts`
      - `contactStats`: `date`, `count`
      - `topRecruitments`: `id`, `jobTitle`, `viewCount`, `percentage`
      - `topNews`: `id`, `title`, `viewCount`

---

### /api/v1/admin/users

71. GET `/api/v1/admin/users`
    - Sent: `page`, `size`, `search` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned:
      - `items`: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`, `updatedAt`
      - `pagination`: `page`, `size`, `totalElements`, `totalPages`, `isFirst`, `isLast`

72. GET `/api/v1/admin/users/exportExcel`
    - Sent: `search` *(Optional)*, `fromDate` *(Optional)*, `toDate` *(Optional)*
    - Returned: Binary Excel File Stream (`.xlsx`)

73. GET `/api/v1/admin/users/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`, `updatedAt`

74. POST `/api/v1/admin/users`
    - Sent: `username`, `fullname`, `email`, `phone`, `password`
    - Returned: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`, `updatedAt`

75. PUT `/api/v1/admin/users/{id}`
    - Sent: `id` *(Path Param)*, `fullname` *(Optional)*, `email` *(Optional)*, `phone` *(Optional)*
    - Returned: `id`, `username`, `fullname`, `email`, `phone`, `role`, `emailVerifiedAt`, `createdAt`, `updatedAt`

76. PATCH `/api/v1/admin/users/{id}/password`
    - Sent: `id` *(Path Param)*, `newPassword`, `confirmPassword`
    - Returned: `success`, `message`

77. DELETE `/api/v1/admin/users/{id}`
    - Sent: `id` *(Path Param)*
    - Returned: `success`, `message`

---

### /actuator

78. GET `/actuator/health`

79. GET `/actuator/info`

80. GET `/actuator/metrics`

81. GET `/actuator/prometheus`

---

`curl`:  
*Finished*: 105 / 105  
*Success Rate*: 100%  

`k6`:  
*Finished*: 19869 / 19869  
*Success Rate*: 100.00%  
*Throughput*: 659.24 req/s  
*Median Latency*: 612.20 ms  
*Average Latency*: 1.31 s  
*p90 Latency*: 2.21 s  
*p95 Latency*: 6.37 s  
*Max Latency*: 17.65 s