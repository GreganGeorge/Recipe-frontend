import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51P2BgZSAzlT6XHrmIeqxWUsFUfX6CXJQQayZ9xU5d8v9LlklDFUv7Jf91T7zT9HSzMHBnDJdJVhHMf4i6o8ZZoJw00NrK0C8jD');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body)
    try {
        const params={
            submit_type:'pay',
            mode:'payment',
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipping_options:[
                {shipping_rate:'shr_1P2C5ySAzlT6XHrm4SFxYKQ6'}
            ],
            line_items: req.body.map((item)=>{
                const img=item.ingredient_image[0].asset._ref;
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name:item.ingredient_name,
                            images:[img],
                        },
                        unit_amount:item.ingredient_price*100,
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1,
                    },
                    quantity:item.quantity
                }
            }),
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}