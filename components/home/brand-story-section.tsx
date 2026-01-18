"use client";

import { motion } from "framer-motion";
import { Award, Users, Sparkles, Heart } from "lucide-react";

const values = [
    {
        icon: Award,
        title: "Premium Quality",
        description: "Handpicked products with exceptional craftsmanship",
    },
    {
        icon: Users,
        title: "Customer First",
        description: "Your satisfaction is our top priority",
    },
    {
        icon: Sparkles,
        title: "Timeless Design",
        description: "Modern aesthetics that never go out of style",
    },
    {
        icon: Heart,
        title: "Sustainable",
        description: "Eco-friendly materials and ethical sourcing",
    },
];

export function BrandStorySection() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Story Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                        Our Story
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
                        Founded with a passion for timeless design, we curate exceptional pieces
                        that transform spaces into sanctuaries.
                    </p>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Every product tells a story of craftsmanship, sustainability, and the
                        pursuit of beauty in everyday living.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full mb-4">
                                <value.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-white mb-2">
                                {value.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
