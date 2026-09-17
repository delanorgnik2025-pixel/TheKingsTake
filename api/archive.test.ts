import { describe, expect, it } from "vitest";
import { normalizeLibraryOfCongressResponse } from "./archive";

describe("Library of Congress archive normalization", () => {
  it("keeps safe record metadata and labels digitized images", () => {
    const result = normalizeLibraryOfCongressResponse({
      pagination: { current: 2, total: 33, next: "https://www.loc.gov/search/?sp=3" },
      results: [{
        id: "https://www.loc.gov/item/123/",
        title: "Freedmen record",
        date: "1870",
        description: ["A public archive description"],
        format: ["Manuscript/Mixed Material"],
        subject: ["Freedmen"],
        location: ["Georgia"],
        image_url: ["https://tile.loc.gov/image.jpg"],
        item: { rights_advisory: "Review the rights statement on the original record." },
      }],
    });

    expect(result.pagination).toMatchObject({ current: 2, total: 33 });
    expect(result.results[0]).toMatchObject({
      title: "Freedmen record",
      hasDigitalImage: true,
      repository: "Library of Congress",
      imageUrl: "https://tile.loc.gov/image.jpg",
    });
  });

  it("drops untrusted record and image URLs", () => {
    const result = normalizeLibraryOfCongressResponse({
      results: [
        { id: "https://evil.example/item", title: "Unsafe" },
        { id: "https://www.loc.gov/item/456/", title: "Metadata only", image_url: ["https://evil.example/image.jpg"] },
      ],
    });
    expect(result.results).toHaveLength(1);
    expect(result.results[0].hasDigitalImage).toBe(false);
    expect(result.results[0].imageUrl).toBeNull();
  });

  it("upgrades trusted Library of Congress record links to HTTPS", () => {
    const result = normalizeLibraryOfCongressResponse({
      results: [{ id: "http://www.loc.gov/item/456/", title: "Trusted record" }],
    });

    expect(result.results[0].recordUrl).toBe("https://www.loc.gov/item/456/");
  });
});
