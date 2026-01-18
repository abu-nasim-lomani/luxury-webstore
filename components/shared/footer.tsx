import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
    const footerLinks = {
        shop: [
            { label: "All Products", href: "/products" },
            { label: "Categories", href: "/categories" },
            { label: "New Arrivals", href: "/products?filter=new" },
            { label: "Best Sellers", href: "/products?filter=popular" },
        ],
        support: [
            { label: "Contact Us", href: "/contact" },
            { label: "FAQs", href: "/faq" },
            { label: "Shipping & Returns", href: "/shipping" },
            { label: "Size Guide", href: "/size-guide" },
        ],
        company: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Facebook, href: "#", label: "Facebook" },
    ];

    return (
        <footer className="bg-foreground text-background mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <Link
                            href="/"
                            className="font-heading text-5xl md:text-6xl font-bold tracking-tight inline-block mb-6"
                        >
                            LUXE
                        </Link>
                        <p className="text-background/70 text-lg leading-relaxed mb-8 max-w-md">
                            Curated excellence for the discerning. Experience premium quality
                            in every detail.
                        </p>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h3 className="font-heading text-sm uppercase tracking-widest">
                                Stay Updated
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-background/10 border border-background/20 rounded-lg px-4 py-3 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/30 transition-all"
                                />
                                <button className="bg-background text-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Shop */}
                        <div>
                            <h3 className="font-heading text-sm uppercase tracking-widest mb-6">
                                Shop
                            </h3>
                            <ul className="space-y-4">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-background/70 hover:text-background transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="font-heading text-sm uppercase tracking-widest mb-6">
                                Support
                            </h3>
                            <ul className="space-y-4">
                                {footerLinks.support.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-background/70 hover:text-background transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="font-heading text-sm uppercase tracking-widest mb-6">
                                Company
                            </h3>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-background/70 hover:text-background transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-background/50 text-sm">
                        © {new Date().getFullYear()} LUXE. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
