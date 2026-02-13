interface CategoryBadgeProps {
    category: string;
    size?: "sm" | "md";
}

const categoryColors: Record<string, string> = {
    Sales: "text-blue-600",
    Marketing: "text-orange-500",
    Branding: "text-purple-600",
};

export default function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
    const color = categoryColors[category] || "text-gray-500";

    return (
        <span
            className={`inline-block font-semibold uppercase tracking-widest ${color} ${size === "sm" ? "text-xs" : "text-sm"
                }`}
        >
            {category}
        </span>
    );
}
