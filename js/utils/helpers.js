// ═══════════════════════════════════════════════════════════════
// Helper Utilities
// ═══════════════════════════════════════════════════════════════

const helpers = {
  // Format currency
  formatCurrency(value) {
    if (!value) return '₹0';
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value.toLocaleString()}`;
  },

  // Format percentage
  formatPercentage(value) {
    return `${parseFloat(value).toFixed(1)}%`;
  },

  // Format date
  formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Debounce function
  debounce(fn, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // Generate random color
  randomColor() {
    const colors = ['#E8192C', '#22C55E', '#3B82F6', '#F5C518', '#8B5CF6', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  },

  // Generate array of n random colors
  generateColors(n) {
    const baseColors = ['#E8192C', '#22C55E', '#3B82F6', '#F5C518', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];
    const colors = [];
    for (let i = 0; i < n; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  },

  // Truncate text
  truncate(text, length = 50) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  },

  // Capitalize first letter
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Sleep utility
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Map industry to CSS class
  getIndustryClass(industry) {
    const industryMap = {
      'Food and Beverage': 'badge-food',
      'Beauty/Fashion': 'badge-beauty',
      'Technology/Software': 'badge-tech',
      'Medical/Health': 'badge-medical',
      'Manufacturing': 'badge-manufacturing',
      'Lifestyle/Home': 'badge-lifestyle',
      'Business Services': 'badge-business',
      'Children/Education': 'badge-education',
      'Vehicles/Electrical Vehicles': 'badge-vehicles',
      'Fitness/Sports/Outdoors': 'badge-fitness',
      'Green/CleanTech': 'badge-green',
      'Animal/Pets': 'badge-pets',
      'Agriculture': 'badge-agriculture',
      'Liquor/Alcohol': 'badge-liquor',
      'Electronics': 'badge-electronics',
      'Entertainment': 'badge-entertainment',
      'Hardware': 'badge-hardware',
      'Others': 'badge-others'
    };
    return industryMap[industry] || 'badge-others';
  },
};
