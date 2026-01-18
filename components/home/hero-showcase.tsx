"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAdminProducts } from "@/store/use-admin-products";
import { useHeroShowcase } from "@/store/use-hero-showcase";
import { useCart } from "@/store/use-cart";
import { QuickViewModal } from "@/components/shared/quick-view-modal";
import { toast } from "sonner";

export function HeroShowcase() {
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const { settings, fetchSettings, getHeroProduct, getSupportProducts } = useHeroShowcase();
    const { addItem } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
        fetchSettings();
    }, [fetchProducts, fetchSettings]);

    // Use useMemo for derived state to avoid cascading renders
    const heroProduct = useMemo(() => {
        if (!settings) return null;
        const products = getAllProducts();
        return getHeroProduct(products);
    }, [settings, getAllProducts, getHeroProduct]);

    const supportProducts = useMemo(() => {
        if (!settings) return [];
        const products = getAllProducts();
        return getSupportProducts(products);
    }, [settings, getAllProducts, getSupportProducts]);

    // Hide section if not active or no hero product
    if (!settings?.is_active || !heroProduct) {
        return null;
    }

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <>
            <section className="py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header - Dynamic from settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {settings.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                            {settings.subtitle}
                        </p>
                    </motion.div>

                    {/* Grid: Hero + Mini Products (flexible) */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {/* Left: Hero Product - 2 columns (40%) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`${supportProducts.length > 0 ? 'lg:col-span-2' : 'lg:col-span-5'} group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-[400px]`}
                        >
                            <div className="absolute inset-0">
                                <Image
                                    src={heroProduct.images[0]}
                                    alt={heroProduct.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase shadow-lg flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    Hero
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                    <h3 className="text-xl md:text-2xl font-bold mb-1">
                                        {heroProduct.name}
                                    </h3>
                                    <p className="text-gray-200 mb-3 line-clamp-2 text-xs md:text-sm">
                                        {heroProduct.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl md:text-3xl font-bold">
                                            {formatPrice(heroProduct.price)}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedProduct(heroProduct)}
                                                className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                                                aria-label="Quick view"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(heroProduct)}
                                                className="px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center gap-1.5 text-sm"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                <span className="hidden sm:inline">Add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Mini Products (only if available) */}
                        {supportProducts.length > 0 && (
                            <div className="lg:col-span-3 grid grid-cols-2 gap-3 h-[400px]">
                                {supportProducts.map((product, index) => (
                                    <motion.div
                                        key={`support-${product.id}-${index}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                                    >
                                        <div className="relative flex-1 overflow-hidden">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="p-1.5 bg-white/90 hover:bg-white rounded transition-colors"
                                                    aria-label="Quick view"
                                                >
                                                    <Eye className="w-3.5 h-3.5 text-gray-900" />
                                                </button>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="p-1.5 bg-white/90 hover:bg-white rounded transition-colors"
                                                    aria-label="Add to cart"
                                                >
                                                    <ShoppingCart className="w-3.5 h-3.5 text-gray-900" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <Link href={`/products/${product.slug}`}>
                                                <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-0.5 line-clamp-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                    {product.name}
                                                </h4>
                                            </Link>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <QuickViewModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
}
