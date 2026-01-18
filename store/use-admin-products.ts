import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category_id: string;
    specifications: Record<string, unknown>;
    stock: number;
    featured: boolean;
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
    created_at: string;
    updated_at: string;
}

interface AdminProductsStore {
    products: Product[];
    loading: boolean;

    // Actions
    fetchProducts: () => Promise<void>;
    addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // Getters
    getProductById: (id: string) => Product | undefined;
    getAllProducts: () => Product[];
}

export const useAdminProducts = create<AdminProductsStore>((set, get) => ({
    products: [],
    loading: false,

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            set({ products: data || [], loading: false });
        } catch (error: any) {
            console.error('Error fetching products:', error.message || error);
            set({ loading: false });
        }
    },

    addProduct: async (productData) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([productData])
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                products: [data, ...state.products],
            }));
        } catch (error: any) {
            console.error('Error adding product:', error.message || error);
            throw error;
        }
    },

    updateProduct: async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? data : product
                ),
            }));
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;

            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    getProductById: (id) => {
        return get().products.find((product) => product.id === id);
    },

    getAllProducts: () => {
        return get().products;
    },
}));
