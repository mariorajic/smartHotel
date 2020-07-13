INSERT INTO events
(code, message, sos, created_at, updated_at)
VALUES
(100, 'Key taken out', false, NOW(), NOW()),
(101, 'Key inserted', false, NOW(), NOW()),
(300, 'Door opened', false, NOW(), NOW()),
(301, 'Door closed', false, NOW(), NOW()),
(500, 'Window opened', false, NOW(), NOW()),
(501, 'Window closed', false, NOW(), NOW()),
(700, 'SOS activated', true, NOW(), NOW()),
(701, 'SOS deactivated', false, NOW(), NOW());