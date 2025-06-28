---
name: ⚡ Performance Issue
about: Report performance problems or optimization opportunities for DemandToKaro
title: '[PERFORMANCE] '
labels: ['performance', 'needs-investigation']
assignees: ''
projects: ['DemandToKaro/1']
---

## ⚡ Performance Issue Description
**Describe the performance problem**
A clear and concise description of the performance issue you're experiencing.

**Expected performance**
What performance level did you expect? (e.g., page load time, interaction response time)

**Actual performance**
What performance are you actually experiencing?

## 📊 Core Web Vitals Metrics
**Current Metrics:**
- **LCP (Largest Contentful Paint):** [e.g., 4.2s] (Target: < 2.5s)
- **FID (First Input Delay):** [e.g., 350ms] (Target: < 100ms)
- **INP (Interaction to Next Paint):** [e.g., 280ms] (Target: < 200ms)
- **CLS (Cumulative Layout Shift):** [e.g., 0.25] (Target: < 0.1)
- **FCP (First Contentful Paint):** [e.g., 2.8s] (Target: < 1.8s)
- **TBT (Total Blocking Time):** [e.g., 450ms] (Target: < 200ms)

**Performance Score:**
- **PageSpeed Insights Score:** [e.g., 65/100] (Target: 90+)
- **Lighthouse Performance Score:** [e.g., 68/100] (Target: 90+)

## 🔍 Performance Analysis Tools
**Tools Used:**
- [ ] Google PageSpeed Insights
- [ ] Lighthouse (Chrome DevTools)
- [ ] WebPageTest
- [ ] Chrome DevTools Performance tab
- [ ] React DevTools Profiler
- [ ] Next.js Bundle Analyzer
- [ ] Other: ___________

**Tool Results:**
Paste or attach screenshots of performance analysis results.

## 🌐 Environment & Device Details
**Device Information:**
- **Device Type:** [e.g., Desktop, Mobile, Tablet]
- **Device Model:** [e.g., iPhone 13, Samsung Galaxy S21, MacBook Pro M1]
- **CPU:** [e.g., Apple M1, Intel i7, Snapdragon 888]
- **RAM:** [e.g., 8GB, 16GB]
- **Storage:** [e.g., SSD, HDD]

**Network Conditions:**
- **Connection Type:** [e.g., WiFi, 4G, 5G, 3G]
- **Speed:** [e.g., 100 Mbps, 50 Mbps, Slow 3G]
- **Latency:** [e.g., 20ms, 100ms, 500ms]
- **Throttling:** [e.g., No throttling, Slow 3G, Fast 3G]

**Browser Information:**
- **Browser:** [e.g., Chrome, Firefox, Safari, Edge]
- **Version:** [e.g., 118.0.5993.88]
- **Extensions:** [List any relevant browser extensions]

