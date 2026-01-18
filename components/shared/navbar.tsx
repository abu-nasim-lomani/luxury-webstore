"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import { LiveSearch } from "@/components/shared/live-search";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const scrollY = useScrollPosition();
    const { getTotalItems } = useCart();
    const { getTotalItems: getWishlistItems } = useWishlist();
    const [totalItems, setTotalItems] = useState(0);
    const [wishlistItems, setWishlistItems] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Update total items (client-side only to avoid hydration mismatch)
    useEffect(() => {
        setTotalItems(getTotalItems());
        setWishlistItems(getWishlistItems());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isScrolled = scrollY > 20;

    const navLinks = [
        { label: "Shop", href: "/products" },
        { label: "Categories", href: "/categories" },
        { label: "About", href: "/about" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: isScrolled ? 0 : -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-gray-200 dark:border-gray-800"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-heading text-3xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition-opacity z-10"
                        >
                            LUXE
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Live Search - Desktop */}
                            <div className="hidden lg:block">
                                <LiveSearch />
                            </div>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                                aria-label="Wishlist"
                            >
                                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                {wishlistItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {wishlistItems}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-20 left-0 right-0 bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 z-[90] lg:hidden overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
                            {/* Mobile Search */}
                            <div className="mb-4">
                                <LiveSearch />
                            </div>

                            {/* Mobile Navigation Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-3 px-4 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors uppercase tracking-wide"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Actions */}
                            <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-800 flex gap-4">
                                <Link
                                    href="/wishlist"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold text-gray-900 dark:text-white"
                                >
                                    <Heart className="w-5 h-5" />
                                    Wishlist ({wishlistItems})
                                </Link>
                                <Link
                                    href="/cart"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Cart ({totalItems})
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
