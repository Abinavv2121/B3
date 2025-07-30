#!/bin/bash

# 🚀 Team Setup Script for Radiant Threads
# Run this script to set up your development environment

echo "🎉 Welcome to Radiant Threads Team!"
echo "Setting up your development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
fi

# Create team directories
echo "📁 Setting up team directories..."
mkdir -p docs/team
mkdir -p docs/api
mkdir -p docs/design

# Install recommended VS Code extensions
echo "🔧 Installing recommended VS Code extensions..."
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next

# Create git hooks for team consistency
echo "🔗 Setting up git hooks..."
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Running pre-commit checks..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues before committing."
    exit 1
fi
echo "✅ Pre-commit checks passed!"
EOF

chmod +x .git/hooks/pre-commit

# Start development server
echo "🚀 Starting development server..."
echo "📱 Your app will be available at: http://localhost:5173"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Read TEAM_SETUP.md for collaboration guidelines"
echo "3. Join team communication channels"
echo "4. Start coding! 🎉"
echo ""
echo "📞 Need help? Contact: B3fashionstudios@gmail.com"

npm run dev 