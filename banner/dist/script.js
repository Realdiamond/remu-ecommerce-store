let bannerGroups = {};       
let bannerGroupKeys = [];    
let bannerGroupIndex = 0;    
let bannerIntervalId = null;

function validImg(p) {
  return (p.images && (p.images[0] || p.images[1])) || p.thumbnail || '';
}

function buildSameDiscountGroups(products) {
  const groups = {};
  for (const p of (products || [])) {
    const img = validImg(p);
    const dp = Number(p.discountPercentage);
    if (!img || !String(img).startsWith('http') || !isFinite(dp) || dp <= 0) continue;

    
    const key = String(Math.round(dp));
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }

  
  for (const k of Object.keys(groups)) {
    if (groups[k].length < 2) delete groups[k];
  }

  return groups;
}

function pickTwoDistinct(arr) {
  const i = Math.floor(Math.random() * arr.length);
  let j;
  do { j = Math.floor(Math.random() * arr.length); } while (j === i);
  return [arr[i], arr[j]];
}

function showTwoFromSameDiscount() {
  const img1 = document.getElementById('product1');
  const img2 = document.getElementById('product2');
  const discountTag = document.getElementById('banner-choices');
  if (!img1 || !img2 || !discountTag) return;
  if (!bannerGroupKeys.length) return;

  // rotate through discount buckets
  const key = bannerGroupKeys[bannerGroupIndex];
  const group = bannerGroups[key];
  if (!group || group.length < 2) {
    // skip empty/invalid buckets
    bannerGroupIndex = (bannerGroupIndex + 1) % bannerGroupKeys.length;
    return showTwoFromSameDiscount();
  }

  const [p1, p2] = pickTwoDistinct(group);

  img1.src = validImg(p1);
  img1.alt = p1.title || '';
  img2.src = validImg(p2);
  img2.alt = p2.title || '';

  // Single discount label for both images
  discountTag.textContent = `${key}% off`;

  // advance to next bucket
  bannerGroupIndex = (bannerGroupIndex + 1) % bannerGroupKeys.length;
}

function startBannerSameDiscount(products) {
  bannerGroups = buildSameDiscountGroups(products);
  bannerGroupKeys = Object.keys(bannerGroups)
    .sort((a, b) => Number(b) - Number(a)); // highest discount first
  bannerGroupIndex = 0;

  if (!bannerGroupKeys.length) return; // nothing to show

  // run now, then every 10s
  showTwoFromSameDiscount();
  if (bannerIntervalId) clearInterval(bannerIntervalId);
  bannerIntervalId = setInterval(showTwoFromSameDiscount, 10000);
}