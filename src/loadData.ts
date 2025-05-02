import { Offer } from "./models"; 
import db from "./config/database"; 


const offers = [
  {
    title: "Viaje a París",
    details: "Disfruta de una experiencia única en la ciudad del amor.",
  },
  {
    title: "Tour en Roma",
    details: "Descubre la historia antigua de Roma con una guía profesional.",
  },
  {
    title: "Vacaciones en Bali",
    details: "Relájate en las playas paradisíacas de Bali y disfruta del mejor clima.",
  },
  {
    title: "Aventura en Tokio",
    details: "Sumérgete en la cultura japonesa con este viaje único.",
  },
  {
    title: "Explora Nueva York",
    details: "Vive la ciudad que nunca duerme con un viaje lleno de emoción.",
  },
  {
    title: "Safari en Sudáfrica",
    details: "Explora la fauna salvaje de Sudáfrica con un safari guiado.",
  },
  {
    title: "Escapada a Madrid",
    details: "Disfruta de la gastronomía y la cultura de la capital española.",
  },
  {
    title: "Viaje a Cancún",
    details: "Relájate en las hermosas playas de Cancún.",
  },
  {
    title: "Aventura en Córdoba",
    details: "Disfruta de la vibrante cultura y las sierras de Córdoba.",
  },
];

async function loadOffers() {
  try {
    await db.sync({ force: true }); 

    for (const offer of offers) {
      await Offer.create(offer);
    }

    console.log("✅ Ofertas cargadas correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar las ofertas:", error);
  }
}

loadOffers();
