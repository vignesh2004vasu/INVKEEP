
const OrderPage = ({ match }) => {
    const [orderQuantity, setOrderQuantity] = useState(1);
    const productName = match.params.product;
  
    const handleOrder = () => {
      console.log(`Ordered ${orderQuantity} of ${productName}`);
    };
  
    return (
      <div>
        <h1>Order Product</h1>
        <p>Product: {productName}</p>
        <input
          type="number"
          min="1"
          value={orderQuantity}
          onChange={e => setOrderQuantity(e.target.value)}
        />
        <button onClick={handleOrder}>Order</button>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  };
  
  export default OrderPage;