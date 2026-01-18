"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
    hideFeaturedBadge?: boolean;
}

export function ProductCard({ product, onQuickView, hideFeaturedBadge = false }: ProductCardProps) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        onQuickView?.(product);
    };

    return (
        <Link href={`/products/${product.slug}`}>
            <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full flex flex-col bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
            >
                {/* Image Container - Fixed Aspect Ratio */}
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                        src={product.images[0] || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Featured Badge */}
                    {product.featured && !hideFeaturedBadge && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide z-10 flex items-center gap-1 shadow-lg">
                            <Sparkles className="w-3 h-3" />
                            Featured
                        </div>
                    )}

                    {/* Stock Badge */}
                    {product.stock === 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide z-10 shadow-lg">
                            Sold Out
                        </div>
                    )}
                    {product.stock > 0 && product.stock < 5 && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide z-10 shadow-lg">
                            Low Stock
                        </div>
                    )}

                    {/* Action Buttons - Premium Style */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
                        {/* Quick Add Button - Highlighted */}
                        <motion.button
                            onClick={handleQuickAdd}
                            disabled={product.stock === 0}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all ${isAdded
                                ? 'bg-green-500 text-white'
                                : 'bg-white dark:bg-gray-100 text-black hover:bg-gray-100 dark:hover:bg-gray-200 border-2 border-black dark:border-gray-800'
                                }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                {isAdded ? "Added! ✓" : product.stock === 0 ? "Out of Stock" : "Quick Add"}
                            </span>
                            <span className="sm:hidden">{isAdded ? "✓" : "+"}</span>
                        </motion.button>

                        {/* Quick View Button */}
                        <motion.button
                            onClick={handleQuickView}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xl border-2 border-gray-300 dark:border-gray-600"
                        >
                            <Eye className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* Product Info - Fixed Height */}
                <div className="flex flex-col flex-1 p-4 bg-white dark:bg-gray-900">
                    {/* Product Name */}
                    <h3 className="font-heading text-base font-semibold mb-1 line-clamp-1 text-gray-900 dark:text-white">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                        {product.description}
                    </p>

                    {/* Price and Wishlist */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-gray-200 dark:border-gray-700">
                        <span className="font-heading text-xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price)}
                        </span>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to wishlist functionality
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
