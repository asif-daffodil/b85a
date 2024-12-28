import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get('https://dummyjson.com/products');
            return response.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="container mx-auto">
            <h1>All Products</h1>
            <div className="grid grid-cols-3 gap-4">
                {data.products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <h3 className="text-xl">{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p className="text-sm text-gray-600">Price : ${product.price}</p>
                        <p>{product.description}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;