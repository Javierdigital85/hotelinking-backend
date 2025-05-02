import app from "./app";
import sequelize from "./config/database";
import db from "./config/database";

const PORT = 8000;

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch((err) => console.error("❌ Error al conectar:", err));

db.sync({ force: false }).then(() => {
  console.log("Tablas creadas exitosamente");
  app.listen(PORT, () => {
    console.log(`El puerto es ${PORT}`);
  });
});
