





const express = require('express');
const http = require('http');
const cors = require("cors");

require("./Model/config");
const Product = require("./Model/Product");
const path =require("path");
const app = express();

// const server = http.createServer(app);
app.use(express.json());
// const io = socketIO(server);
app.use(cors());
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});



app.use(express.static(path.join(__dirname, "public")));
const multer = require("multer");

 const storage = multer.diskStorage({
  destination:'./public/uploads',
  filename:(req,file,cb)=>{
   return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
   })
   const upload = multer({
   storage:storage
   })
 app.use("/filename",express.static("./public/uploads"))
app.post("/api/Product", upload.single("filename"), async function (req, res) {
  const { Pname,Price } = req.body;
    try {
      const result1 = new Product({
        Pname: Pname,
        Price: Price,
        filename:`http://localhost:3305/filename/${req.file.filename}`
      });
      const data = await result1.save();
      console.log(data);
      res.status(200).json({ success: true, data: result1 });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
 
 
}
);

app.post('/ProductImg/:_id', upload.single('filename'), async (req, resp) => {
const { _id } = req.params;
const { Pname, Price } = req.body;

try {
 let updateData = {
   _id,
   Pname,
   Price,
 };

 // Check if a new image is uploaded
 if (req.file) {
   // If a new image is uploaded, update the filename
   const imageUrl = `http://localhost:3305/filename/${req.file.filename}`;
   updateData.filename = imageUrl;
 }

 // Update the product with the provided _id
 const result = await Product.updateOne({ _id }, {
   $set: updateData,
 });

 // After updating, emit the updated data to all connected clients
 console.log("Emitting productUpdate:", updateData);
 io.emit("productUpdate", updateData);

 resp.send(result);
} catch (error) {
 resp.status(500).json({ error: 'An error occurred while updating the product' });
}
});

app.get("/Product", async (req, resp) => {
try {
 let result = await Product.find();
 resp.send(result);
} catch (error) {
 console.error("Error fetching products:", error);
 resp.status(500).send({ error: "Internal Server Error" });
}
});


app.delete("/Product/:_id", async (req, resp) => {
  let result = await Product.deleteOne(req.params);
  resp.send(result);
});
app.put("/Product/:_id", async (req, resp) => {
  let result = await Product.updateOne(req.params, { $set: req.body });
  console.log(req.params);
  resp.send(result);
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

});


const PORT = process.env.PORT || 3305;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
