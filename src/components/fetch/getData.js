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