import { describe, expect, it } from "vitest";
import {
  normalizeLibraryOfCongressResponse,
  normalizeNationalArchivesDetail,
  normalizeNationalArchivesResponse,
} from "./archive";

describe("Library of Congress archive normalization", () => {
  it("keeps safe record metadata and labels digitized images", () => {
    const result = normalizeLibraryOfCongressResponse({
      pagination: {
        current: 2,
        total: 33,
        next: "https://www.loc.gov/search/?sp=3",
      },
      results: [
        {
          id: "https://www.loc.gov/item/123/",
          title: "Freedmen record",
          date: "1870",
          description: ["A public archive description"],
          format: ["Manuscript/Mixed Material"],
          subject: ["Freedmen"],
          location: ["Georgia"],
          image_url: ["https://tile.loc.gov/image.jpg"],
          item: {
            rights_advisory:
              "Review the rights statement on the original record.",
          },
        },
      ],
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
        {
          id: "https://www.loc.gov/item/456/",
          title: "Metadata only",
          image_url: ["https://evil.example/image.jpg"],
        },
      ],
    });
    expect(result.results).toHaveLength(1);
    expect(result.results[0].hasDigitalImage).toBe(false);
    expect(result.results[0].imageUrl).toBeNull();
  });

  it("upgrades trusted Library of Congress record links to HTTPS", () => {
    const result = normalizeLibraryOfCongressResponse({
      results: [
        { id: "http://www.loc.gov/item/456/", title: "Trusted record" },
      ],
    });

    expect(result.results[0].recordUrl).toBe("https://www.loc.gov/item/456/");
  });
});

describe("National Archives normalization", () => {
  it("maps official records and digital objects into the shared archive model", () => {
    const result = normalizeNationalArchivesResponse({
      body: {
        hits: {
          total: { value: 42 },
          hits: [
            {
              _source: {
                record: {
                  naId: 28218579,
                  title: "Freedmen record",
                  levelOfDescription: "fileUnit",
                  generalRecordsTypes: ["Textual Records"],
                  inclusiveStartDate: { logicalDate: "1861-01-01" },
                  inclusiveEndDate: { logicalDate: "1867-12-31" },
                  digitalObjects: [
                    {
                      objectType: "Image (JPG)",
                      objectUrl:
                        "https://catalog.archives.gov/medialive/image.jpg",
                    },
                  ],
                  useRestriction: { status: "Unrestricted" },
                },
              },
            },
          ],
        },
      },
    });

    expect(result.pagination.total).toBe(42);
    expect(result.results[0]).toMatchObject({
      id: "nara-28218579",
      title: "Freedmen record",
      repository: "National Archives",
      hasDigitalImage: true,
      recordUrl: "https://catalog.archives.gov/id/28218579",
    });
  });

  it("rejects untrusted digital-object image hosts", () => {
    const result = normalizeNationalArchivesResponse({
      body: {
        hits: {
          total: { value: 1 },
          hits: [
            {
              _source: {
                record: {
                  naId: 1,
                  title: "Metadata only",
                  digitalObjects: [
                    {
                      objectType: "Image",
                      objectUrl: "https://evil.example/image.jpg",
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    });
    expect(result.results[0].imageUrl).toBeNull();
    expect(result.results[0].hasDigitalImage).toBe(false);
  });

  it("preserves ordered images and PDFs for the on-site record viewer", () => {
    const detail = normalizeNationalArchivesDetail({
      body: { hits: { hits: [{ _source: { record: {
        naId: 99,
        title: "Enrollment packet",
        digitalObjects: [
          { designator: "Page 1", objectType: "Image", objectUrl: "https://catalog.archives.gov/page-1.jpg" },
          { designator: "Attachment", objectType: "PDF", objectUrl: "https://catalog.archives.gov/attachment.pdf" },
          { designator: "Unsafe", objectType: "Image", objectUrl: "https://evil.example/page.jpg" },
        ],
      } } }] } },
    }, "99");

    expect(detail?.digitalObjects).toHaveLength(2);
    expect(detail?.digitalObjects.map(object => object.mediaType)).toEqual(["image", "pdf"]);
    expect(detail?.digitalObjects[0].title).toBe("Page 1");
  });
});
