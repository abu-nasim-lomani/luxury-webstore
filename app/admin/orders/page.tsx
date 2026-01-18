"use client";

import { useState } from "react";
import { ShoppingCart, Package, Clock, CheckCircle } from "lucide-react";

interface Order {
    id: string;
    orderNumber: string;
    customer: string;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    items: number;
    date: string;
}

const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "#1001",
        customer: "John Doe",
        total: 599,
        status: "delivered",
        items: 2,
        date: "2024-01-15",
    },
    {
        id: "2",
        orderNumber: "#1002",
        customer: "Jane Smith",
        total: 1248,
        status: "processing",
        items: 5,
        date: "2024-01-16",
    },
    {
        id: "3",
        orderNumber: "#1003",
        customer: "Bob Johnson",
        total: 349,
        status: "pending",
        items: 1,
        date: "2024-01-17",
    },
];

const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: Clock },
    processing: { label: "Processing", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: Package },
    shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", icon: ShoppingCart },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: CheckCircle },
    cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", icon: Clock },
};

export default function OrdersPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [orders] = useState<Order[]>(mockOrders);

    const filteredOrders = selectedStatus === "all"
        ? orders
        : orders.filter((order) => order.status === selectedStatus);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground mt-2">Manage and track customer orders</p>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedStatus("all")}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${selectedStatus === "all"
                            ? "bg-foreground text-background"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                >
                    All Orders
                </button>
                {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedStatus(key)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${selectedStatus === key
                                ? "bg-foreground text-background"
                                : "bg-secondary hover:bg-secondary/80"
                            }`}
                    >
                        {config.label}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-border bg-secondary/50">
                            <tr>
                                <th className="text-left p-4 font-medium text-sm">Order</th>
                                <th className="text-left p-4 font-medium text-sm">Customer</th>
                                <th className="text-left p-4 font-medium text-sm">Items</th>
                                <th className="text-left p-4 font-medium text-sm">Total</th>
                                <th className="text-left p-4 font-medium text-sm">Status</th>
                                <th className="text-left p-4 font-medium text-sm">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const StatusIcon = statusConfig[order.status].icon;
                                return (
                                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer">
                                        <td className="p-4">
                                            <p className="font-medium">{order.orderNumber}</p>
                                        </td>
                                        <td className="p-4">
                                            <p>{order.customer}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-muted-foreground">{order.items} items</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium">${order.total.toFixed(2)}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${statusConfig[order.status].color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig[order.status].label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-muted-foreground">{order.date}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
