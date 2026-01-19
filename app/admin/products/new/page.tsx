"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { useAdminProducts } from "@/store/use-admin-products";
import { toast } from "sonner";

export default function NewProductPage() {
    const router = useRouter();
    const { addProduct } = useAdminProducts();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        featured: false,
        // SEO Fields
        meta_title: "",
        meta_description: "",
        keywords: "",
    });

    const [images, setImages] = useState<string[]>([]);
    const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([
        { key: "", value: "" },
    ]);

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        });
    };

    // Handle image URL input
    const handleAddImage = () => {
        const url = prompt("Enter image URL:");
        if (url) {
            setImages([...images, url]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Handle specifications
    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        const newSpecs = [...specifications];
        newSpecs[index][field] = value;
        setSpecifications(newSpecs);
    };

    const handleAddSpec = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };

    const handleRemoveSpec = (index: number) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.price || !formData.stock) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Convert specifications to object
        const specsObject: Record<string, unknown> = {};
        specifications.forEach((spec) => {
            if (spec.key && spec.value) {
                specsObject[spec.key] = spec.value;
            }
        });

        // Create product
        addProduct({
            name: formData.name,
            slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
            description: formData.description,
            price: parseFloat(formData.price),
            images: images.length > 0 ? images : ["/placeholder.jpg"],
            category_id: formData.category_id || "uncategorized",
            specifications: specsObject,
            stock: parseInt(formData.stock),
            featured: formData.featured,
            // Add SEO metadata to specifications
            meta_title: formData.meta_title,
            meta_description: formData.meta_description,
            keywords: formData.keywords,
        } as any);

        toast.success("Product created successfully!");
        router.push("/admin/products");
    };

    return (
        <div className="max-w-5xl space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="font-heading text-3xl font-bold tracking-tight">Add New Product</h1>
                    <p className="text-muted-foreground mt-2">Create a new product with SEO optimization</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="font-heading text-xl font-semibold">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Product Name <span className="text-destructive">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="slug" className="block text-sm font-medium mb-2">
                                URL Slug <span className="text-muted-foreground text-xs">(auto-generated)</span>
                            </label>
                            <input
                                id="slug"
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                placeholder="product-url-slug"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="font-heading text-xl font-semibold">Product Images</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative aspect-square bg-secondary rounded-lg overflow-hidden group">
                                <Image unoptimized src={image} alt={`Product ${index + 1}`} fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-secondary transition-colors"
                        >
                            <Upload className="w-6 h-6 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Add Image</span>
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Click to add image URLs (Unsplash recommended)</p>
                </div>

                {/* Pricing & Inventory */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="font-heading text-xl font-semibold">Pricing & Inventory</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-2">
                                Price <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full pl-8 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium mb-2">
                                Stock <span className="text-destructive">*</span>
                            </label>
                            <input
                                id="stock"
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                            >
                                <option value="">Select category</option>
                                <option value="furniture">Furniture</option>
                                <option value="decor">Decor</option>
                                <option value="lighting">Lighting</option>
                                <option value="textiles">Textiles</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading text-xl font-semibold">Specifications</h2>
                        <button
                            type="button"
                            onClick={handleAddSpec}
                            className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                            <Plus className="w-4 h-4" />
                            Add Field
                        </button>
                    </div>

                    <div className="space-y-3">
                        {specifications.map((spec, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                    placeholder="Key (e.g., Material)"
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                />
                                <input
                                    type="text"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                    placeholder="Value (e.g., Oak Wood)"
                                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpec(index)}
                                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="font-heading text-xl font-semibold">SEO Optimization</h2>

                    <div>
                        <label htmlFor="meta_title" className="block text-sm font-medium mb-2">
                            Meta Title
                        </label>
                        <input
                            id="meta_title"
                            type="text"
                            value={formData.meta_title}
                            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                            placeholder="SEO optimized title"
                            maxLength={60}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{formData.meta_title.length}/60 characters</p>
                    </div>

                    <div>
                        <label htmlFor="meta_description" className="block text-sm font-medium mb-2">
                            Meta Description
                        </label>
                        <textarea
                            id="meta_description"
                            rows={3}
                            value={formData.meta_description}
                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
                            placeholder="SEO meta description"
                            maxLength={160}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{formData.meta_description.length}/160 characters</p>
                    </div>

                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium mb-2">
                            Keywords / Tags
                        </label>
                        <input
                            id="keywords"
                            type="text"
                            value={formData.keywords}
                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                            placeholder="furniture, modern, minimalist, oak"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Separate keywords with commas</p>
                    </div>
                </div>

                {/* Options */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                    <h2 className="font-heading text-xl font-semibold">Product Options</h2>

                    <div className="flex items-center gap-3">
                        <input
                            id="featured"
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-4 h-4 border-border rounded focus:ring-2 focus:ring-foreground/20"
                        />
                        <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                            Feature this product on the homepage
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                        Create Product
                    </button>
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors font-medium"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
