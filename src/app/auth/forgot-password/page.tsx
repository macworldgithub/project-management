'use client';

import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';


export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="w-full max-w-lg relative z-10">
        
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          
          <div className="relative bg-black px-8 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            
            </div>
            
            <Link 
              href="/auth/login" 
              className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          
          <div className="px-8 py-8">
            <form className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium"
              >
                Send Reset Link
              </button>
            </form>

            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/auth/login" className="font-medium text-black">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 