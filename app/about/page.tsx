"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Sparkles, Globe, ArrowRight } from "lucide-react";

const values = [
    {
        icon: Award,
        title: "Premium Quality",
        description: "Every product is carefully curated and tested to meet our high standards of excellence.",
    },
    {
        icon: Heart,
        title: "Customer Obsessed",
        description: "Your satisfaction drives everything we do. We're here to make your experience exceptional.",
    },
    {
        icon: Sparkles,
        title: "Timeless Design",
        description: "We believe in products that transcend trends and remain beautiful for years to come.",
    },
    {
        icon: Globe,
        title: "Sustainable",
        description: "Committed to eco-friendly materials and ethical sourcing for a better tomorrow.",
    },
];

const milestones = [
    { year: "2020", title: "Founded", description: "Started with a vision to redefine online shopping" },
    { year: "2021", title: "1000+ Products", description: "Expanded our curated collection" },
    { year: "2022", title: "50K Customers", description: "Reached a major milestone in customer satisfaction" },
    { year: "2024", title: "Global Expansion", description: "Now serving customers worldwide" },
];

const team = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
        name: "Michael Chen",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
        name: "Emma Williams",
        role: "Product Director",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
        name: "David Lee",
        role: "Customer Experience",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920&h=1080&fit=crop"
                        alt="About us"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-heading text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Crafting exceptional experiences through timeless design and uncompromising quality
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                                Redefining Modern Living
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Founded in 2020, LUXE was born from a simple belief: that everyday objects should be
                                both beautiful and functional. We curate products that stand the test of time,
                                combining exceptional craftsmanship with contemporary design.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                Our mission is to transform spaces into sanctuaries, where every piece tells a story
                                and brings joy to daily living. We partner with artisans and designers who share our
                                commitment to quality and sustainability.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[500px] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=1000&fit=crop"
                                alt="Our mission"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-full mb-6">
                                    <value.icon className="w-8 h-8 text-white dark:text-black" />
                                </div>
                                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Our Journey
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Key milestones in our growth story
                        </p>
                    </motion.div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-8"
                            >
                                <div className="flex-shrink-0 w-24 text-right">
                                    <span className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
                                        {milestone.year}
                                    </span>
                                </div>
                                <div className="flex-shrink-0 w-4 h-4 bg-black dark:bg-white rounded-full" />
                                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                                    <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            Meet Our Team
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The passionate people behind LUXE
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-colors">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                                    />
                                </div>
                                <h3 className="font-heading text-xl font-bold mb-1 text-gray-900 dark:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Explore our curated collection and discover pieces that inspire
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                        >
                            Shop Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
