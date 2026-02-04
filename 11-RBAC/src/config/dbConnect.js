const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_DB);
    console.log(
      `DB Connected : ${connect.connection.host}, ${connect.connection.name}`,
    );
  } catch (err) {
    console.log(`DB Error : ${err}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
