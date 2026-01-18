import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { DiscountBanner } from "@/lib/types";

interface DiscountBannersStore {
    banners: DiscountBanner[];
    loading: boolean;

    // Fetch active banners
    fetchActiveBanners: () => Promise<void>;

    // Fetch all banners (for admin)
    fetchAllBanners: () => Promise<void>;

    // Get first active banner
    getActiveBanner: () => DiscountBanner | null;
}

export const useDiscountBanners = create<DiscountBannersStore>((set, get) => ({
    banners: [],
    loading: false,

    fetchActiveBanners: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from("discount_banners")
                .select("*")
                .eq("is_active", true)
                .order("display_order", { ascending: true });

            if (error) throw error;
            set({ banners: data || [], loading: false });
        } catch (error) {
            console.error("Error fetching active discount banners:", error);
            set({ loading: false });
        }
    },

    fetchAllBanners: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from("discount_banners")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            set({ banners: data || [], loading: false });
        } catch (error) {
            console.error("Error fetching all discount banners:", error);
            set({ loading: false });
        }
    },

    getActiveBanner: () => {
        const banners = get().banners;
        return banners.length > 0 ? banners[0] : null;
    },
}));
