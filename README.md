# LUXE - Universal E-commerce Store

A premium, production-ready e-commerce application built with Next.js 15, featuring **Modern Industrial Minimalist** design with Apple-esque aesthetics, glassmorphism effects, and smooth animations.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Design Philosophy
- **Modern Industrial Minimalist** aesthetic
- **Monochrome color palette**: `#FAFAFA` (off-white) and `#09090b` (deep black)
- **Typography-led design** with Inter (body) and Manrope (headings)
- **Glassmorphism effects** with backdrop-blur for premium feel
- **Smooth animations** powered by Framer Motion
- **Asymmetric Bento Grid** layouts for featured products

### Core Functionality
- 🛒 **Shopping Cart** with localStorage persistence (Zustand)
- 🎨 **Premium UI Components** (Navbar, Footer, Product Cards, Cart Drawer)
- 📱 **Fully Responsive** design
- 🔍 **Product Detail Pages** with sticky info sidebar
- 💳 **Checkout Flow** with form validation
- 🎭 **Smooth Page Transitions** and hover effects
- 🌐 **Supabase Integration Ready**

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn/UI** | Base component library |
| **Supabase** | Backend & database |
| **Zustand** | State management (Cart) |
| **Framer Motion** | Animations |
| **Lucide React** | Icon library |

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account (optional for full functionality)

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd d:/HomeRemote/Project/Ecommerce/my-luxury-store
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Initialize Shadcn/UI** (if not already done)
   ```bash
   npx shadcn-ui@latest init
   ```

   When prompted:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

5. **Add required Shadcn components**
   ```bash
   npx shadcn-ui@latest add button sheet dialog
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
my-luxury-store/
├── app/
│   ├── (routes)/                    # Route groups
│   │   ├── products/[slug]/        # Product detail pages
│   │   ├── cart/                    # Cart page
│   │   └── checkout/                # Checkout page
│   ├── layout.tsx                   # Root layout with Navbar/Footer
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Global styles
├── components/
│   ├── home/
│   │   ├── hero-section.tsx        # Hero with video support
│   │   └── bento-grid.tsx          # Asymmetric product grid
│   ├── shared/
│   │   ├── navbar.tsx              # Glassmorphism navbar
│   │   ├── footer.tsx              # Minimal footer
│   │   ├── product-card.tsx        # Premium product card
│   │   └── cart-drawer.tsx         # Slide-over cart
│   └── ui/                          # Shadcn/UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Client-side Supabase
│   │   └── server.ts               # Server-side Supabase
│   ├── types.ts                     # TypeScript definitions
│   └── utils.ts                     # Utility functions
├── store/
│   └── use-cart.ts                  # Zustand cart store
├── hooks/
│   └── use-scroll-position.ts       # Scroll tracking hook
└── tailwind.config.ts               # Tailwind configuration
```

## 🎨 Design System

### Colors
```css
/* Light Mode */
Background: #FAFAFA (off-white)
Foreground: #09090b (deep black)

/* Dark Mode */
Background: #09090b (deep black)
Foreground: #FAFAFA (off-white)
```

### Typography
- **Headings**: Manrope (400-800)
- **Body**: Inter (300-900)

### Key Components
- **Glassmorphism**: `.glass` and `.glass-dark` utility classes
- **Smooth scroll**: Enabled globally in `globals.css`
- **Animations**: Framer Motion with custom easing

## 🔧 Configuration

### Tailwind CSS
Custom theme with:
- Monochrome color palette
- Custom fonts (Inter & Manrope)
- Extended animations (fade-in, scale-in, accordion)
- Glassmorphism utilities

### Zustand Cart Store
Features:
- Add/remove items
- Update quantities
- Clear cart
- localStorage persistence
- Computed totals

### Supabase Schema
Expected tables:
- `products` - id, name, slug, price, images[], specifications:jsonb, stock, featured
- `categories` - id, name, slug
- `orders` - id, user_id, total, status, items[]
- `users` - id, email, full_name

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

Make sure to add environment variables in Vercel dashboard.

## 📝 Usage Examples

### Adding Products
Currently uses mock data. To integrate with Supabase:

1. Uncomment Supabase queries in:
   - `app/page.tsx` (for featured products)
   - `app/(routes)/products/[slug]/page.tsx` (for product details)

2. Set up your Supabase database with the schema above

3. Upload product images to Supabase Storage

### Customizing Styles
1. Edit `globals.css` for color palette changes
2. Modify `tailwind.config.ts` for theme extensions
3. Update component files for layout/design changes

## 🎯 Next Steps

- [ ] Set up Supabase database schema
- [ ] Add real product data
- [ ] Implement authentication
- [ ] Integrate payment gateway (Stripe)
- [ ] Add product filtering/search
- [ ] Create admin dashboard
- [ ] Add product reviews

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

This is a template project. Fork it and make it your own!

---

**Built with ❤️ using Next.js 15 and Modern Web Technologies**
