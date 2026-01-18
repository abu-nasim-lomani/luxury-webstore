"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Check, Truck, Shield, ArrowLeft, Share2 } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAdminProducts } from "@/store/use-admin-products";
import { useCart } from "@/store/use-cart";
import { ProductCard } from "@/components/shared/product-card";
import { toast } from "sonner";

export default function ProductDetailsPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const { addItem } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(() => {
            const products = getAllProducts();
            const foundProduct = products.find((p) => p.slug === slug);

            if (foundProduct) {
                setProduct(foundProduct);
                // Get related products from same category
                const related = products
                    .filter((p) => p.category_id === foundProduct.category_id && p.id !== foundProduct.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            }
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
            toast.success(`Added ${quantity}x ${product.name} to cart`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h1>
                    <Link href="/products" className="text-blue-600 hover:underline">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
            {/* Breadcrumb */}
            <div className="bg-gray-50 dark:bg-gray-800 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-black dark:hover:text-white">Products</Link>
                        <span>/</span>
                        <span className="text-black dark:text-white">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-4"
                        >
                            <Image
                                src={product.images[selectedImage] || product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.featured && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                                    Featured
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                                                ? "border-black dark:border-white"
                                                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                            }`}
                                    >
                                        <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-6">
                            {product.stock > 0 ? (
                                <>
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                        {product.stock < 10 ? `Only ${product.stock} left in stock` : "In Stock"}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                    <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Quantity Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="px-8 py-3 border-x-2 border-gray-300 dark:border-gray-600 min-w-[80px] text-center font-bold text-gray-900 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        disabled={quantity >= product.stock}
                                        className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 px-8 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Heart className="w-6 h-6 text-gray-900 dark:text-white" />
                            </button>
                            <button className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Share2 className="w-6 h-6 text-gray-900 dark:text-white" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Free Shipping</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">On orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Secure Payment</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">100% protected</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Quality Guarantee</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Premium materials</p>
                                </div>
                            </div>
                        </div>

                        {/* Specifications */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-8">
                                <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    Specifications
                                </h2>
                                <dl className="space-y-3">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                            <dt className="font-medium text-gray-600 dark:text-gray-400">{key}</dt>
                                            <dd className="font-semibold text-gray-900 dark:text-white">{String(value)}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <h2 className="font-heading text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
