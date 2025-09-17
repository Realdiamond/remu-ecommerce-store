function setupHeaderFromProducts(products) {
  // elements
  const categoriesEl = document.querySelector('#categories');
  const body = document.body;

  if (!categoriesEl || !Array.isArray(products) || products.length === 0) return;

  // collect unique categories
  const cats = [];
  for (let i = 0; i < products.length; i++) {
    const cat = products[i].category;
    if (cat && !cats.includes(cat)) cats.push(cat);
  }

  // ---- floating hover targets ----
  // hover "bridge" directly under the categories trigger
  const dp = document.createElement('div');
  body.append(dp);
  Object.assign(dp.style, {
    position: 'absolute',
    width: '160px',   // will be resized/positioned to match #categories
    height: '22px',
    backgroundColor: 'transparent',
    display: 'none',
    pointerEvents: 'auto'
  });

  // dropdown panel
  const dropdown = document.createElement('div');
  body.append(dropdown);
  Object.assign(dropdown.style, {
    width: '50%',
    height: '70vh',
    backgroundColor: 'white',
    position: 'absolute',
    top: '0px',   // will be positioned relative to #categories
    left: '0px',
    zIndex: '9999',
    display: 'none',
    flexDirection: 'row',
    cursor: 'pointer',
    boxShadow: '0px 4px 16px rgba(0,0,0,0.2)',
    border: '1px solid #eee',
    borderRadius: '6px',
  });

  // columns
  const scroll = document.createElement('div');
  dropdown.append(scroll);
  Object.assign(scroll.style, {
    width: '30%',
    height: '100%',
    backgroundColor: 'white',
    overflowY: 'auto',
    borderRight: '1px solid #eee',
  });

  const store = document.createElement('div');
  dropdown.append(store);
  Object.assign(store.style, {
    width: '70%',
    height: '100%',
    backgroundColor: 'white',
    overflowY: 'auto',
    padding: '10px'
  });

  // position helpers (align dp + dropdown to #categories each time we show)
  function positionUnderCategories() {
    const r = categoriesEl.getBoundingClientRect();
    const top = window.scrollY + r.bottom;
    const left = window.scrollX + r.left;

    // bridge sits just under the trigger
    dp.style.top = (top - 1) + 'px';
    dp.style.left = left + 'px';
    dp.style.width = Math.max(140, r.width) + 'px';
    dp.style.height = '20px';

    // dropdown starts below the bridge
    dropdown.style.top = (top + 18) + 'px';
    dropdown.style.left = left + 'px';
  }
  window.addEventListener('resize', positionUnderCategories);
  window.addEventListener('scroll', positionUnderCategories, { passive: true });

  // build category list
  for (let i = 0; i < cats.length; i++) {
    const text = document.createElement('p');
    text.textContent = cats[i];
    Object.assign(text.style, {
      cursor: 'pointer',
      padding: '10px 12px',
      margin: '0',
      color: '#111',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    });

    text.addEventListener('mouseenter', function () {
      displayProductsForCategory(cats[i], products, store);
    });

    // simple hover feedback
    text.addEventListener('mouseenter', () => { text.style.background = '#f6f6f6'; });
    text.addEventListener('mouseleave', () => { text.style.background = 'transparent'; });

    scroll.append(text);
  }

  // first render
  if (cats.length > 0) {
    displayProductsForCategory(cats[0], products, store);
  }

  // ---- stable hover logic (no flicker) ----
  let hideTimer;

  function showDropdown() {
    clearTimeout(hideTimer);
    positionUnderCategories();
    dropdown.style.display = 'flex';
    dp.style.display = 'block';
  }

  function hideDropdown() {
    hideTimer = setTimeout(() => {
      dropdown.style.display = 'none';
      dp.style.display = 'none';
    }, 150); // small buffer for cursor travel
  }

  // events
  categoriesEl.addEventListener('mouseenter', showDropdown);
  dp.addEventListener('mouseenter', showDropdown);
  dropdown.addEventListener('mouseenter', showDropdown);

  categoriesEl.addEventListener('mouseleave', hideDropdown);
  dp.addEventListener('mouseleave', hideDropdown);
  dropdown.addEventListener('mouseleave', hideDropdown);
}

// helper: render products for a category (unchanged, lightly tidied)
function displayProductsForCategory(category, products, mountEl) {
  mountEl.innerHTML = '';
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (p.category !== category) continue;

    const box = document.createElement('div');
    Object.assign(box.style, {
      textAlign: 'center',
      margin: '12px',
      display: 'inline-block',
      width: '120px',
      verticalAlign: 'top'
    });

    const circle = document.createElement('div');
    Object.assign(circle.style, {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '0 auto',
      border: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      cursor: 'pointer'
    });

    const img = document.createElement('img');
    img.src = p.thumbnail || (p.images && (p.images[0] || p.images[1])) || '';
    img.alt = p.title || '';
    Object.assign(img.style, { width: '100%', height: '100%', objectFit: 'cover' });

    circle.appendChild(img);

    const title = document.createElement('p');
    title.innerText = p.title || '';
    Object.assign(title.style, { fontSize: '13px', margin: '8px 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' });

    const price = document.createElement('p');
    price.innerText = (p.price != null ? '$' + p.price : '');
    Object.assign(price.style, { fontWeight: 'bold', fontSize: '12px', margin: '0' });

    box.appendChild(circle);
    box.appendChild(title);
    box.appendChild(price);
    mountEl.appendChild(box);
  }
}
(function () {
    // Elements
    const headerBtn = document.getElementById('signup-register');
    const overlay = document.getElementById('overlay');
    const popup1 = document.getElementById('popup1');
    const popup2 = document.getElementById('popup2');
    const closeBtn = document.getElementById('closeBtn');
    const leaveBtn = document.getElementById('leaveBtn');
    const continueBtn = document.getElementById('continueBtn'); 

    // Open the first popup
    headerBtn.addEventListener('click', () => {
        overlay.classList.add('show');
        popup1.classList.add('show');
    });

    // Close button (asks for confirmation)
    closeBtn.addEventListener('click', () => {
        popup1.classList.remove('show');
        popup2.classList.add('show');
    });

    // Leave = close everything
    leaveBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
        popup2.classList.remove('show');
    });

    // Continue = go back to popup1
    continueBtn.addEventListener('click', () => {
        popup2.classList.remove('show');
        popup1.classList.add('show');
    });

    // Optional: Close popup if clicking outside of it
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
            popup1.classList.remove('show');
            popup2.classList.remove('show');
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlay.classList.remove('show');
            popup1.classList.remove('show');
            popup2.classList.remove('show');
        }
    });
})(); 