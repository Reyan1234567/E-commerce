import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../Auth/axios";
import { Search } from "lucide-react";
import {useForm} from "react-hook-form"
import { data } from "react-router-dom";
// import { useParams } from "react-router-dom";

type Product = {
  image: string;
  alt: string;
  description: string;
  price: number;
};

const Home = () => {

  const{register, handleSubmit}=useForm()
  
  const [response, setResponse] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState('')
  

  console.log(search)

  useEffect(()=>{
    const getProducts=async()=>{
      try{const products:Product[]=await api.get("/products")
      setResponse(products.data)}
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    getProducts()
  },[])

  console.log(response.length)
  if (loading) {
    return <div><span className="loading loading-bars loading-xl"></span></div>;
  }

  if (response.length === 0) {
    return <div className="w-100 h-100">NO products found</div>;
  }

  return (
    <div>
      <Navbar />
      <form className="m-5">
      <label className="input">
        <input
          type="search"
          value={search}
          className="grow"
          placeholder="Search"
          {...register("searchTerm")}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button
          className="bg-transparent border-none p-0 cursor-pointer"
          type="submit"
        >
          <Search size={16} />
        </button>
      </label>
    </form>

      <div className="flex gap-4 flex-wrap gap-y-4 justify-evenly p-8">
        {response.filter((respone)=>search? respone.alt.toLowerCase().includes(search):respone).map((product: Product) => (
          <div key={product.image} className="card bg-blue-200 w-96 shadow-sm">
            <figure>
              <img src={product.image} alt={product.alt} />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">{product.alt}</h2>
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
