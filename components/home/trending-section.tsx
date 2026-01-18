"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ProductCard } from "@/components/shared/product-card";
import { QuickViewModal } from "@/components/shared/quick-view-modal";
import { Product } from "@/lib/types";
import { useAdminProducts } from "@/store/use-admin-products";

export function TrendingSection() {
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts().then(() => {
            // Get products marked as trending
            const products = getAllProducts();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const trending = products.filter((p) => (p as any).is_trending === true).slice(0, 4);
            setTrendingProducts(trending);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (trendingProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full mb-4 animate-pulse">
                        <Flame className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-wide">Trending Now</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
                        Hot Picks This Week
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Don&apos;t miss out on our most popular items flying off the shelves
                    </p>
                </motion.div>

                {/* Trending Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Hot Badge */}
                            <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                Hot
                            </div>
                            <ProductCard product={product} hideFeaturedBadge onQuickView={setSelectedProduct} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}
