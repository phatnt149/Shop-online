
export const updateProfile = (phone, dataUpdate) => {
    const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

    fetch(`${SUPABASE_URL}/rest/v1/users?phone=eq.${phone}`, {
        method: "PATCH",
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
        body: JSON.stringify(dataUpdate)
    })
    .then(res => res.json())
    .then(data => {})
    .catch(err => console.error(err));
};

