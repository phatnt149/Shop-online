const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

export const getData = async (id)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*,product_variants(*)`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataCartProduct = async (idProduct, idVariant)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${idProduct}&select=*,product_variants(*)&product_variants.id=eq.${idVariant}`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getIdProductVariant = async (size, color)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/product_variants?size=eq.${size}&color=eq.${color}&select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataUser = async (id)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${id}&select=full_name,phone,email,address`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataCard = async (idUser)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/carts?user_id=eq.${idUser}&select=id,cart_items(*)`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataOrder = async (user_id)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders?user_id=eq.${user_id}&select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataOrderItem = async (orderId)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/order_items?order_id=eq.${orderId}&select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getDataProduct = async (id)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getPayment = async (order_id)=>{
    const res = await fetch(`${SUPABASE_URL}/rest/v1/payments?order_id=eq.${order_id}&select=*`, {
            method: "GET",
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json"
            }
            })

    const result = await res.json();
    return result;
}

export const getProvince = async ()=>{
    const res = await fetch(`https://provinces.open-api.vn/api/v1/p/`)
    const result = await res.json();
    return result;
}

export const getDistrict = async (provinceCode)=>{
    const res = await fetch(`https://provinces.open-api.vn/api/v1/p/${provinceCode}?depth=2`)
    const result = await res.json();
    return result;
}

export const getWar = async (districtCode)=>{
    const res = await fetch(`https://provinces.open-api.vn/api/v1/d/${districtCode}?depth=2`)
    const result = await res.json();
    return result;
}