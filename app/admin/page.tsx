"use client";

import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/card";

export default function AdminDashboard() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231",
            change: "+20.1%",
            icon: TrendingUp,
            color: "text-green-500",
        },
        {
            title: "Total Orders",
            value: "892",
            change: "+12.5%",
            icon: ShoppingCart,
            color: "text-blue-500",
        },
        {
            title: "Total Products",
            value: "234",
            change: "+8 new",
            icon: Package,
            color: "text-purple-500",
        },
        {
            title: "Total Customers",
            value: "1,429",
            change: "+32 new",
            icon: Users,
            color: "text-orange-500",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn("w-5 h-5", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-green-500">{stat.change}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium">Order #{1000 + i}</p>
                                        <p className="text-sm text-muted-foreground">Customer Name</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${(i * 100).toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Low Stock Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium">Product Name {i}</p>
                                        <p className="text-sm text-muted-foreground">SKU: PRD-{1000 + i}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            {i} left
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
