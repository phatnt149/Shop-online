import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, getDataUser } from "../../components/fetch/getData";

function CartLogic() {
  const [dataUser, setDataUser] = useState(null);       // lưu user object
  const [dataProduct, setDataProduct] = useState(null); // lưu product object
  const dataOrder = useSelector((state) => state.reducerCart);

  // Fetch user
  useEffect(() => {
    if (!dataOrder?.[0]?.id_user) return;

    const fetchUser = async () => {
      const result = await getDataUser(dataOrder[0].id_user);
      setDataUser(result?.[0] || null); // tránh undefined
    };
    fetchUser();
  }, [dataOrder]);

  // Fetch product
  useEffect(() => {
    if (!dataOrder?.[0]?.id_product) return;

    const fetchProduct = async () => {
      const result = await getData(dataOrder[0].id_product);
      setDataProduct(result?.[0] || null);
    };
    fetchProduct();
  }, [dataOrder]);

  return { dataUser, dataProduct, dataOrder };
}

export default CartLogic;
