"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    // Hydration fix: Only render client-side cart after mount
    useEffect(() => {
        setMounted(true); // eslint-disable-line
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-foreground border-t-transparent rounded-full" />
            </div>
        );
    }

    const total = getTotalPrice();
    const itemCount = getTotalItems();

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground">
                        {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
                                <svg
                                    className="w-12 h-12 text-muted-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-heading text-2xl font-bold mb-2">Your cart is empty</h2>
                                <p className="text-muted-foreground">
                                    Looks like you haven&apos;t added anything to your cart yet
                                </p>
                            </div>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-lg hover:opacity-90 transition-opacity font-medium uppercase tracking-wide"
                            >
                                Start Shopping
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-6 bg-card border border-border rounded-lg p-6"
                                >
                                    {/* Image */}
                                    <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                        <Image
                                            src={item.product.images[0] || "/placeholder.jpg"}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="font-heading text-xl font-semibold hover:opacity-70 transition-opacity"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {item.product.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-10 h-10 rounded-md border-2 border-border hover:bg-secondary transition-colors flex items-center justify-center"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-medium text-lg">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.product.stock}
                                                    className="w-10 h-10 rounded-md border-2 border-border hover:bg-secondary transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <p className="font-heading text-2xl font-bold">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatPrice(item.product.price)} each
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="text-sm text-destructive hover:underline flex items-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart */}
                            <button
                                onClick={clearCart}
                                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                            >
                                Clear entire cart
                            </button>
                        </div>

                        {/* Order Summary - Sticky */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                                <h2 className="font-heading text-2xl font-bold">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-base">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-heading text-xl font-bold">Total</span>
                                        <span className="font-heading text-3xl font-bold">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full bg-foreground text-background text-center py-4 rounded-lg hover:opacity-90 transition-opacity font-medium uppercase tracking-wide"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/products"
                                    className="block w-full text-center py-3 text-sm hover:opacity-70 transition-opacity"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
