import User from "./User";
import Offer from "./Offer";
import PromoCode from "./PromoCode";

User.hasMany(PromoCode, { foreignKey: "userId" });
PromoCode.belongsTo(User, { foreignKey: "userId" });

Offer.hasMany(PromoCode, { foreignKey: "offerId" });
PromoCode.belongsTo(Offer, { foreignKey: "offerId", as: "offer" });

export { User, Offer, PromoCode };
