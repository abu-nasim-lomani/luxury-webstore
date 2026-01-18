import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/types';

interface WishlistStore {
    items: Product[];

    // Actions
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    toggleItem: (product: Product) => void;
    clearWishlist: () => void;

    // Computed values
    isInWishlist: (productId: string) => boolean;
    getTotalItems: () => number;
}

export const useWishlist = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                set((state) => {
                    const exists = state.items.find((item) => item.id === product.id);
                    if (exists) return state;

                    return {
                        items: [...state.items, product],
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },

            toggleItem: (product) => {
                const isInList = get().isInWishlist(product.id);
                if (isInList) {
                    get().removeItem(product.id);
                } else {
                    get().addItem(product);
                }
            },

            clearWishlist: () => {
                set({ items: [] });
            },

            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            getTotalItems: () => {
                return get().items.length;
            },
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
