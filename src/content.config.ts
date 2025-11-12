import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        image: z.object({
            url: image(),
            alt: z.string().optional()
        })
        .optional(),
    }),
});

export const collections = {
    blogs: blogsCollection,
    // Properties managed via PageCMS (./.pages.yml)
    // Content lives in src/content/properties as md/mdx/json created by the CMS
    properties: defineCollection({
        loader: glob({ pattern: "**/*.{md,mdx,json}", base: "./src/content/properties" }),
        schema: () =>
            z.object({
                // Match .pages.yml (snake_case) and keep types flexible
                listing_id: z.string().optional(),
                page_slug: z.string(),
                meta_title: z.string().optional(),
                meta_description: z.string().optional(),
                project_name: z.string(),
                property_type: z.string().optional(),
                developer_name: z.string().optional(),
                rera_number: z.string().optional(),
                total_area_acres: z.union([z.number(), z.string()]).optional(),
                total_units: z.union([z.number(), z.string()]).optional(),
                project_status: z.string().optional(),
                possession_date: z.union([z.string(), z.date()]).optional(),
                project_description: z.string().optional(),
                key_highlights: z.array(z.string()).optional(),
                unit_configurations: z.array(z.string()).optional(),
                min_size_sqft: z.union([z.number(), z.string()]).optional(),
                max_size_sqft: z.union([z.number(), z.string()]).optional(),
                price_per_sqft: z.union([z.number(), z.string()]).optional(),
                base_price_min_lakhs: z.union([z.number(), z.string()]).optional(),
                base_price_max_lakhs: z.union([z.number(), z.string()]).optional(),
                location_area: z.string().optional(),
                full_address: z.string().optional(),
                google_maps_embed_link: z.string().optional(),
                gallery_image_urls: z.array(z.string()).optional(),
                floorplan_image_urls: z.array(z.string()).optional(),
                video_link: z.string().optional(),
            }),
    }),
};
