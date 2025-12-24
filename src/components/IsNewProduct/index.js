function isNewProduct(createdAt, maxDays = 2) {
  const createdDate = new Date(createdAt); // thời điểm tạo
  const now = new Date();                  // thời điểm hiện tại

  const diffMs = now - createdDate;        // chênh lệch mili-giây
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= maxDays;
}
export default isNewProduct;