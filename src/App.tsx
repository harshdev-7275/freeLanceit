import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./screens/DashBoard";
import LecturePlayerLayout from "./components/LecturePlayerLayout";
import DashBoardSideBar from "./components/DashBoardSideBar";
import Payment from "./screens/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";


const stripePromise = loadStripe('pk_test_your_test_key_here'); // Use your test key


export default function App() {
  const [clientSecret, setClientSecret] = useState(''); // You'll get this from backend later
  return (
    <BrowserRouter>
      <div className="flex h-screen">
      <DashBoardSideBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<DashBoard />}>
              <Route path="video/:videoId" element={<LecturePlayerLayout />} />
              <Route path="payment" element={
                 <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Payment />
                </Elements>
                } />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
