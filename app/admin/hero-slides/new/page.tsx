"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Eye, Info } from "lucide-react";
import { useHeroSlides } from "@/store/use-hero-slides";
import { useAdminProducts } from "@/store/use-admin-products";
import { Product } from "@/lib/types";
import { toast } from "sonner";

export default function NewHeroSlidePage() {
    const router = useRouter();
    const { addSlide } = useHeroSlides();
    const { getAllProducts, fetchProducts } = useAdminProducts();

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        image_url: "",
        cta_text: "Shop Now",
        cta_link: "/products",
        product_id: "",
        display_order: 1,
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(() => {
            setProducts(getAllProducts());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addSlide({
                ...formData,
                product_id: formData.product_id || null,
            });
            toast.success("Hero slide created successfully");
            router.push("/admin/hero-slides");
        } catch {
            toast.error("Failed to create hero slide");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/hero-slides"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Hero Slides
                </Link>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Create New Hero Slide
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Design an engaging slide for your homepage hero section
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Fields - Left Column (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Content Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-bold">
                                    1
                                </span>
                                Content
                            </h2>

                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                        placeholder="Welcome to LUXE"
                                    />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Info className="w-4 h-4" />
                                        Main headline that grabs attention
                                    </p>
                                </div>

                                {/* Subtitle */}
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                        placeholder="Premium Collection 2024"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all resize-none"
                                        placeholder="Discover our curated selection of timeless pieces..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </span>
                                Image
                            </h2>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                    placeholder="https://images.unsplash.com/..."
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Info className="w-4 h-4" />
                                    Recommended: 1920x1080px (16:9 ratio)
                                </p>
                            </div>
                        </div>

                        {/* Call to Action Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </span>
                                Call to Action
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cta_text}
                                            onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                            placeholder="Shop Now"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                            Button Link
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cta_link}
                                            onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                            placeholder="/products"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Link to Specific Product (Optional)
                                    </label>
                                    <select
                                        value={formData.product_id}
                                        onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                    >
                                        <option value="">No product link</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Settings Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-bold">
                                    4
                                </span>
                                Settings
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.display_order}
                                        onChange={(e) =>
                                            setFormData({ ...formData, display_order: parseInt(e.target.value) })
                                        }
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Status
                                    </label>
                                    <label className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_active}
                                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300"
                                        />
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            Active (visible on homepage)
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-bold text-lg disabled:opacity-50 shadow-lg"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? "Creating..." : "Create Slide"}
                            </button>
                            <Link
                                href="/admin/hero-slides"
                                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-gray-900 dark:text-white"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>

                    {/* Preview - Right Column (1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Live Preview
                                </h3>

                                {/* Preview Container */}
                                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                                    {formData.image_url ? (
                                        <>
                                            <Image
                                                src={formData.image_url}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                                            <div className="absolute inset-0 p-6 flex flex-col justify-center">
                                                {formData.subtitle && (
                                                    <p className="text-white/90 text-xs mb-2">{formData.subtitle}</p>
                                                )}
                                                {formData.title && (
                                                    <h2 className="text-white font-bold text-xl mb-2 leading-tight">
                                                        {formData.title}
                                                    </h2>
                                                )}
                                                {formData.description && (
                                                    <p className="text-white/80 text-xs mb-3 line-clamp-2">
                                                        {formData.description}
                                                    </p>
                                                )}
                                                {formData.cta_text && (
                                                    <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold w-fit">
                                                        {formData.cta_text}
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                            <div className="text-center">
                                                <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p className="text-sm">Add an image to see preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                    This is how your slide will appear on the homepage
                                </p>
                            </div>

                            {/* Tips */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6">
                                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
                                    💡 Tips
                                </h3>
                                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                    <li>• Use high-quality images (1920x1080px)</li>
                                    <li>• Keep titles short and impactful</li>
                                    <li>• Test CTA buttons for clarity</li>
                                    <li>• Order slides by importance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
