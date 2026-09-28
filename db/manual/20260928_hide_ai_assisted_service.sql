-- Ronald Lee King is the named author and creative provider. Retire the
-- separate AI-branded offer so it no longer appears in the public catalog.
UPDATE `services`
SET `isActive` = false
WHERE BINARY `slug` = BINARY 'ai-assisted-creative';
