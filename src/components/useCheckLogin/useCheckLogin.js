import { useState, useEffect } from "react";

const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

export const useCheckLogin = (phone, password) => {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {

    fetch(`${SUPABASE_URL}/rest/v1/users?phone=eq.${phone}&password=eq.${password}&select=full_name`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data =>setDataUser(data[0] || null))
      .catch(err => console.error(err));
  }, [phone, password]);

  return dataUser;
};
