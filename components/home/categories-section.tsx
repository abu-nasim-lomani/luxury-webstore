"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Sofa, Lightbulb, Frame } from "lucide-react";

const categories = [
    {
        id: "furniture",
        name: "Furniture",
        description: "Premium seating & tables",
        icon: Sofa,
        color: "from-blue-500/20 to-purple-500/20",
    },
    {
        id: "lighting",
        name: "Lighting",
        description: "Modern lamps & fixtures",
        icon: Lightbulb,
        color: "from-yellow-500/20 to-orange-500/20",
    },
    {
        id: "decor",
        name: "Decor",
        description: "Elegant accessories",
        icon: Frame,
        color: "from-green-500/20 to-teal-500/20",
    },
    {
        id: "all",
        name: "All Products",
        description: "Browse everything",
        icon: Package,
        color: "from-pink-500/20 to-red-500/20",
    },
];

export function CategoriesSection() {
    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-muted-foreground">
                        Explore our curated collections
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/products?category=${category.id}`}
                                className="group"
                            >
                                <div className={`relative overflow-hidden rounded-xl p-8 h-full bg-gradient-to-br ${category.color} border border-border hover:border-foreground/20 transition-all duration-300`}>
                                    <div className="relative z-10">
                                        <category.icon className="w-12 h-12 mb-4 text-foreground group-hover:scale-110 transition-transform" />
                                        <h3 className="font-heading text-xl font-bold mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
