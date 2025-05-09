import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import ProPage from './pages/ProPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pro" element={<ProPage />} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/cancel" element={<CancelPage />} />
          </Routes>
        </Elements>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
