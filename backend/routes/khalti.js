
import express from "express";
const router = express.Router();
import axios from "axios";

router.post("/verify", async (req, res) => {
  const { token, amount } = req.body;

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      { token, amount },
      {
        headers: {
          Authorization: `Key test_secret_key_94f0071b2ff446d2b5aeda4b1ba0f51c`, 
        },
      }
    );

    res.json({
      success: true,
      message: "Payment verification successful",
      data: response.data,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
      error: error.response.data,
    });
  }
});

export default router;
