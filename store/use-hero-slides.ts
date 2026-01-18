import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    image_url: string;
    cta_text: string;
    cta_link: string;
    product_id: string | null;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface HeroSlidesState {
    slides: HeroSlide[];
    loading: boolean;
    error: string | null;
    fetchSlides: () => Promise<void>;
    getActiveSlides: () => HeroSlide[];
    getAllSlides: () => HeroSlide[];
    addSlide: (slide: Omit<HeroSlide, "id" | "created_at" | "updated_at">) => Promise<void>;
    updateSlide: (id: string, slide: Partial<HeroSlide>) => Promise<void>;
    deleteSlide: (id: string) => Promise<void>;
    reorderSlides: (slides: HeroSlide[]) => Promise<void>;
}

export const useHeroSlides = create<HeroSlidesState>((set, get) => ({
    slides: [],
    loading: false,
    error: null,

    fetchSlides: async () => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("hero_slides")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            set({ slides: data || [], loading: false });
        } catch (error) {
            console.error("Error fetching hero slides:", error);
            set({ error: (error as Error).message, loading: false });
        }
    },

    getActiveSlides: () => {
        return get().slides.filter((slide) => slide.is_active);
    },

    getAllSlides: () => {
        return get().slides;
    },

    addSlide: async (slideData) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("hero_slides")
                .insert([slideData])
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                slides: [...state.slides, data],
                loading: false,
            }));
        } catch (error) {
            console.error("Error adding hero slide:", error);
            set({ error: (error as Error).message, loading: false });
            throw error;
        }
    },

    updateSlide: async (id, slideData) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await supabase
                .from("hero_slides")
                .update({ ...slideData, updated_at: new Date().toISOString() })
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                slides: state.slides.map((slide) => (slide.id === id ? data : slide)),
                loading: false,
            }));
        } catch (error) {
            console.error("Error updating hero slide:", error);
            set({ error: (error as Error).message, loading: false });
            throw error;
        }
    },

    deleteSlide: async (id) => {
        set({ loading: true, error: null });
        try {
            const { error } = await supabase.from("hero_slides").delete().eq("id", id);

            if (error) throw error;

            set((state) => ({
                slides: state.slides.filter((slide) => slide.id !== id),
                loading: false,
            }));
        } catch (error) {
            console.error("Error deleting hero slide:", error);
            set({ error: (error as Error).message, loading: false });
            throw error;
        }
    },

    reorderSlides: async (reorderedSlides) => {
        set({ loading: true, error: null });
        try {
            // Update display_order for all slides
            const updates = reorderedSlides.map((slide, index) =>
                supabase
                    .from("hero_slides")
                    .update({ display_order: index + 1 })
                    .eq("id", slide.id)
            );

            await Promise.all(updates);

            set({ slides: reorderedSlides, loading: false });
        } catch (error) {
            console.error("Error reordering hero slides:", error);
            set({ error: (error as Error).message, loading: false });
            throw error;
        }
    },
}));
