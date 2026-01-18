"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Menu,
    X,
    Home,
    Sparkles,
    FolderTree,
    ImageIcon,
    MessageSquare,
} from "lucide-react";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: FolderTree, label: "Categories", href: "/admin/categories" },
    { icon: ImageIcon, label: "Hero Slides", href: "/admin/hero-slides" },
    { icon: Sparkles, label: "Hero Showcase", href: "/admin/hero-showcase" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: MessageSquare, label: "Support", href: "/admin/support" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Navbar */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 z-50">
                <div className="h-full px-4 flex items-center justify-between">
                    {/* Left: Menu Toggle + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? (
                                <X className="w-6 h-6 text-gray-900 dark:text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                            )}
                        </button>
                        <Link
                            href="/admin"
                            className="font-heading text-2xl font-bold text-gray-900 dark:text-white"
                        >
                            LUXE Admin
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 relative z-[101]">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">View Store</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                                    isActive
                                        ? "bg-black dark:bg-white text-white dark:text-black"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}

            {/* Main Content */}
            <main className="lg:pl-64 pt-16">
                <div className="p-6">{children}</div>
            </main>

            <Toaster position="top-right" />
        </div>
    );
}