## 📍 Affected Pages & Components
**Primary Affected Page:**
- **URL:** [e.g., https://demandtokaro.com/services]
- **Page Type:** [e.g., Homepage, Service Listing, Booking Form, Admin Dashboard]

**Affected Components:**
- [ ] Navigation/Header
- [ ] Service Cards/Listings
- [ ] Image Gallery/Carousel
- [ ] Forms (Booking, Registration, etc.)
- [ ] Maps Integration
- [ ] Search/Filter Components
- [ ] Admin Tables/Data Grids
- [ ] Mobile Menu/Sidebar
- [ ] Other: ___________

**User Flow:**
Describe the specific user journey where performance issues occur:
1. Step 1: [e.g., Land on homepage]
2. Step 2: [e.g., Search for services]
3. Step 3: [e.g., View service details]
4. Step 4: [e.g., Performance degrades here]

## 🔄 Steps to Reproduce Performance Issue
1. Go to '[URL]'
2. Perform action '[specific action]'
3. Measure performance using '[tool]'
4. Observe slow performance in '[specific area]'

**Reproducibility:**
- [ ] Always reproducible
- [ ] Sometimes reproducible
- [ ] Rarely reproducible
- [ ] Only under specific conditions

## 📈 Performance Impact Analysis
**User Experience Impact:**
- **Bounce Rate:** [e.g., Users leaving due to slow loading]
- **Conversion Impact:** [e.g., Reduced bookings/registrations]
- **User Frustration:** [e.g., Complaints about slow interactions]

**Business Impact:**
- **SEO Impact:** [e.g., Lower search rankings due to poor Core Web Vitals]
- **Revenue Impact:** [e.g., Estimated loss due to poor performance]
- **Operational Impact:** [e.g., Increased support tickets]

## 🔧 Technical Details
**Suspected Performance Bottlenecks:**
- [ ] Large JavaScript bundles
- [ ] Unoptimized images
- [ ] Slow database queries
- [ ] External API calls
- [ ] Render-blocking resources
- [ ] Memory leaks
- [ ] Inefficient React re-renders
- [ ] Large DOM size
- [ ] Unused CSS/JavaScript
- [ ] Third-party scripts
- [ ] Other: ___________

**Resource Analysis:**
- **JavaScript Bundle Size:** [e.g., 2.5MB]
- **CSS Bundle Size:** [e.g., 500KB]
- **Image Sizes:** [e.g., Multiple 2MB+ images]
- **Font Loading:** [e.g., Multiple font families, FOUT/FOIT issues]
- **Third-party Scripts:** [e.g., Google Analytics, Maps, etc.]

## 📱 Mobile-Specific Performance Issues
**Mobile Performance:**
- **Touch Response Time:** [e.g., 300ms delay on tap]
- **Scroll Performance:** [e.g., Janky scrolling, low FPS]
- **Battery Impact:** [e.g., High CPU usage, battery drain]
- **Data Usage:** [e.g., High data consumption]

**Mobile Metrics:**
- **Mobile PageSpeed Score:** [e.g., 45/100]
- **Mobile LCP:** [e.g., 5.8s]
- **Mobile CLS:** [e.g., 0.35]

## 🎯 Performance Optimization Suggestions
**Potential Solutions:**
- [ ] Image optimization (WebP, lazy loading, responsive images)
- [ ] JavaScript code splitting and lazy loading
- [ ] CSS optimization (remove unused styles, critical CSS)
- [ ] Database query optimization
- [ ] Caching strategies (browser, CDN, server-side)
- [ ] Bundle size reduction
- [ ] Third-party script optimization
- [ ] Server-side rendering improvements
- [ ] Component optimization (React.memo, useMemo, useCallback)
- [ ] Other: ___________

**Priority Areas:**
1. **High Priority:** [e.g., Optimize hero image loading]
2. **Medium Priority:** [e.g., Reduce JavaScript bundle size]
3. **Low Priority:** [e.g., Optimize admin dashboard performance]

## 📊 Performance Monitoring
**Current Monitoring:**
- [ ] Real User Monitoring (RUM) in place
- [ ] Synthetic monitoring setup
- [ ] Performance budgets defined
- [ ] Alerts configured
- [ ] No monitoring currently

**Monitoring Tools:**
- [ ] Google Analytics (Core Web Vitals)
- [ ] Vercel Analytics
- [ ] New Relic
- [ ] DataDog
- [ ] Custom monitoring
- [ ] Other: ___________

## 🔗 Related Information
**Screenshots/Videos:**
Attach performance analysis screenshots, Lighthouse reports, or screen recordings showing the performance issue.

**Performance Reports:**
Attach or link to detailed performance reports from tools like Lighthouse, WebPageTest, etc.

**Related Issues:**
Link any related performance issues or optimization tasks.

## ✅ Checklist
- [ ] I have measured performance using appropriate tools
- [ ] I have provided Core Web Vitals metrics
- [ ] I have tested on multiple devices/browsers (if applicable)
- [ ] I have identified specific affected pages/components
- [ ] I have considered the business impact of this performance issue
- [ ] I have suggested potential optimization approaches
