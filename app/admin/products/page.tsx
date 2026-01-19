"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Flame, Star, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useAdminProducts } from "@/store/use-admin-products";
import { toast } from "sonner";

export default function ProductsPage() {
    const { products, deleteProduct, fetchProducts, loading } = useAdminProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // eslint-disable-line
        fetchProducts(); // Fetch from database
    }, [fetchProducts]);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-foreground border-t-transparent rounded-full" />
            </div>
        );
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (product: Product) => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            deleteProduct(product.id);
            toast.success("Product deleted successfully");
        }
    };

    const handleToggleTrending = async (product: Product) => {
        try {
            const { updateProduct } = useAdminProducts.getState();
            // eslint-disable-next-line
            await updateProduct(product.id, { is_trending: !(product as any).is_trending } as any);
            // eslint-disable-next-line
            toast.success(`Product ${!(product as any).is_trending ? "marked as" : "removed from"} trending`);
        } catch {
            toast.error("Failed to update product");
        }
    };

    const handleToggleFeaturedHome = async (product: Product) => {
        try {
            const { updateProduct } = useAdminProducts.getState();
            await updateProduct(product.id, { featured: !product.featured });
            toast.success(`Product ${!product.featured ? "marked as" : "removed from"} featured`);
        } catch {
            toast.error("Failed to update product");
        }
    };

    const handleToggleHeroShowcase = async (product: Product) => {
        try {
            const { updateProduct } = useAdminProducts.getState();
            // eslint-disable-next-line
            await updateProduct(product.id, { is_hero_showcase: !(product as any).is_hero_showcase } as any);
            // eslint-disable-next-line
            toast.success(`Product ${!(product as any).is_hero_showcase ? "added to" : "removed from"} Hero Showcase`);
        } catch {
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your product inventory ({products.length} products)
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">No products yet</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border bg-secondary/50">
                                <tr>
                                    <th className="text-left p-4 font-medium text-sm">Product</th>
                                    <th className="text-left p-4 font-medium text-sm">Price</th>
                                    <th className="text-left p-4 font-medium text-sm">Stock</th>
                                    <th className="text-left p-4 font-medium text-sm">Status</th>
                                    <th className="text-center p-4 font-medium text-sm">Trending</th>
                                    <th className="text-center p-4 font-medium text-sm">Featured Home</th>
                                    <th className="text-center p-4 font-medium text-sm">Hero Showcase</th>
                                    <th className="text-right p-4 font-medium text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                    <Image
                                                        src={product.images[0] || "/placeholder.jpg"}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium">{formatPrice(product.price)}</p>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${product.stock === 0
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    : product.stock < 10
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    }`}
                                            >
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {product.featured && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-foreground text-background">
                                                    Featured
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleToggleTrending(product)}
                                                    className={`p-2 rounded-lg transition-all ${product.is_trending
                                                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                                                        : "hover:bg-secondary"
                                                        }`}
                                                    title={(product as any).is_trending ? "Remove from trending" : "Mark as trending"}
                                                >
                                                    <Flame className={`w-4 h-4 ${(product as any).is_trending ? "fill-current" : ""}`} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleToggleFeaturedHome(product)}
                                                    className={`p-2 rounded-lg transition-all ${product.featured
                                                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                        : "hover:bg-secondary"
                                                        }`}
                                                    title={product.featured ? "Remove from featured" : "Mark as featured"}
                                                >
                                                    <Star className={`w-4 h-4 ${product.featured ? "fill-current" : ""}`} />
                                                </button>
                                            </div>
                                        </td>

                                        {/* Hero Showcase Toggle */}
                                        <td>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleToggleHeroShowcase(product)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        // eslint-disable-next-line
                                                        (product as any).is_hero_showcase
                                                            ? "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
                                                            : "text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                        }`}
                                                    title={
                                                        // eslint-disable-next-line
                                                        (product as any).is_hero_showcase
                                                            ? "Remove from Hero Showcase"
                                                            : "Add to Hero Showcase"
                                                    }
                                                >
                                                    <Sparkles
                                                        className={`w-4 h-4 ${
                                                            // eslint-disable-next-line
                                                            (product as any).is_hero_showcase ? "fill-current" : ""
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredProducts.length === 0 && products.length > 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No products match your search</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Package({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
        </svg>
    );
}
