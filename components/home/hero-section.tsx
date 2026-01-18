"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary to-background">
            {/* Background Video/Image Container */}
            <div className="absolute inset-0 z-0">
                {/* Video Background - Uncomment and add video source when ready */}
                {/* <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video> */}

                {/* Fallback gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-secondary opacity-60" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Overline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground font-medium"
                    >
                        Timeless Design
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
                    >
                        Curated
                        <br />
                        <span className="italic font-light">Excellence</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover a meticulously selected collection of premium products.
                        Where minimalism meets sophistication.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                    >
                        <Link
                            href="/products"
                            className="group bg-foreground text-background px-8 py-4 rounded-lg hover:opacity-90 transition-all font-medium uppercase tracking-wide flex items-center gap-2"
                        >
                            Explore Collection
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/categories"
                            className="px-8 py-4 rounded-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all font-medium uppercase tracking-wide"
                        >
                            Shop by Category
                        </Link>
                    </motion.div>

                    {/* Stats - Optional */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16 border-t border-border/50 mt-16"
                    >
                        <div>
                            <p className="font-heading text-3xl md:text-4xl font-bold mb-1">
                                500+
                            </p>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide">
                                Products
                            </p>
                        </div>
                        <div>
                            <p className="font-heading text-3xl md:text-4xl font-bold mb-1">
                                50k+
                            </p>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide">
                                Customers
                            </p>
                        </div>
                        <div>
                            <p className="font-heading text-3xl md:text-4xl font-bold mb-1">
                                4.9
                            </p>
                            <p className="text-sm text-muted-foreground uppercase tracking-wide">
                                Rating
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-foreground rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-foreground rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
