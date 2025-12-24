import { useState, useEffect } from "react";

const SUPABASE_URL = "https://jimndansgmlgpbmwjaor.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_KZce97tls9-ratz4EzFmkg_B_NJ2cg_";

export const useCheckResigter = (phone, email) => {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {

    fetch(`${SUPABASE_URL}/rest/v1/users?or=(phone.eq.${phone},email.eq.${email})&select=full_name`, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setDataUser(data[0] || null))
      .catch(err => console.error(err));
  }, [phone, email]);

  //console.log(dataUser)
  return dataUser;
};