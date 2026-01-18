"use client";

import { Users, TrendingUp, ShoppingBag } from "lucide-react";

interface Customer {
    id: string;
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
    joinedDate: string;
}

const mockCustomers: Customer[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        totalOrders: 12,
        totalSpent: 3456,
        joinedDate: "2023-12-01",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        totalOrders: 8,
        totalSpent: 2145,
        joinedDate: "2024-01-05",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        totalOrders: 5,
        totalSpent: 1234,
        joinedDate: "2024-01-10",
    },
];

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="font-heading text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground mt-2">View and manage your customers</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Customers</p>
                            <p className="text-2xl font-bold mt-1">1,429</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                            <p className="text-2xl font-bold mt-1">$324</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Repeat Customers</p>
                            <p className="text-2xl font-bold mt-1">68%</p>
                        </div>
                        <ShoppingBag className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-border bg-secondary/50">
                            <tr>
                                <th className="text-left p-4 font-medium text-sm">Customer</th>
                                <th className="text-left p-4 font-medium text-sm">Email</th>
                                <th className="text-left p-4 font-medium text-sm">Orders</th>
                                <th className="text-left p-4 font-medium text-sm">Total Spent</th>
                                <th className="text-left p-4 font-medium text-sm">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <p className="font-medium">{customer.name}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-muted-foreground">{customer.email}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium">{customer.totalOrders}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-medium">${customer.totalSpent.toFixed(2)}</p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-sm text-muted-foreground">{customer.joinedDate}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
