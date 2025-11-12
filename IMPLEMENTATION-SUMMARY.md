# ✅ Update (Nov 2025): Listings now powered by PageCMS

The site has been migrated to use PageCMS (Git-based) content for property listings via an Astro Content Collection (`properties`).

- Content location: `src/content/properties/`
- Schema source: `.pages.yml` (Properties collection)
- Runtime code: `src/utils/listings.ts` now reads from the content collection, keeping the existing `Listing` interface and all pages/components unchanged.
- A sample entry is provided at `src/content/properties/sample-property.md`.

The section below documents the earlier Google Sheets approach for reference only.

# ✅ Google Sheets CMS Integration - Complete!

## 🎉 What's Been Implemented

Your Astro site now uses Google Sheets as a CMS for property listings via the OpenSheet API!

### ✨ Features Implemented

#### 1. **Data Fetching Layer** (`src/utils/listings.ts`)

- TypeScript interfaces for type-safe data handling
- `fetchListings()` - Fetches all listings from Google Sheets
- `getListingBySlug()` - Gets individual listing by slug
- Helper functions for formatting prices, parsing images, etc.

#### 2. **UI Components**

- **ListingCard** (`src/components/ListingCard.astro`)
  - Responsive card design with image, title, price, location
  - Status badges (Under Construction / Ready to Move)
  - Hover effects and animations
- **ListingsGrid** (`src/components/ListingsGrid.astro`)
  - Responsive grid layout (1/2/3 columns)
  - Empty state handling

#### 3. **Pages Created**

- **Homepage** (`src/pages/index.astro`) - ✅ Updated
  - Shows 6 featured properties
  - "View All Properties" button if more exist
- **All Listings** (`src/pages/listings/index.astro`) - ✅ NEW
  - Displays all properties in a grid
  - Shows total count
- **Individual Listing** (`src/pages/listings/[slug].astro`) - ✅ NEW
  - Dynamic pages generated for each property
  - Complete property details with:
    - Image gallery
    - Pricing information
    - Project details (area, units, RERA, etc.)
    - Unit configurations
    - Key highlights
    - Description
    - Floor plans
    - Video tour (YouTube embed)
    - Google Maps location
    - Contact CTA

#### 4. **Navigation**

- Added "Properties" link to header menu
- Links to `/listings` page

### 📊 Your Google Sheet Configuration

- **Sheet ID**: `11Beqmcp0nY7L0PANlJ4iDzrXePPgk5yH03AlEHNFAs8`
- **Tab Name**: `Listings`
- **Status**: ✅ Connected and working
- **Current Listings**: 1 property (Sumadhura Gardens By The Brook)

### 🧪 Testing Results

```
✅ API Connection: Working
✅ Data Fetch: 1 listing retrieved
✅ Page Generation: Dynamic routes created
✅ Type Safety: Full TypeScript support
```

## 🚀 How to Use

### View the Site

Your dev server is running at: **http://localhost:4321/space-ahead**

### Pages Available

1. **Homepage**: Shows featured properties + recent blog posts
2. **All Properties**: `/listings` - Grid of all properties
3. **Property Detail**: `/listings/sumadhura-gardens-brook` - Full property details

### Adding More Listings

Simply add new rows to your Google Sheet! The site will automatically:

- Fetch the new data
- Generate listing cards
- Create individual detail pages

**Important**: Make sure your Google Sheet is public (Share → Anyone with link → Viewer)

## 📝 Next Steps

### 1. Image Hosting

Currently getting 404 for images because CSV has placeholder names. You need to:

- Upload images to a CDN or image hosting service (Cloudflare Images, Imgix, etc.)
- Update the `Gallery_Image_URLs` column with actual URLs
- Format: `https://example.com/img1.jpg, https://example.com/img2.jpg`

### 2. Add More Properties

Add rows to your Google Sheet with:

- Unique `Page_Slug` for each listing
- Real image URLs (comma-separated for multiple images)
- Google Maps embed iframe code
- YouTube video links

### 3. Customize Styling

- Edit `src/components/ListingCard.astro` for card appearance
- Edit `src/pages/listings/[slug].astro` for detail page layout
- Use Tailwind CSS classes for styling

### 4. Optional Enhancements

- Add filtering by location/price/type
- Add search functionality
- Add pagination for large datasets
- Add image lightbox/gallery
- Add contact form on detail pages
- Add social sharing buttons

## 📚 Documentation

Full documentation is in `SHEETS-CMS.md` covering:

- Setup instructions
- Sheet structure
- File organization
- Usage examples
- Troubleshooting

## 🔧 Configuration

To use a different Google Sheet, update `src/utils/listings.ts`:

```typescript
const SHEET_ID = "your-new-sheet-id";
const SHEET_TAB = "YourTabName";
```

## 🎨 Styling

The components use:

- Tailwind CSS for styling
- CSS variables from your theme
- Responsive breakpoints
- Hover states and transitions

## 📱 Responsive Design

✅ Mobile-first design
✅ Tablet breakpoint (md:)
✅ Desktop breakpoint (lg:)
✅ Touch-friendly interaction

## 🐛 Known Issues

1. **404 for images**: Need to replace placeholder image names with actual URLs
2. **OpenSheet Cache**: Data cached for ~5 minutes (by OpenSheet)

## 💡 Tips

- Keep column names in Google Sheets exactly as specified
- Use comma separation for multiple values (images, configurations, highlights)
- Test the API connection: `node test-sheets.mjs`
- Images should be publicly accessible URLs
- Google Maps: Use the full iframe embed code

---

**Ready to go!** 🚀 Your Google Sheets CMS is fully integrated and working.
