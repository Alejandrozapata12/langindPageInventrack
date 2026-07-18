export function initDemo(toast) {
  const productList = document.getElementById('demo-product-list');
  const detailPanel = document.getElementById('demo-detail');
  const placeholder = document.getElementById('demo-placeholder');
  const productDetail = document.getElementById('demo-product-detail');
  const productName = document.getElementById('demo-product-name');
  const productStockLabel = document.getElementById('demo-product-stock-label');
  const productBadge = document.getElementById('demo-product-badge');
  const stockInput = document.getElementById('demo-stock-input');
  const minusBtn = document.getElementById('demo-stock-minus');
  const plusBtn = document.getElementById('demo-stock-plus');
  const entryBtn = document.getElementById('demo-btn-entry');
  const exitBtn = document.getElementById('demo-btn-exit');
  const activityLog = document.getElementById('demo-activity-log');

  if (!productList) return;

  const products = [
    { id: 1, name: 'Laptop Dell XPS 15', sku: 'DELL-XPS-15', stock: 24, maxStock: 50, category: 'Electrónica', color: 'bg-blue-500' },
    { id: 2, name: 'Mouse Logitech MX', sku: 'LOG-MX-MASTER', stock: 156, maxStock: 200, category: 'Periféricos', color: 'bg-green-500' },
    { id: 3, name: 'Monitor Samsung 27"', sku: 'SAM-27-MON', stock: 8, maxStock: 30, category: 'Pantallas', color: 'bg-purple-500' },
    { id: 4, name: 'Teclado Mecánico RGB', sku: 'KBD-MEC-RGB', stock: 89, maxStock: 150, category: 'Periféricos', color: 'bg-orange-500' },
    { id: 5, name: 'Webcam HD 1080p', sku: 'WBC-HD-1080', stock: 3, maxStock: 25, category: 'Video', color: 'bg-red-500' },
  ];

  let selectedProduct = null;

  function getStockStatus(stock, max) {
    const pct = (stock / max) * 100;
    if (pct <= 10) return { label: 'Crítico', class: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' };
    if (pct <= 30) return { label: 'Bajo', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' };
    return { label: 'Óptimo', class: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' };
  }

  function renderProductList() {
    productList.innerHTML = '';
    products.forEach(product => {
      const status = getStockStatus(product.stock, product.maxStock);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `w-full text-left p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${selectedProduct?.id === product.id
        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 dark:border-brand-400 shadow-md'
        : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`;
      btn.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full ${product.color}" aria-hidden="true"></div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-gray-900 dark:text-white truncate">${product.name}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">${product.sku}</p>
          </div>
          <span class="px-2 py-0.5 rounded-full text-xs font-bold ${status.class}">${product.stock}</span>
        </div>
      `;
      btn.addEventListener('click', () => selectProduct(product));
      productList.appendChild(btn);
    });
  }

  function selectProduct(product) {
    selectedProduct = { ...product };
    placeholder.classList.add('hidden');
    productDetail.classList.remove('hidden');
    renderProductDetail();
    renderProductList();
  }

  function renderProductDetail() {
    if (!selectedProduct) return;
    productName.textContent = selectedProduct.name;
    productStockLabel.textContent = `SKU: ${selectedProduct.sku} · ${selectedProduct.category}`;
    stockInput.value = selectedProduct.stock;

    const status = getStockStatus(selectedProduct.stock, selectedProduct.maxStock);
    productBadge.textContent = status.label;
    productBadge.className = `px-3 py-1 rounded-full text-xs font-bold ${status.class}`;
  }

  function addActivity(type, qty) {
    if (!activityLog) return;
    const emptyMsg = activityLog.querySelector('p.italic');
    if (emptyMsg) emptyMsg.remove();

    const item = document.createElement('div');
    item.className = 'flex items-center gap-2 text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800';
    const icon = type === 'entry'
      ? '<span class="text-green-500 font-bold">+</span>'
      : '<span class="text-red-500 font-bold">-</span>';
    item.innerHTML = `${icon}<span class="text-gray-700 dark:text-gray-300">${selectedProduct.name}: ${qty} unidades</span><span class="ml-auto text-xs text-gray-400">Ahora</span>`;
    activityLog.insertBefore(item, activityLog.firstChild);
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      if (!selectedProduct) return;
      const val = parseInt(stockInput.value) || 0;
      if (val > 0) stockInput.value = val - 1;
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      if (!selectedProduct) return;
      const val = parseInt(stockInput.value) || 0;
      stockInput.value = val + 1;
    });
  }

  if (entryBtn) {
    entryBtn.addEventListener('click', () => {
      if (!selectedProduct) return;
      const qty = parseInt(stockInput.value) || 0;
      if (qty <= 0) { if (toast) toast.show('Ingresa una cantidad válida.', 'error'); return; }
      selectedProduct.stock = Math.min(selectedProduct.stock + qty, selectedProduct.maxStock);
      addActivity('entry', qty);
      renderProductDetail();
      renderProductList();
      if (toast) toast.show(`+${qty} unidades registradas.`, 'success');
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      if (!selectedProduct) return;
      const qty = parseInt(stockInput.value) || 0;
      if (qty <= 0) { if (toast) toast.show('Ingresa una cantidad válida.', 'error'); return; }
      if (qty > selectedProduct.stock) { if (toast) toast.show('No hay suficiente stock.', 'error'); return; }
      selectedProduct.stock -= qty;
      addActivity('exit', qty);
      renderProductDetail();
      renderProductList();
      if (toast) toast.show(`-${qty} unidades registradas.`, 'info');
      if (selectedProduct.stock <= selectedProduct.maxStock * 0.1) {
        if (toast) toast.show('Stock crítico. Reabastecer urgentemente.', 'error');
      }
    });
  }

  renderProductList();
}
