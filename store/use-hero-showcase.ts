import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { HeroShowcaseSettings, Product } from "@/lib/types";

interface HeroShowcaseStore {
    settings: HeroShowcaseSettings | null;
    loading: boolean;

    // Fetch settings
    fetchSettings: () => Promise<void>;

    // Update settings
    updateSettings: (updates: Partial<HeroShowcaseSettings>) => Promise<void>;

    // Get products for display
    getHeroProduct: (products: Product[]) => Product | null;
    getSupportProducts: (products: Product[]) => Product[];
}

export const useHeroShowcase = create<HeroShowcaseStore>((set, get) => ({
    settings: null,
    loading: false,

    fetchSettings: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from("hero_showcase_settings")
                .select("*")
                .single();

            if (error) throw error;
            set({ settings: data, loading: false });
        } catch (error) {
            console.error("Error fetching hero showcase settings:", error);
            set({ loading: false });
        }
    },

    updateSettings: async (updates) => {
        const currentSettings = get().settings;
        if (!currentSettings) return;

        try {
            const { data, error } = await supabase
                .from("hero_showcase_settings")
                .update({
                    ...updates,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", currentSettings.id)
                .select()
                .single();

            if (error) throw error;
            set({ settings: data });
        } catch (error) {
            console.error("Error updating hero showcase settings:", error);
            throw error;
        }
    },

    getHeroProduct: (products) => {
        const settings = get().settings;
        if (!settings?.hero_product_id) return null;
        return products.find((p) => p.id === settings.hero_product_id) || null;
    },

    getSupportProducts: (products) => {
        const settings = get().settings;
        if (!settings) return [];

        const supportIds = [
            settings.support_product_1_id,
            settings.support_product_2_id,
            settings.support_product_3_id,
            settings.support_product_4_id,
        ].filter(Boolean) as string[];

        // Remove duplicates and filter out hero product
        const uniqueIds = Array.from(new Set(supportIds)).filter(
            id => id !== settings.hero_product_id
        );

        return uniqueIds
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean) as Product[];
    },
}));
