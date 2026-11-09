document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmission);
  }
});

async function loadProducts() {
  const container = document.getElementById('product-list');
  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found in catalogue.</p>';
      return;
    }

    container.innerHTML = products.map(prod => `
      <div class="product-card">
        <div>
          <span class="product-tag">${prod.category}</span>
          <h3>${prod.name}</h3>
          <div class="composition-box">${prod.composition}</div>
          <p class="pkg-info"><strong>Packing:</strong> ${prod.packaging}</p>
          <ul class="indications-list">
            ${(prod.indications || []).map(ind => `<li><i class="fa-solid fa-check"></i> <span>${ind}</span></li>`).join('')}
          </ul>
        </div>
        <a href="#contact" class="btn-primary w-100" onclick="prefillProduct('${prod.name}')">
          <i class="fa-solid fa-cart-flatbed"></i> Inquire Order
        </a>
      </div>
    `).join('');
  } catch (error) {
    console.error('Fetch error:', error);
    container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #ef4444;">Failed to load products from database.</p>';
  }
}

function prefillProduct(prodName) {
  const msgField = document.getElementById('message');
  if (msgField) {
    msgField.value = `Hello, I would like to inquire about batch availability and pricing for ${prodName}.`;
  }
}

async function handleFormSubmission(e) {
  e.preventDefault();
  const statusEl = document.getElementById('formMsg');
  const submitBtn = document.getElementById('submitBtn');

  statusEl.innerText = 'Submitting your inquiry...';
  statusEl.style.color = '#0a4d68';
  submitBtn.disabled = true;

  const payload = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    city: document.getElementById('city').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      statusEl.style.color = '#10b981';
      statusEl.innerText = data.message || 'Inquiry successfully submitted!';
      document.getElementById('inquiryForm').reset();
    } else {
      statusEl.style.color = '#ef4444';
      statusEl.innerText = data.error || 'Failed to submit inquiry.';
    }
  } catch (err) {
    statusEl.style.color = '#ef4444';
    statusEl.innerText = 'Network error. Please make sure the server is running.';
  } finally {
    submitBtn.disabled = false;
  }
}
