// Utility functions for fetching and managing property listings
// Switched from Google Sheets (OpenSheet) to PageCMS-backed Astro Content Collection
import { getCollection, type CollectionEntry } from "astro:content";

export interface Listing {
  Listing_ID: string;
  Page_Slug: string;
  Meta_Title: string;
  Meta_Description: string;
  Project_Name: string;
  Property_Type: string;
  Developer_Name: string;
  RERA_Number: string;
  Total_Area_Acres: string;
  Total_Units: string;
  Project_Status: string;
  Possession_Date: string;
  Project_Description: string;
  Key_Highlights: string;
  Unit_Configurations: string;
  Min_Size_Sqft: string;
  Max_Size_Sqft: string;
  Price_Per_Sqft: string;
  Base_Price_Min_Lakhs: string;
  Base_Price_Max_Lakhs: string;
  Location_Area: string;
  Full_Address: string;
  Google_Maps_Embed_Link: string;
  Gallery_Image_URLs: string;
  Floorplan_Image_URLs: string;
  Video_Link: string;
}

type PropertyEntry = CollectionEntry<"properties">;

function toStringVal(v: unknown): string {
  if (v == null) return "";
  if (v instanceof Date) return v.toISOString().split("T")[0];
  return String(v);
}

function arrToCsv(arr?: string[]): string {
  if (!arr || arr.length === 0) return "";
  return arr
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(", ");
}

function imagesToCsv(arr?: string[]): string {
  // Keep backward-compatible comma-separated list expected by parseImageUrls
  if (!arr || arr.length === 0) return "";
  return arr
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(", ");
}

function mapEntryToListing(entry: PropertyEntry): Listing {
  const d = entry.data as any; // data is strongly typed by schema at build time
  return {
    Listing_ID: toStringVal(d.listing_id),
    Page_Slug: toStringVal(d.page_slug),
    Meta_Title: toStringVal(d.meta_title || d.project_name),
    Meta_Description: toStringVal(d.meta_description),
    Project_Name: toStringVal(d.project_name),
    Property_Type: toStringVal(d.property_type),
    Developer_Name: toStringVal(d.developer_name),
    RERA_Number: toStringVal(d.rera_number),
    Total_Area_Acres: toStringVal(d.total_area_acres),
    Total_Units: toStringVal(d.total_units),
    Project_Status: toStringVal(d.project_status),
    Possession_Date: toStringVal(d.possession_date),
    Project_Description: toStringVal(d.project_description),
    Key_Highlights: arrToCsv(d.key_highlights),
    Unit_Configurations: arrToCsv(d.unit_configurations),
    Min_Size_Sqft: toStringVal(d.min_size_sqft),
    Max_Size_Sqft: toStringVal(d.max_size_sqft),
    Price_Per_Sqft: toStringVal(d.price_per_sqft),
    Base_Price_Min_Lakhs: toStringVal(d.base_price_min_lakhs),
    Base_Price_Max_Lakhs: toStringVal(d.base_price_max_lakhs),
    Location_Area: toStringVal(d.location_area),
    Full_Address: toStringVal(d.full_address),
    Google_Maps_Embed_Link: toStringVal(d.google_maps_embed_link),
    Gallery_Image_URLs: imagesToCsv(d.gallery_image_urls),
    Floorplan_Image_URLs: imagesToCsv(d.floorplan_image_urls),
    Video_Link: toStringVal(d.video_link),
  };
}

/**
 * Fetch listings from the PageCMS-managed content collection
 */
export async function fetchListings(): Promise<Listing[]> {
  try {
    const entries = await getCollection("properties");
    // Sort newest first by entry id or slug if needed; for now, keep original order
    return entries.map(mapEntryToListing);
  } catch (error) {
    console.error("Error loading properties from content collection:", error);
    return [];
  }
}

/**
 * Gets a single listing by its slug
 */
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await fetchListings();
  return listings.find((listing) => listing.Page_Slug === slug) || null;
}

/**
 * Formats price range for display
 */
export function formatPriceRange(minPrice: string, maxPrice: string): string {
  if (!minPrice || !maxPrice) return "";

  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);

  if (isNaN(min) || isNaN(max)) return "";

  if (min === max) {
    return `₹${min} L`;
  }
  return `₹${min}L - ₹${max}L`;
}

/**
 * Parses comma-separated image URLs
 */
export function parseImageUrls(urls: string): string[] {
  if (!urls) return [];
  return urls
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
}

/**
 * Extracts Google Maps src from embed iframe code
 */
export function extractMapsSrc(embedCode: string): string {
  if (!embedCode) return "";
  const srcMatch = embedCode.match(/src="([^"]*)"/);
  return srcMatch ? srcMatch[1] : "";
}
