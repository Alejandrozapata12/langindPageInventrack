export function initUTM() {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const utmData = {};
  let hasUTM = false;

  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      utmData[key] = value;
      hasUTM = true;
    }
  });

  if (hasUTM) {
    utmData.timestamp = Date.now();
    localStorage.setItem('inventrack-utm', JSON.stringify(utmData));
  }

  const demoLinks = document.querySelectorAll('a[href*="inventrack_system"]');
  const storedUTM = localStorage.getItem('inventrack-utm');

  if (storedUTM) {
    const data = JSON.parse(storedUTM);
    const age = Date.now() - data.timestamp;
    const maxAge = 30 * 24 * 60 * 60 * 1000;

    if (age > maxAge) {
      localStorage.removeItem('inventrack-utm');
      return;
    }

    const utmString = new URLSearchParams(data).toString();
    demoLinks.forEach(link => {
      const url = new URL(link.href);
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'timestamp') url.searchParams.set(key, value);
      });
      link.href = url.toString();
    });
  }
}
