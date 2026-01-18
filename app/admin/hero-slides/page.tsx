"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from "lucide-react";
import { useHeroSlides, HeroSlide } from "@/store/use-hero-slides";
import { useAdminProducts } from "@/store/use-admin-products";
import { Product } from "@/lib/types";
import { toast } from "sonner";

export default function HeroSlidesPage() {
    const { slides, fetchSlides, deleteSlide, updateSlide } = useHeroSlides();
    const { getAllProducts, fetchProducts } = useAdminProducts();
    const [loading, setLoading] = useState(true);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState<Partial<HeroSlide>>({});

    useEffect(() => {
        Promise.all([fetchSlides(), fetchProducts()]).then(() => {
            setProducts(getAllProducts());
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            await deleteSlide(id);
            toast.success("Slide deleted successfully");
        } catch {
            toast.error("Failed to delete slide");
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await updateSlide(id, { is_active: !currentStatus });
            toast.success(`Slide ${!currentStatus ? "activated" : "deactivated"}`);
        } catch {
            toast.error("Failed to update slide");
        }
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setFormData(slide);
    };

    const handleCloseModal = () => {
        setEditingSlide(null);
        setFormData({});
    };

    const handleSaveEdit = async () => {
        if (!editingSlide) return;

        try {
            await updateSlide(editingSlide.id, formData);
            toast.success("Slide updated successfully");
            handleCloseModal();
        } catch {
            toast.error("Failed to update slide");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading slides...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Hero Slides
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage homepage hero slider content
                    </p>
                </div>
                <Link
                    href="/admin/hero-slides/new"
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
                >
                    <Plus className="w-5 h-5" />
                    Add New Slide
                </Link>
            </div>

            {/* Slides Table */}
            {slides.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                        No hero slides found
                    </p>
                    <Link
                        href="/admin/hero-slides/new"
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <Plus className="w-4 h-4" />
                        Create your first slide
                    </Link>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Order
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Image
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    CTA
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {slides.map((slide) => (
                                <tr key={slide.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {slide.display_order}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative w-24 h-16">
                                            <Image
                                                src={slide.image_url}
                                                alt={slide.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {slide.title}
                                            </p>
                                            {slide.subtitle && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {slide.cta_text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleActive(slide.id, slide.is_active)}
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${slide.is_active
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                }`}
                                        >
                                            {slide.is_active ? (
                                                <>
                                                    <Eye className="w-3 h-3" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="w-3 h-3" />
                                                    Inactive
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(slide)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(slide.id, slide.title)}
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingSlide && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 dark:border-gray-700">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Edit Hero Slide
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={formData.subtitle || ""}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    value={formData.image_url || ""}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                                {formData.image_url && (
                                    <div className="mt-4 relative w-full h-48">
                                        <Image
                                            src={formData.image_url}
                                            alt="Preview"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cta_text || ""}
                                        onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                        Button Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cta_link || ""}
                                        onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Product Link */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Link to Product (Optional)
                                </label>
                                <select
                                    value={formData.product_id || ""}
                                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value || null })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                >
                                    <option value="">No product link</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Display Order */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.display_order || 1}
                                    onChange={(e) =>
                                        setFormData({ ...formData, display_order: parseInt(e.target.value) })
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 p-6 flex items-center gap-4">
                            <button
                                onClick={handleSaveEdit}
                                className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-bold"
                            >
                                <Save className="w-5 h-5" />
                                Save Changes
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-bold text-gray-900 dark:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
