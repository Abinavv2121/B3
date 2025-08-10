# Backend API Endpoints for Razorpay Integration

## Required Endpoints for Checkout System

### 1. Create Razorpay Order
**Endpoint:** `POST /api/create-order`

**Description:** Creates a new order in Razorpay system

**Request Body:**
```json
{
  "amount": 50000,  // Amount in paisa (₹500.00)
  "currency": "INR",
  "receipt": "order_1234567890",
  "notes": {
    "customerId": "customer@email.com",
    "items": 3
  }
}
```

**Response:**
```json
{
  "id": "order_ABC123xyz",
  "entity": "order",
  "amount": 50000,
  "amount_paid": 0,
  "amount_due": 50000,
  "currency": "INR",
  "receipt": "order_1234567890",
  "offer_id": null,
  "status": "created",
  "attempts": 0,
  "notes": {
    "customerId": "customer@email.com",
    "items": 3
  },
  "created_at": 1234567890
}
```

**Implementation Example (Node.js):**
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    const options = {
      amount,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});
```

### 2. Verify Payment
**Endpoint:** `POST /api/verify-payment`

**Description:** Verifies the payment signature and processes the order

**Request Body:**
```json
{
  "razorpayOrderId": "order_ABC123xyz",
  "razorpayPaymentId": "pay_XYZ789abc",
  "razorpaySignature": "signature_hash",
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "cartItems": [...],
  "totals": {
    "subtotal": 45000,
    "discount": 5000,
    "shipping": 0,
    "tax": 8100,
    "total": 48100
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "B3_ORDER_123456",
  "message": "Payment verified and order created successfully"
}
```

**Implementation Example (Node.js):**
```javascript
const crypto = require('crypto');

app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      shippingAddress,
      cartItems,
      totals
    } = req.body;

    // Verify signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpaySignature) {
      // Payment is verified, create order in your database
      const orderId = await createOrderInDatabase({
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        shippingAddress,
        cartItems,
        totals,
        paymentStatus: 'paid',
        paymentMethod: 'razorpay'
      });

      // Send confirmation email
      await sendOrderConfirmationEmail(shippingAddress.email, orderId);

      res.json({
        success: true,
        orderId,
        message: 'Payment verified and order created successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
});
```

### 3. Create COD Order
**Endpoint:** `POST /api/create-cod-order`

**Description:** Creates a Cash on Delivery order

**Request Body:**
```json
{
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "cartItems": [...],
  "totals": {
    "subtotal": 45000,
    "discount": 5000,
    "shipping": 299,
    "tax": 8154,
    "total": 48453
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "B3_COD_123456",
  "message": "COD order created successfully"
}
```

**Implementation Example (Node.js):**
```javascript
app.post('/api/create-cod-order', async (req, res) => {
  try {
    const { shippingAddress, cartItems, totals } = req.body;

    // Create order in database
    const orderId = await createOrderInDatabase({
      shippingAddress,
      cartItems,
      totals,
      paymentStatus: 'pending',
      paymentMethod: 'cod'
    });

    // Send confirmation email
    await sendOrderConfirmationEmail(shippingAddress.email, orderId);

    res.json({
      success: true,
      orderId,
      message: 'COD order created successfully'
    });
  } catch (error) {
    console.error('Error creating COD order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});
```

## Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  cart_items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  shipping_cost INTEGER NOT NULL,
  tax_amount INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_method VARCHAR(20) NOT NULL, -- 'razorpay' or 'cod'
  payment_status VARCHAR(20) NOT NULL, -- 'paid', 'pending', 'failed'
  payment_id VARCHAR(100), -- Razorpay payment ID
  razorpay_order_id VARCHAR(100), -- Razorpay order ID
  order_status VARCHAR(20) DEFAULT 'processing', -- 'processing', 'shipped', 'delivered', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table (Optional - for normalized structure)
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_category VARCHAR(100) NOT NULL,
  product_image VARCHAR(500) NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  quantity INTEGER NOT NULL,
  selected_size VARCHAR(20),
  selected_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables Needed

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_secret_key_here

# Database Configuration
DATABASE_URL=your_database_connection_string

# Email Configuration (for order confirmations)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
```

## Additional Features to Implement

1. **Order Tracking**: Create endpoints to track order status
2. **Email Notifications**: Send order confirmation and shipping updates
3. **SMS Notifications**: Send order updates via SMS
4. **Admin Panel**: Manage orders, update status, process refunds
5. **Inventory Management**: Update stock levels after successful orders
6. **Analytics**: Track sales, popular products, etc.

## Security Considerations

1. **Signature Verification**: Always verify Razorpay signatures
2. **Input Validation**: Validate all incoming data
3. **Rate Limiting**: Implement rate limiting on API endpoints
4. **CORS**: Configure proper CORS policies
5. **HTTPS**: Use HTTPS in production
6. **Environment Variables**: Keep sensitive data in environment variables
7. **Database Security**: Use parameterized queries to prevent SQL injection

## Testing

1. **Use Razorpay Test Mode**: Use test keys for development
2. **Test Cards**: Use Razorpay test card numbers
3. **COD Testing**: Test Cash on Delivery flow
4. **Error Handling**: Test payment failures and network issues
5. **Email Testing**: Verify order confirmation emails are sent

This documentation provides a complete guide for implementing the backend API endpoints required for the Razorpay integration and checkout system.