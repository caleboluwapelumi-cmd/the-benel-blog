export default function BlogLoading() {
    return (
        <div>
            {/* Static white hero — mirrors new blog page */}
            <section className="pt-20 pb-16 px-6 text-center bg-white">
                <div className="skeleton h-10 w-64 mx-auto rounded" />
                <div className="mt-4 w-16 h-1 bg-accent mx-auto rounded-full" />
                <div className="skeleton h-5 w-80 mx-auto rounded mt-4" />
            </section>

            {/* Skeleton content */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                {/* Search bar skeleton */}
                <div className="relative mb-8 max-w-xl mx-auto">
                    <div className="skeleton w-full h-12 rounded-lg" />
                </div>

                {/* Category tabs skeleton */}
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                    {[40, 36, 60, 52].map((w, i) => (
                        <div
                            key={i}
                            className="skeleton h-4 rounded pb-3"
                            style={{ width: `${w}px` }}
                        />
                    ))}
                </div>

                {/* Post count skeleton */}
                <div className="skeleton h-4 w-32 rounded mb-8" />

                {/* Cards grid */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-20">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className={`bg-white overflow-hidden border-t-[3px] border-gray-200 ${i === 0 ? "sm:col-span-2" : ""}`}
                        >
                            <div className="skeleton w-full h-48" />
                            <div className="p-6">
                                <div className="skeleton h-3 w-16 rounded" />
                                <div className="skeleton h-6 w-3/4 rounded mt-3" />
                                <div className="skeleton h-4 w-full rounded mt-3" />
                                <div className="skeleton h-4 w-2/3 rounded mt-2" />
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                                    <div className="skeleton h-4 w-20 rounded" />
                                    <div className="skeleton h-3 w-28 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
