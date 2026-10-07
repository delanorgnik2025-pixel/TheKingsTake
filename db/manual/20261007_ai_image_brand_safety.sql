UPDATE posts
SET coverImage='https://upload.wikimedia.org/wikipedia/commons/2/2f/Sam_Altman_speaking_at_TED_%28cropped%29.jpg',
    content=REPLACE(content,
      '_Editorial illustration: The King''s Take house imagery; not a photograph of the interview._',
      '_Image: Sam Altman speaking at TED, April 11, 2025. Steve Jurvetson · CC BY 2.0 · https://commons.wikimedia.org/wiki/File:Sam_Altman_speaking_at_TED_(cropped).jpg_')
WHERE slug='sam-altman-ai-harms-access-who-pays-the-price-2026-10-06';
