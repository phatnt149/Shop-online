
export const resigterAccount =(email, phone, password)=>{
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";
    fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: "POST",
    headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation" // trả về dữ liệu vừa insert
    },
    body: JSON.stringify({
        full_name: "USER",
        email: email,
        phone: phone,
        password: password
    })
    })
    .then(res => res.json())
    .then(data => {
        alert("Insert thành công:");
    })
    .catch(err => console.error(err))
}