// ═══════════════════════════════════════════════════════════════
// Static API Service - Fetches pre-computed JSON data files
// (Replaces the Express backend API for GitHub Pages hosting)
// ═══════════════════════════════════════════════════════════════

const api = {
  _cache: {},

  async _fetchJSON(filename) {
    if (this._cache[filename]) return this._cache[filename];
    
    try {
      // Try relative path first (works with web servers)
      let url = 'data/' + filename;
      let resp = await fetch(url);
      
      // If that fails, try alternative path
      if (!resp.ok && !url.startsWith('/')) {
        // For local file:// protocol or subdirectory hosting
        const paths = [
          'data/' + filename,
          './data/' + filename,
          '../data/' + filename,
          '/data/' + filename
        ];
        
        for (const path of paths) {
          try {
            resp = await fetch(path);
            if (resp.ok) {
              url = path;
              break;
            }
          } catch (e) {
            // Continue to next path
          }
        }
      }
      
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: Failed to load ${filename} from ${url}`);
      }
      
      const data = await resp.json();
      this._cache[filename] = data;
      console.log(`✓ Loaded ${filename}`);
      return data;
    } catch (error) {
      console.error(`✗ Failed to load ${filename}:`, error);
      throw new Error(`Failed to load ${filename}: ${error.message}`);
    }
  },

  // Seasons
  async getSeasons() {
    return this._fetchJSON('seasons.json');
  },

  async getSeason(id) {
    const seasons = await this.getSeasons();
    return seasons.find(s => s.id === parseInt(id));
  },

  // Pitches (filtering done client-side)
  async getPitches(filters) {
    let pitches = await this._fetchJSON('pitches.json');

    if (filters && Object.keys(filters).length > 0) {
      if (filters.season) {
        pitches = pitches.filter(p => p.season === parseInt(filters.season));
      }
      if (filters.industry) {
        pitches = pitches.filter(p => p.industry === filters.industry);
      }
      if (filters.status) {
        if (filters.status === 'funded' || filters.status === 'DEAL') {
          pitches = pitches.filter(p => p.funded === true);
        } else if (filters.status === 'unfunded' || filters.status === 'NO_DEAL') {
          pitches = pitches.filter(p => p.funded === false);
        }
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        pitches = pitches.filter(p =>
          (p.name || '').toLowerCase().includes(query) ||
          (p.type || '').toLowerCase().includes(query) ||
          (p.industry || '').toLowerCase().includes(query)
        );
      }
    }

    return pitches;
  },

  async getPitch(id) {
    const pitches = await this._fetchJSON('pitches.json');
    return pitches.find(p => p.id === id) || pitches.find(p => String(p.pitch) === String(id));
  },

  // Sharks
  async getSharks() {
    return this._fetchJSON('sharks.json');
  },

  async getShark(id) {
    const sharks = await this.getSharks();
    return sharks.find(s => s.id === parseInt(id));
  },

  // Analytics (pre-computed)
  async getAnalytics() {
    return this._fetchJSON('analytics.json');
  },
};
