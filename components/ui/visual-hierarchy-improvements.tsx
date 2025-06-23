"use client"

import { useEffect } from "react"

export default function VisualHierarchyImprovements() {
  useEffect(() => {
    // Add visual hierarchy improvements via CSS
    const style = document.createElement('style')
    style.textContent = `
      /* Enhanced Visual Hierarchy */
      
      /* Service Cards - Improved Visual Weight */
      .service-card {
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .service-card--popular {
        transform: scale(1.02);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border: 2px solid #3b82f6;
        background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
      }
      
      .service-card--popular::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #3b82f6, #1d4ed8, #3b82f6);
        border-radius: inherit;
        z-index: -1;
        opacity: 0.1;
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.2; }
      }
      
      /* Pricing Visual Hierarchy */
      .pricing-primary {
        font-size: 2rem;
        font-weight: 800;
        background: linear-gradient(135deg, #059669, #10b981);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
      }
      
      .pricing-secondary {
        font-size: 1.125rem;
        color: #64748b;
        text-decoration: line-through;
        text-decoration-color: #ef4444;
        text-decoration-thickness: 2px;
      }
      
      .savings-badge {
        background: linear-gradient(135deg, #dc2626, #ef4444);
        color: white;
        font-weight: 700;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
        animation: pulse 2s infinite;
      }
      
      /* Feature Lists - Better Scannability */
      .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .feature-item {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0.25rem 0;
        border-radius: 0.25rem;
        transition: background-color 0.2s ease;
      }
      
      .feature-item:hover {
        background-color: #f8fafc;
      }
      
      .feature-icon {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        color: #10b981;
        margin-top: 0.125rem;
      }
      
      .feature-text {
        font-size: 0.875rem;
        line-height: 1.4;
        color: #475569;
      }
      
      /* Section Headers - Improved Typography */
      .section-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .section-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #dbeafe, #bfdbfe);
        color: #1e40af;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
        border: 1px solid #93c5fd;
      }
      
      .section-title {
        font-size: clamp(1.875rem, 4vw, 3rem);
        font-weight: 800;
        line-height: 1.1;
        color: #0f172a;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #0f172a, #334155);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .section-description {
        font-size: 1.125rem;
        line-height: 1.6;
        color: #64748b;
        max-width: 42rem;
        margin: 0 auto;
      }
      
      /* CTA Buttons - Enhanced Visual Impact */
      .cta-primary {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border: none;
        color: white;
        font-weight: 600;
        padding: 0.75rem 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .cta-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }
      
      .cta-primary:hover::before {
        left: 100%;
      }
      
      .cta-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4);
      }
      
      /* Trust Signals - Enhanced Credibility */
      .trust-metric {
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 1rem;
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .trust-metric::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #10b981, #f59e0b);
      }
      
      .trust-metric:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-color: #3b82f6;
      }
      
      .trust-value {
        font-size: 2rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1;
        margin-bottom: 0.5rem;
      }
      
      .trust-label {
        font-size: 0.875rem;
        color: #64748b;
        font-weight: 500;
      }
      
      /* Search Enhancement */
      .search-container {
        position: relative;
        max-width: 32rem;
        margin: 0 auto;
      }
      
      .search-input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        border: 2px solid #e2e8f0;
        border-radius: 1rem;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      }
      
      .search-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      
      .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #64748b;
        width: 1.25rem;
        height: 1.25rem;
      }
      
      /* Mobile Optimizations */
      @media (max-width: 768px) {
        .service-card {
          margin-bottom: 1rem;
        }
        
        .service-card--popular {
          transform: none;
          border-width: 2px;
        }
        
        .pricing-primary {
          font-size: 1.5rem;
        }
        
        .section-title {
          font-size: 2rem;
        }
        
        .trust-metric {
          padding: 1rem;
        }
        
        .trust-value {
          font-size: 1.5rem;
        }
      }
      
      /* Dark Mode Support */
      @media (prefers-color-scheme: dark) {
        .service-card {
          background: #1e293b;
          border-color: #334155;
        }
        
        .section-title {
          color: #f8fafc;
          background: linear-gradient(135deg, #f8fafc, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .trust-metric {
          background: #1e293b;
          border-color: #334155;
        }
        
        .trust-value {
          color: #f8fafc;
        }
      }
    `
    
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  
  return null
}
