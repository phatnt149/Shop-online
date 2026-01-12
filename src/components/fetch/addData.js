const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

export const addCart = async (userId) => {
    const ress = await fetch(
    `${SUPABASE_URL}/rest/v1/carts?user_id=eq.${userId}`,
    { headers: { apikey: SUPABASE_ANON_KEY } }
    );

    const carts = await ress.json();

    if (carts.length > 0) return carts[0];

  const res = await fetch(`${SUPABASE_URL}/rest/v1/carts`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      user_id: userId
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }else{
    var result = await res.json()
  }

  return result;
};

export const addCartItems = async (cardId, productId, variantId, quantity, price) => {

  const res = await fetch(`${SUPABASE_URL}/rest/v1/cart_items`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      cart_id: cardId,
      product_id:productId,
      variant_id: variantId,
      quantity:quantity,
      price:price
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }else{
    var result = await res.json()
  }

  return result;
};

export const addOrder = async (userId, total, address) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      user_id: userId,
      total_amount: total,
      shipping_address: address
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }else{
    var result = await res.json()
  }

  return result;
};

export const addOrderItems = async (orderID, productId, variantId, quantity, price) => {

  const res = await fetch(`${SUPABASE_URL}/rest/v1/order_items`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      order_id: orderID,
      product_id:productId,
      variant_id: variantId,
      quantity:quantity,
      price:price
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }else{
    var result = await res.json()
  }

  return result;
};

export const addPayment = async (orderID, method, status) => {

  const res = await fetch(`${SUPABASE_URL}/rest/v1/payments`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      order_id: orderID,
      method:method,
      status: status
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }else{
    var result = await res.json()
  }

  return result;
};
