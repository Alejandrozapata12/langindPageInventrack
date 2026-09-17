const STORAGE_KEY = 'inventrack-utm';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export function initUTM() {
    let stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { return; }

    const params = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key)]).filter(([, value]) => value));
    if (Object.keys(data).length) {
        data.timestamp = Date.now();
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { return; }
        stored = JSON.stringify(data);
    }
    if (!stored) return;

    let attribution;
    try { attribution = JSON.parse(stored); } catch {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }
    if (!attribution.timestamp || Date.now() - attribution.timestamp > MAX_AGE) {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }

    document.querySelectorAll('a[href*="inventrack_system"]').forEach((link) => {
        const url = new URL(link.href);
        UTM_KEYS.forEach((key) => { if (attribution[key]) url.searchParams.set(key, attribution[key]); });
        link.href = url.toString();
    });
}
