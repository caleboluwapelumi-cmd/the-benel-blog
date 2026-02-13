export const categoryImages = {
    Sales: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    ],
    Marketing: [
        'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80',
        'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
        'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    ],
    Branding: [
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
        'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=800&q=80',
        'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80',
        'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&q=80',
    ],
};

export function getPostImage(category: string, slug: string): string {
    const images =
        categoryImages[category as keyof typeof categoryImages] ||
        categoryImages.Marketing;
    const index = slug.length % images.length;
    return images[index];
}
