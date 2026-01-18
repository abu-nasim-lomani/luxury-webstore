"use client";

import { useState, useEffect } from "react";
import { useAdminProducts } from "@/store/use-admin-products";
import { useHeroShowcase } from "@/store/use-hero-showcase";
import { Product } from "@/lib/types";
import { toast } from "sonner";
import { Save, Eye, EyeOff, Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroShowcasePage() {
    const { products, fetchProducts } = useAdminProducts();
    const { settings, loading, fetchSettings, updateSettings } = useHeroShowcase();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [heroProductId, setHeroProductId] = useState<string>("");
    const [supportProduct1Id, setSupportProduct1Id] = useState<string>("");
    const [supportProduct2Id, setSupportProduct2Id] = useState<string>("");
    const [supportProduct3Id, setSupportProduct3Id] = useState<string>("");
    const [supportProduct4Id, setSupportProduct4Id] = useState<string>("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchSettings();
    }, [fetchProducts, fetchSettings]);

    useEffect(() => {
        if (settings) {
            setTitle(settings.title);
            setSubtitle(settings.subtitle);
            setIsActive(settings.is_active);
            setHeroProductId(settings.hero_product_id || "");
            setSupportProduct1Id(settings.support_product_1_id || "");
            setSupportProduct2Id(settings.support_product_2_id || "");
            setSupportProduct3Id(settings.support_product_3_id || "");
            setSupportProduct4Id(settings.support_product_4_id || "");
        }
    }, [settings]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateSettings({
                title,
                subtitle,
                is_active: isActive,
                hero_product_id: heroProductId || null,
                support_product_1_id: supportProduct1Id || null,
                support_product_2_id: supportProduct2Id || null,
                support_product_3_id: supportProduct3Id || null,
                support_product_4_id: supportProduct4Id || null,
            });
            toast.success("Hero Showcase settings saved successfully!");
        } catch (error) {
            toast.error("Failed to save settings");
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const ProductSelector = ({
        value,
        onChange,
        label
    }: {
        value: string;
        onChange: (value: string) => void;
        label: string;
    }) => {
        const selectedProduct = products.find(p => p.id === value);

        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    <option value="">-- Select Product --</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name} - ${product.price}
                        </option>
                    ))}
                </select>
                {selectedProduct && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={selectedProduct.images[0]}
                                alt={selectedProduct.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-white">
                                {selectedProduct.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                ${selectedProduct.price} • Stock: {selectedProduct.stock}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-foreground border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-purple-600" />
                        <h1 className="font-heading text-3xl font-bold tracking-tight">
                            Hero Showcase Settings
                        </h1>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Manage the top selling products section on your homepage
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Settings */}
                <div className="space-y-6">
                    {/* Section Settings Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Section Settings
                        </h2>

                        {/* Active Toggle */}
                        <div className="mb-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    Section Active
                                </span>
                                <button
                                    onClick={() => setIsActive(!isActive)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </label>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {isActive ? "Section is visible on homepage" : "Section is hidden"}
                            </p>
                        </div>

                        {/* Title Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Top Selling Products This Week"
                            />
                        </div>

                        {/* Subtitle Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Section Subtitle
                            </label>
                            <textarea
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                placeholder="Most popular items flying off the shelves"
                            />
                        </div>
                    </div>

                    {/* Hero Product Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Hero Product (Left, Large)
                        </h2>
                        <ProductSelector
                            value={heroProductId}
                            onChange={setHeroProductId}
                            label="Select Hero Product"
                        />
                    </div>
                </div>

                {/* Right Column: Support Products */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Support Products (Right, Mini Grid)
                        </h2>
                        <div className="space-y-4">
                            <ProductSelector
                                value={supportProduct1Id}
                                onChange={setSupportProduct1Id}
                                label="Support Product 1 (Top-Left)"
                            />
                            <ProductSelector
                                value={supportProduct2Id}
                                onChange={setSupportProduct2Id}
                                label="Support Product 2 (Top-Right)"
                            />
                            <ProductSelector
                                value={supportProduct3Id}
                                onChange={setSupportProduct3Id}
                                label="Support Product 3 (Bottom-Left)"
                            />
                            <ProductSelector
                                value={supportProduct4Id}
                                onChange={setSupportProduct4Id}
                                label="Support Product 4 (Bottom-Right)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
