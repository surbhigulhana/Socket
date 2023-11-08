const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://surbhigulhana3:123@ac-qqwjuqg-shard-00-00.ro46lnj.mongodb.net:27017,ac-qqwjuqg-shard-00-01.ro46lnj.mongodb.net:27017,ac-qqwjuqg-shard-00-02.ro46lnj.mongodb.net:27017/?ssl=true&replicaSet=atlas-5g3d4j-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfull");
  });










