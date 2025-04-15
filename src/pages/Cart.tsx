import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart } from "../store/cartSlice";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext";
import { formatPrice } from "../utils/formatPrice";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const {user } = useAuth();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sendOrderToTelegram = async (orderData: string) => {
    const botToken = "7674034931:AAE66g7xxqOZ-gqHmOuJdLXBRbfLKDYgEmA";
    const chatId = "-1002586909183";
    
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: orderData,
            parse_mode: "HTML",
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Telegramga xabar yuborishda xatolik yuz berdi");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Xatolik:", error);
      throw error;
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert(t("cart.orderEmpty"));
      return;
    }
    console.log(cartItems)
    // Buyurtma malumotlarini tayyorlash
    const orderDetails = cartItems
      .map(
        (item) =>
          `Mahsulot: ${item.title}\n` +
          `Miqdor: ${item.quantity}\n` +
          `Razmeri: ${item.size}\n` +
          `Narx: ${item.price * item.quantity} So'm\n` +
          `Mijoz: ${user?.name}\n` +
          `Telefon raqami: ${user?.phone_number}\n` +
          `Manzil: ${user?.location}\n` +
          `------------------------\n`
      )
      .join("");

    const totalMessage = `\n<b>Jami:</b> ${totalPrice} So'm`;
    const fullMessage = `<b>Yangi buyurtma!</b>\n\n${orderDetails}${totalMessage}`;

    try {
      await sendOrderToTelegram(fullMessage);
      
      cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
      alert(t("cart.orderSuccess"));
    } catch (error) {
      alert(t("cart.orderError"));
      console.error("Buyurtma yuborishda xatolik:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">{t("cart.title")}</h1>
        {cartItems.length === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div>
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    {t("productDetails.quantity")}: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("productDetails.size")}: {item.size}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold">
                    {formatPrice(String(item.price * item.quantity))} So'm
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline"
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-lg mb-4">
              {t("cart.total")}: {formatPrice(String(totalPrice))} So'm
            </div>
            <div className="text-right">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                {t("cart.placeOrder")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;