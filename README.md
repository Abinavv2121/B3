# Radiant Threads - Fashion E-commerce Website

A modern, responsive fashion e-commerce website built with React, TypeScript, and Tailwind CSS. This project showcases traditional Indian ethnic wear with a contemporary design approach.

## 🌟 Features

### **Navigation & User Experience**

- **Glass Morphism Navigation**: Dynamic navigation bar with glass morphism effect that adapts to scroll position
- **Supportive Toolbar**: Category navigation with hover popups for easy product discovery
- **Search Functionality**: Comprehensive search modal with real-time product filtering
- **Shopping Cart**: Full-featured cart page with product management

### **Product Categories**

- **Bridal Collections**: Exquisite bridal wear for special occasions
- **Salwar Suits**: Traditional and modern salwar suit designs
- **Anarkalis**: Flowing anarkali suits with elegant designs
- **Lehengas**: Festive and party wear lehengas
- **Sarees**: Traditional silk and designer sarees
- **Western Wear**: Contemporary western outfits with ethnic touches

### **Interactive Components**

- **Hero Section**: Dynamic rotating text with stunning imagery
- **Category Showcase**: Interactive product category cards
- **Featured Products**: Product grid with filtering capabilities
- **Auto-scroll Carousel**: Smooth product carousel with elegant animations
- **Product Cards**: Detailed product information with hover effects

### **Design Features**

- **Responsive Design**: Optimized for all device sizes
- **Modern UI/UX**: Clean, elegant interface with smooth animations
- **Glass Morphism Effects**: Contemporary design elements
- **Color Scheme**: Cultural color palette with modern aesthetics
- **Premium Typography**: Custom font combinations including Italiana, Playfair Display, and Inter

## 🚀 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and building
- **UI Components**: Custom component library with shadcn/ui
- **Routing**: React Router for navigation
- **State Management**: React hooks for local state
- **Database**: Supabase for backend services
- **Icons**: Lucide React for consistent iconography

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/radiant-threads.git
   cd radiant-threads
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
radiant-threads/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── assets/             # Images and static files
│   └── index.css           # Global styles
├── public/                 # Public assets
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors

- **Primary**: Deep Emerald (`#15803d`)
- **Secondary**: Rose Gold (`#fbbf24`)
- **Accent**: Deep Ruby (`#b91c1c`)
- **Background**: Creamy Ivory (`#FDF9F6`)

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Navigation**: Italiana (serif)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Structure

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the established naming conventions
- Add JSDoc comments for complex functions

### Styling

- Use Tailwind CSS classes
- Create custom components for reusable styles
- Maintain consistent spacing and typography
- Test responsive design across devices

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📞 Contact

- **Email**: B3fashionstudios@gmail.com
- **Phone**: 9884091314 / 044-42661314
- **Address**: 14, 285, Purasaivakkam High Rd, Perumalpet, Purasaiwakkam, Chennai, Tamil Nadu 600007

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for B3 Premium Ethnic Wear**

- **Icons**: Lucide React icons
- **Animations**: CSS transitions and transforms

## 📁 Project Structure

```
radiant-threads-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── Navigation.tsx  # Main navigation bar
│   │   ├── SearchModal.tsx # Search functionality
│   │   ├── Cart.tsx        # Shopping cart page
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Cart.tsx        # Cart page
│   │   └── ...
│   ├── assets/             # Images and static files
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── public/                 # Public assets
└── package.json           # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/radiant-threads.git
   cd radiant-threads
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎨 Key Components

### Navigation System

- **Dynamic Background**: Changes from glass morphism to solid colors based on scroll
- **Category Navigation**: Hover-based popup menus for product categories
- **Search Integration**: Modal-based search with real-time results
- **Cart Access**: Direct navigation to shopping cart

### Search Functionality

- **Real-time Search**: Instant results as you type
- **Category Filtering**: Filter results by product categories
- **Product Database**: Comprehensive product catalog
- **Responsive Results**: Grid layout with product cards

### Shopping Cart

- **Product Management**: Add, remove, and adjust quantities
- **Price Calculation**: Automatic subtotal, discount, and shipping calculation
- **Order Summary**: Clear breakdown of costs
- **Checkout Flow**: Seamless checkout process

## 🎯 Usage

### Navigation

- Use the supportive toolbar to browse product categories
- Click the search icon to find specific products
- Access your cart via the cart icon in the navigation

### Shopping

- Browse products by category using the toolbar
- Use the search function to find specific items
- Add products to cart and manage quantities
- Proceed to checkout when ready

### Responsive Design

- The website is fully responsive and works on all devices
- Mobile-optimized navigation and interactions
- Touch-friendly interface elements

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- UI components based on shadcn/ui
- Icons from Lucide React
- Images and assets for demonstration purposes

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the development team.

---

**Radiant Threads** - Crafting Elegance, Weaving Dreams, Celebrating Heritage
