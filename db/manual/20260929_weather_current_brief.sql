INSERT INTO posts (title, slug, excerpt, content, category, coverImage, news_beat, published, featured) SELECT 'Nor''easter flooding and Polo''s rains keep weather risks in focus', 'noreaster-flooding-and-polos-rains-weather-brief-2026-09-29', 'A September 29 weather brief connects the recent Northeast flooding with new concerns about tropical moisture in the Southwest.', '## Weather brief · September 29, 2026
Associated Press reported repeated coastal flooding in the Northeast on September 27 as a nor''easter brought damaging winds and outages. That is a dated account of the storm''s impact, not a claim that identical conditions remain in place everywhere today.

On September 29, AP reported Hurricane Polo''s landfalls in Mexico and subsequent weakening. National Weather Service guidance issued that morning discussed tropical moisture associated with Polo and flooding concerns farther north and east.

## Different regions, different hazards
Coastal flooding, inland flash flooding and tropical-cyclone wind risk are different problems. A forecast for one region should not be applied to another. Readers should check the latest local warning, its expiration time and the places it actually names.

## Continuing coverage
This desk will follow official updates and local impacts. Forecasts change; the linked live National Weather Service guidance may have been updated since this brief was written. Do not use this article as a substitute for a current local warning.

## Sources
- [Associated Press: Northeast coastal flooding, September 27](https://apnews.com/article/f4b86959733c021315e87ea1ed58459b)
- [Associated Press: Polo landfalls, September 29](https://apnews.com/article/db57554d97c70cd44b99df9ff0a41668)
- [National Weather Service: live short-range forecast discussion](https://forecast.weather.gov/product.php?format=txt&glossary=1&highlight=off&issuedby=SPD&product=PMD&site=NWS&version=1)

_Image: AASOTU Media Group LLC · Editorial illustration; conceptual storm imagery, not a photograph of these events._', 'DAILY NEWS', 'https://thekingstake.com/images/news-weather.jpg', 'weather', true, false WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='noreaster-flooding-and-polos-rains-weather-brief-2026-09-29');
