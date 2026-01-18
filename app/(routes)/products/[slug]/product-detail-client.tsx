"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, ChevronRight, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addItem, getItemQuantity } = useCart();
    const { toggleItem, isInWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const inWishlist = isInWishlist(product.id);
    const quantity = getItemQuantity(product.id);

    const handleAddToCart = () => {
        addItem(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleToggleWishlist = () => {
        toggleItem(product);
    };

    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: product.description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                setIsShared(true);
                setTimeout(() => setIsShared(false), 2000);
            }
        } catch (err) {
            console.log("Error sharing:", err);
        }
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/products" className="hover:text-foreground transition-colors">
                        Products
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground">{product.name}</span>
                </div>
            </div>

            {/* Product Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
                            <Image
                                src={product.images[0] || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-3 gap-4">
                                {product.images.slice(1, 4).map((image, idx) => (
                                    <div
                                        key={idx}
                                        className="relative aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                                    >
                                        <Image src={image} alt={`${product.name} ${idx + 2}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info - Sticky */}
                    <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
                        {/* Title & Price */}
                        <div>
                            {product.featured && (
                                <span className="inline-block bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-4">
                                    Featured
                                </span>
                            )}
                            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-heading font-bold">{formatPrice(product.price)}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.stock > 0 ? (
                                <>
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-sm">
                                        {product.stock < 10 ? `Only ${product.stock} left in stock` : "In Stock"}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    <span className="text-sm text-destructive">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="w-full bg-foreground text-background py-4 px-6 rounded-lg hover:opacity-90 transition-opacity font-medium uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAdded ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart {quantity > 0 && `(${quantity} in cart)`}
                                    </>
                                )}
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleToggleWishlist}
                                    className="border-2 border-border py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                                    {inWishlist ? "Saved" : "Save"}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="border-2 border-border py-3 px-6 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    {isShared ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Specifications */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="border-t border-border pt-8">
                                <h2 className="font-heading text-xl font-bold mb-4">Specifications</h2>
                                <dl className="space-y-3">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-border/50">
                                            <dt className="text-muted-foreground">{key}</dt>
                                            <dd className="font-medium">{String(value)}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
