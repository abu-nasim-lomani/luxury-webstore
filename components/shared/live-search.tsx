"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAdminProducts } from "@/store/use-admin-products";

export function LiveSearch() {
    const router = useRouter();
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Search products
    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const products = getAllProducts();
        const searchLower = query.toLowerCase();

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category_id.toLowerCase().includes(searchLower)
        );

        setResults(filtered.slice(0, 5)); // Show max 5 results
        setIsOpen(filtered.length > 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProductClick = (slug: string) => {
        setQuery("");
        setIsOpen(false);
        router.push(`/products/${slug}`);
    };

    const handleViewAll = () => {
        setIsOpen(false);
        router.push(`/products?search=${encodeURIComponent(query)}`);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && results.length > 0 && setIsOpen(true)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-10 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            setIsOpen(false);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                )}
            </div>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 border-2 border-foreground/20 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                        <div className="max-h-[400px] overflow-y-auto">
                            {/* Search Results */}
                            <div className="p-2">
                                {results.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.slug)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                                    >
                                        {/* Product Image */}
                                        <div className="relative w-12 h-12 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                                            <Image
                                                src={product.images[0] || "/placeholder.jpg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm line-clamp-1">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {product.category_id}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="flex-shrink-0">
                                            <p className="font-semibold text-sm">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* View All Results */}
                            {results.length >= 5 && (
                                <button
                                    onClick={handleViewAll}
                                    className="w-full p-3 border-t border-border bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors"
                                >
                                    View all results for &quot;{query}&quot;
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* No Results */}
            <AnimatePresence>
                {isOpen && query.length > 0 && results.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 border-2 border-foreground/20 rounded-lg shadow-2xl p-6 text-center z-50"
                    >
                        <p className="text-muted-foreground">No products found for &quot;{query}&quot;</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
