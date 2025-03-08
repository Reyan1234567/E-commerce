import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";
import api from "../Auth/axios";

type Product = {
  image: string;
  alt: string;
  description: string;
  price: number;
};

const Home = () => {
  const [response, setResponse] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setResponse(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (response.length === 0) {
    return <div className="w-100 h-100">NO products found</div>;
  }

  return (
    <div>
      <Navbar />
      <Search />
      <div className="flex gap-4 flex-wrap gap-y-4 justify-evenly p-8">
        {response.map((product: Product) => (
          <div key={product.image} className="card bg-blue-200 w-96 shadow-sm">
            <figure>
              <img src={product.image} alt={product.alt} />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">Card Title</h2>
                <h2 className="card-title">{product.price} ETB</h2>
              </div>
             
              <p>{product.description}</p>
              <div className="card-action flex justify-end">
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
