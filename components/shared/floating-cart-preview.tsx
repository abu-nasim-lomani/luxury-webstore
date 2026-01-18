"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";

export function FloatingCartPreview() {
    const { items, getTotalItems } = useCart();
    const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
    const [prevItemCount, setPrevItemCount] = useState(0);

    useEffect(() => {
        const currentCount = getTotalItems();

        // Detect when a new item is added
        if (currentCount > prevItemCount && items.length > 0) {
            // Get the most recently added item
            const latestItem = items[items.length - 1];
            setLastAddedProduct(latestItem.product);

            // Auto-hide after 3 seconds
            const timer = setTimeout(() => {
                setLastAddedProduct(null);
            }, 3000);

            return () => clearTimeout(timer);
        }

        setPrevItemCount(currentCount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <AnimatePresence>
            {lastAddedProduct && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm"
                >
                    <div className="bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl overflow-hidden">
                        {/* Success Header */}
                        <div className="bg-green-500 text-white px-4 py-3 flex items-center gap-2">
                            <div className="bg-white text-green-500 p-1 rounded-full">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="font-semibold">Added to cart!</span>
                        </div>

                        {/* Product Preview */}
                        <div className="p-4 flex gap-3">
                            <div className="relative w-20 h-20 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                                <Image
                                    src={lastAddedProduct.images[0] || "/placeholder.jpg"}
                                    alt={lastAddedProduct.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                    {lastAddedProduct.name}
                                </h4>
                                <p className="text-sm font-bold text-foreground">
                                    {formatPrice(lastAddedProduct.price)}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-4 pb-4 flex gap-2">
                            <button
                                onClick={() => setLastAddedProduct(null)}
                                className="flex-1 py-2 px-4 border border-border rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                            >
                                Continue Shopping
                            </button>
                            <Link
                                href="/cart"
                                className="flex-1 py-2 px-4 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                View Cart
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
