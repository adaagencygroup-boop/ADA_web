INSERT INTO "users" ("id", "username", "fullname", "email", "phone", "passwordHash", "emailVerifiedAt", "role")
VALUES ('00000000-0000-0000-0000-000000000001', 'ada', 'ADA', 'ada.agency.group@gmail.com', '+84 912 045 678', crypt('barca@5ucl', gen_salt('bf', 10)), now(), 'admin')
ON CONFLICT ("username") DO NOTHING;