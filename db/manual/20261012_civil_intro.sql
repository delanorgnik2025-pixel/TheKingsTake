START TRANSACTION;
INSERT INTO newsletter_campaigns (subject,preview_text,content,source_urls,automated,daily_key,status) SELECT 'Your free Section 1983 introduction is ready','A free learning gift from The King’s Dispatch — no payment required.','You joined The King’s Dispatch. Here is something you can use today: a free introduction to Section 1983 and the federal civil-rights process.

Ronald Lee King shares firsthand experience filing civil-rights actions, alongside links to official sources. Learn what Section 1983 covers, why filing a proposed class action is different from obtaining class certification, and how to organize facts before seeking qualified help.

Start the free introduction: https://thekingstake.com/learn/section-1983-introduction

There is no payment or Facebook subscription required for this introduction. The full course is in development. This is general education, not legal representation, advice about your case, or a promise of a legal result.

AASOTU Media Group LLC | #TheKingsTake','["https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapI-sec1983.htm", "https://www.uscourts.gov/forms-rules/forms/complaint-violation-civil-rights-non-prisoner"]',FALSE,'20261012-civil-intro','draft' WHERE NOT EXISTS (SELECT 1 FROM newsletter_campaigns WHERE daily_key='20261012-civil-intro');
INSERT INTO feed_posts (body,link_url,link_title,image_url) SELECT 'A free learning gift from The King’s Dispatch: understand Section 1983, proposed class actions and how to organize facts. General education from firsthand filing experience, with official sources. No payment or access code required.','https://thekingstake.com/learn/section-1983-introduction','Your free introduction to Section 1983','https://thekingstake.com/images/og-image.jpg' WHERE NOT EXISTS (SELECT 1 FROM feed_posts WHERE link_url='https://thekingstake.com/learn/section-1983-introduction');
COMMIT;
