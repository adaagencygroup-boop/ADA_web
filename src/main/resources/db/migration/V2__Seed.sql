INSERT INTO "users" ("id", "username", "fullname", "email", "phone", "passwordHash", "emailVerifiedAt", "role")
VALUES ('00000000-0000-0000-0000-000000000001', 'vak1412', 'Alexander Nguyen', 'contact@adagroup.com.vn', '+84 912 045 678', crypt('PascalCase18', gen_salt('bf', 10)), now(), 'admin')
ON CONFLICT ("username") DO NOTHING;