"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useDiscountBanners } from "@/store/use-discount-banners";

export function DiscountBanner() {
    const { banners, fetchActiveBanners } = useDiscountBanners();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        fetchActiveBanners();
    }, [fetchActiveBanners]);

    // Get first active banner directly
    const banner = banners.length > 0 ? banners[0] : null;

    // Countdown timer logic with useCallback
    const calculateTimeLeft = useCallback(() => {
        if (!banner?.countdown_end_date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const difference = +new Date(banner.countdown_end_date) - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }, [banner]);

    useEffect(() => {
        if (!banner?.countdown_end_date) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initialize immediately using setTimeout to avoid cascading render
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 0);

        return () => clearInterval(timer);
    }, [banner, calculateTimeLeft]);

    if (!banner) return null;

    const hasCountdown = banner.countdown_end_date && (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0);

    return (
        <section className="py-4 md:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${banner.background_gradient} p-6 md:p-8 lg:p-10 shadow-2xl`}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                        {/* Left Content - 3 columns */}
                        <div className="lg:col-span-3 text-white space-y-4">
                            {/* Discount Badge */}
                            {banner.discount_percentage && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="inline-block"
                                >
                                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/30">
                                        <p className="text-4xl md:text-5xl font-black">
                                            {banner.discount_percentage}% OFF
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Discount Text */}
                            {banner.discount_text && (
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg md:text-xl font-bold uppercase tracking-wider text-white/90"
                                >
                                    {banner.discount_text}
                                </motion.p>
                            )}

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                            >
                                {banner.title}
                            </motion.h2>

                            {/* Subtitle */}
                            {banner.subtitle && (
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl md:text-2xl font-medium text-white/90"
                                >
                                    {banner.subtitle}
                                </motion.p>
                            )}

                            {/* Description */}
                            {banner.description && (
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    className="text-base md:text-lg text-white/80 max-w-2xl"
                                >
                                    {banner.description}
                                </motion.p>
                            )}

                            {/* Countdown Timer */}
                            {hasCountdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 }}
                                    className="flex items-center gap-4"
                                >
                                    <Clock className="w-5 h-5" />
                                    <div className="flex gap-3">
                                        {timeLeft.days > 0 && (
                                            <div className="text-center">
                                                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg min-w-[60px]">
                                                    <p className="text-2xl font-bold">{timeLeft.days}</p>
                                                </div>
                                                <p className="text-xs mt-1 text-white/70">Days</p>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg min-w-[60px]">
                                                <p className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-xs mt-1 text-white/70">Hours</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg min-w-[60px]">
                                                <p className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-xs mt-1 text-white/70">Mins</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg min-w-[60px]">
                                                <p className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                                            </div>
                                            <p className="text-xs mt-1 text-white/70">Secs</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                            >
                                <Link
                                    href={banner.cta_link}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                                >
                                    {banner.cta_text}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Image - 2 columns */}
                        {banner.image_url && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="lg:col-span-2 relative h-48 md:h-56 lg:h-64"
                            >
                                <Image
                                    src={banner.image_url}
                                    alt={banner.title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
