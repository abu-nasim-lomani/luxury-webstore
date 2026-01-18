"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
        useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // eslint-disable-line
    }, []);

    if (!mounted) return null;

    const total = getTotalPrice();
    const itemCount = getTotalItems();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-background shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h2 className="font-heading text-2xl font-bold">Your Cart</h2>
                                <p className="text-sm text-muted-foreground">
                                    {itemCount} {itemCount === 1 ? "item" : "items"}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                                    <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
                                    <div>
                                        <p className="font-heading text-lg font-semibold mb-1">
                                            Your cart is empty
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Add some products to get started
                                        </p>
                                    </div>
                                    <Link
                                        href="/products"
                                        onClick={onClose}
                                        className="mt-4 bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex gap-4 bg-card border border-border rounded-lg p-4"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                <Image
                                                    src={item.product.images[0] || "/placeholder.jpg"}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm line-clamp-1 mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm font-semibold">
                                                    {formatPrice(item.product.price)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="w-7 h-7 rounded-md border border-border hover:bg-secondary transition-colors flex items-center justify-center"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        disabled={item.quantity >= item.product.stock}
                                                        className="w-7 h-7 rounded-md border border-border hover:bg-secondary transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="self-start p-1 hover:text-destructive transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-border p-6 space-y-4">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between text-lg">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-heading font-bold">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Shipping and taxes calculated at checkout
                                </p>

                                {/* Checkout Button */}
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="block w-full bg-foreground text-background text-center py-4 rounded-lg hover:opacity-90 transition-opacity font-medium uppercase tracking-wide"
                                >
                                    Checkout
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="block w-full text-center py-3 text-sm hover:opacity-70 transition-opacity"
                                >
                                    View Full Cart
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
