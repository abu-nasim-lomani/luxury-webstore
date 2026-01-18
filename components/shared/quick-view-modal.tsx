"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import { toast } from "sonner";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const { addItem } = useCart();
    const { addItem: addToWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(`Added ${product.name} to cart`);
        onClose();
    };

    const handleAddToWishlist = () => {
        addToWishlist(product);
        toast.success(`Added ${product.name} to wishlist`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop Overlay - Higher z-index than navbar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal Container - Even higher z-index */}
                    <div className="fixed inset-0 z-[201] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors shadow-lg"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 text-gray-900 dark:text-white" />
                                </button>

                                {/* Modal Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col space-y-4 md:space-y-6">
                                        {/* Title & Price */}
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 pr-8">
                                                {product.name}
                                            </h2>
                                            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                                            {product.description}
                                        </p>

                                        {/* Stock Status */}
                                        <div className="flex items-center gap-2">
                                            {product.stock > 0 ? (
                                                <>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {product.stock < 10 ? `Only ${product.stock} left` : "In Stock"}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                                    <span className="text-sm text-red-600 dark:text-red-400">Out of Stock</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="flex items-center gap-4">
                                            <label className="text-sm font-medium text-gray-900 dark:text-white">Quantity:</label>
                                            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white font-semibold"
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 sm:px-6 py-2 border-x-2 border-gray-300 dark:border-gray-600 min-w-[50px] sm:min-w-[60px] text-center font-semibold text-gray-900 dark:text-white">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                    disabled={quantity >= product.stock}
                                                    className="px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white font-semibold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={product.stock === 0}
                                                className="flex-1 bg-black dark:bg-white text-white dark:text-black px-6 py-3 sm:py-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={handleAddToWishlist}
                                                className="p-3 sm:p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                aria-label="Add to wishlist"
                                            >
                                                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
