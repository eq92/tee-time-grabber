import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <header className="bg-white shadow-sm">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link to="/" className="text-xl font-bold text-gray-900">Tee Time Grabber</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-700">Home</Link>
          <Link to="/pro" className="text-gray-700 hover:text-blue-700">Pro</Link>
        </div>
      </nav>
    </header>
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8" aria-label="Main content">
      {children}
    </main>
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-300">
        &copy; {new Date().getFullYear()} Tee Time Grabber. All rights reserved.
      </div>
    </footer>
  </div>
);

export default Layout; 