-- Some existing deployments use fallback service cards without a services table.
SET @brand_studio_catalog_sql = IF(EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'services'), 'UPDATE services SET name = ''Brand Studio'', price = 2495, priceDisplay = ''Websites from $2,495'', shortDescription = ''Brand identity, author launches, and business websites. A clear message and a practical online home.'', fullDescription = ''Visit Brand Studio for scoped author and business websites, brand identity packages, and quote requests.'', features = ''["Brand Essentials ($495)","Author Launch ($2,495)","Business Identity ($2,495)","Monthly Care ($79/mo)","Custom platforms quoted separately"]'' WHERE slug = ''website-development''', 'SELECT 1');
PREPARE brand_studio_catalog_stmt FROM @brand_studio_catalog_sql;
EXECUTE brand_studio_catalog_stmt;
DEALLOCATE PREPARE brand_studio_catalog_stmt;
