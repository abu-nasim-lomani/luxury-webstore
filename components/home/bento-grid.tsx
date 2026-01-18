"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/product-card";
import { QuickViewModal } from "@/components/shared/quick-view-modal";
import { Product } from "@/lib/types";
import { useAdminProducts } from "@/store/use-admin-products";

export function BentoGrid() {
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts().then(() => {
            const allProducts = getAllProducts();
            // Get products marked as featured
            const featured = allProducts.filter((p) => p.featured === true);

            // Show only featured products (no fallback)
            setProducts(featured.slice(0, 8));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Hide section if no featured products
    if (products.length === 0) {
        return null;
    }

    return (
        <>
            <section className="py-24 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Featured Collection
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Curated pieces that define timeless elegance
                        </p>
                    </motion.div>

                    {/* Uniform Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.slice(0, 8).map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} onQuickView={setSelectedProduct} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More Button if there are more products */}
                    {products.length > 8 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <a
                                href="/products"
                                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
                            >
                                View All Products
                            </a>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Quick View Modal */}
            <QuickViewModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
}
