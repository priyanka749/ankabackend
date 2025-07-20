const axios = require('axios');

// ⚠️ Do NOT expose this key in frontend
const WIT_SERVER_TOKEN = 'B2CJYEMKR3LXPX45EDIIRPEU664T27CJ';

const handleMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const witRes = await axios.get('https://api.wit.ai/message', {
      params: { q: message },
      headers: {
        Authorization: `Bearer ${WIT_SERVER_TOKEN}`,
      },
    });

    const intent = witRes.data.intents[0]?.name;
    const traits = witRes.data.traits;

    let reply = '';

    // ✅ Handle built-in traits
    if (traits['wit/greetings']) {
      reply = 'Hello! 👋 Welcome to AnkaAttire. How can I help you today?';
    } else if (traits['wit/bye']) {
      reply = 'Goodbye! 👗 Come back soon!';
    } else {
      // ✅ Handle custom trained intents
      switch (intent) {
        case 'Hello_Welcome_to_AnkaAttire_How_can_I_assist_you_':
          reply = 'Hello! 👋 Welcome to AnkaAttire. How can I assist you today?';
          break;

        case 'return_policy':
          reply = 'Yes, we accept returns within 7 days of delivery.';
          break;

        case 'yes_available_how_can_I_help':
          reply = 'Yes, Cash on Delivery is available across Nepal.';
          break;

        case 'shipping_time':
          reply = 'Delivery takes 3–5 working days depending on your location.';
          break;

        case 'product_inquiry':
          reply = 'This outfit is made from high-quality fabric and available in all sizes.';
          break;

        case 'style_advice':
          reply = 'You can style this with heels and traditional jewelry for a party look.';
          break;

        case 'exchange_policy':
          reply = 'Yes, you can exchange within 5 days with the original tag attached.';
          break;
                case 'browse_products':
        reply = 'Sure! Here are some of our newest and most popular ethnic styles 🔥';
        break;

      case 'track_order':
        reply = 'Please share your order ID to help me track your package 📦.';
        break;

      case 'return_policy':
        reply = "We offer easy 7-day returns on most items. Just go to 'My Orders' and request a return 📦✅.";
        break;

      case 'payment_options':
        reply = 'Yes! You can pay via Khalti, eSewa, credit/debit cards, or choose Cash on Delivery 💵.';
        break;

      case 'customer_support':
        reply = 'No problem! Connecting you to our support team 👩‍💻... Please wait a moment.';
        break;

      case 'size_guide':
        reply = "Here's our size guide 📏. Let me know your measurements and I can assist you better.";
        break;

      case 'add_to_cart':
        reply = 'Item added to your cart 🛒! You can checkout anytime from the top-right cart icon.';
        break;

      case 'confirm_order':
        reply = 'Awesome! Redirecting you to the secure checkout page 🧾💳.';
        break;

      case 'delivery_time':
        reply = 'Delivery usually takes 3–5 days inside the valley and 5–7 days outside. 🚚📦';
        break;

        case 'track_order':
          reply = 'You can track your order using the tracking ID sent via SMS or email.';
          break;

        case 'cancel_order':
          reply = 'Orders can be canceled within 24 hours of placement.';
          break;

        case 'contact_support':
          reply = 'You can reach our support team at +977-123456789 or support@ankattire.com';
          break;

        default:
          reply = 'Sorry, I’m not sure about that. Could you rephrase your question?';
      }
    }

    res.json({ reply });
  } catch (error) {
    console.error('Wit.ai Error:', error.message);
    res.status(500).json({ reply: 'Sorry, something went wrong while processing your message.' });
  }
};

module.exports = { handleMessage };
