import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom"
import "./HomePage.css"

const GET_ALL_BRANDS = gql`
  query {
    findAllBrands {
      id
      image
    }
  }
`;

function HomePage() {
    const { error, data, loading } = useQuery(GET_ALL_BRANDS);
    const navigate = useNavigate();

    if (loading) return <div> spinner...</div>;

    if (error) return <div>something went wrong</div>;

    const handleBrandClick = (brand) => {
        navigate(`/brand/${brand.id}`);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="list-item-with-logo mt-5 p-2">
                                <img className="list-logo" src="/Butterfly.png" />
                                <h3>ViteStrings</h3>
                            </div>
                            <h1 className="w-75 fw-bold mt-5 text-center">Browse top quality <span className="text-warning">Guitars </span>online</h1>
                            <p className="text-center w-50 ms-5 mt-3">Explore 50k+ latest collections of branded guitars online with VibeStrings.</p>
                        </div>
                        <div className="col-6">
                            <img className="mb-5 pb-5" src="/slika3.png" />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="fw-bold">Featuring the <span className="text-warning">Best Brands</span></h1>
                    <p>Select your preferred brand and explore our exquisite collection.</p>
                </div>

                {data.findAllBrands.map((brand) => {
                    return (
                        <div className="col-3" key={brand.id}>
                            <img
                                src={brand.image}
                                className="brand-img"
                                onClick={() => handleBrandClick(brand)}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    );
                })}
                <div className="container bg-dark d-flex justify-content-around text-center">
                    <div className="row">
                        <h1 className="fw-bold text-center mb-5 mt-5"><span className="text-white">Why try </span><span className="text-warning">VibeStrings?</span></h1>
                        <div className="col-4 d-flex flex-column align-items-center">
                            <div>
                                <img className="mb-3" src="/category-2.png" />
                            </div>
                            <h5 className="text-white w-75">SMOOTH BROWSING</h5>
                            <p className="text-white w-75">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                        <div className="col-4 d-flex flex-column align-items-center">
                            <div>
                                <img className="mb-3" src="/group.png" />
                            </div>
                            <h5 className="text-white w-75">EASY DELIVERY</h5>
                            <p className="text-white w-75">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                        <div className="col-4 d-flex flex-column align-items-center">
                            <div>
                                <img className="mb-3" src="/empty-wallet-tick.png" />
                            </div>
                            <h5 className="text-white w-75">SWIFT PAYMENST</h5>
                            <p className="text-white w-75">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mt-5 p-5">
                            <h1 className="text-center w-75">Browse and buy your <span className="text-warning">favorite guitars</span> with VibeString</h1>
                            <div className="mt-5 mb-5">
                                <img src="/slika1.png" />
                            </div>
                        </div>
                        <div className="col-6">
                            <img src="/slika2.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;
