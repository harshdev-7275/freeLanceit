
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElement } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_your_test_key_here'); // Use your test key


const Payment = () => {
    const stripe  = useStripe();
    const elements = useElements()
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState(''); // You'll get this from backend later



    const handleSubmit = async (e : React.FormEvent)=>{
        e.preventDefault();
        if(!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement) as StripeCardElement;
        try {
            const {error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card:cardElement,
            })
            if(error){
                setPaymentError(error.message || 'Payment failed');
                return;
            }
            console.log('Mock payment successful with method:', paymentMethod.id);
            setPaymentSuccess(true);
            setPaymentError(null);
        } catch (err) {
            setPaymentError('An unexpected error occurred');
            console.error("Error in payment page",err);
            
        }

    }
  return (
    
   

    <div className="checkout-container">
      <h2>Complete Your Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <button type="submit" disabled={!stripe || paymentSuccess}>
          Pay Now
        </button>
        {paymentError && <div className="error">{paymentError}</div>}
        {paymentSuccess && (
          <div className="success">Payment Successful! Thank you!</div>
        )}
      </form>
    </div>
  )
}

export default Payment