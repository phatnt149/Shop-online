const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

export const addOrUpdateCartItem = async (
  cartId,
  productId,
  variantId,
  quantity,
  price
) => {
  // 1. kiểm tra cart_item tồn tại
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/cart_items?cart_id=eq.${cartId}&product_id=eq.${productId}&variant_id=eq.${variantId}`,
    { headers: { apikey: SUPABASE_ANON_KEY } }
  );

  const items = await checkRes.json();

  // 2. nếu đã tồn tại → update quantity
  if (items.length > 0) {
    const current = items[0];

    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cart_items?id=eq.${current.id}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          quantity: current.quantity + quantity
        })
      }
    );

    if (!updateRes.ok) throw new Error(await updateRes.text());
    return (await updateRes.json())[0];
  }

  // 3. chưa tồn tại → insert
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/cart_items`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify({
      cart_id: cartId,
      product_id: productId,
      variant_id: variantId,
      quantity,
      price
    })
  });

  if (!insertRes.ok) throw new Error(await insertRes.text());
  return (await insertRes.json())[0];
};

export const deleteCartItem = async (cartId, productId, variantId) => {
  // 1. Kiểm tra cart_item tồn tại
  const deleteItemResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/cart_items?cart_id=eq.${cartId}&product_id=eq.${productId}&variant_id=eq.${variantId}`,
    {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
    }
  );

  // Check for success
  if (!deleteItemResponse.ok) {
    return false;
  } else {
    return true;
  }
};
