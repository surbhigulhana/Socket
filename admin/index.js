const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
require("./Model/config");
app.use(cors());
app.use(express.json());
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

const Product = require("./Model/Product");
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
           filename:`http://localhost:4003/filename/${req.file.filename}`
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
      Pname,
      Price,
    };

    // Check if a new image is uploaded
    if (req.file) {
      // If a new image is uploaded, update the filename
      const imageUrl = `http://localhost:4003/filename/${req.file.filename}`;
      updateData.filename = imageUrl;
    }

    // Update the product with the provided _id
    const result = await Product.updateOne({ _id }, {
      $set: updateData,
    });

    // After updating, emit the updated data to all connected clients
    io.emit("productUpdate", updateData);

    resp.send(result);
  } catch (error) {
    resp.status(500).json({ error: 'An error occurred while updating the product' });
  }
});

   app.get("/Product", async (req, resp) => {
     let result = await Product.find();
     resp.send(result);
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
  
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
app.listen(4003);
console.log("server run on 4003");





