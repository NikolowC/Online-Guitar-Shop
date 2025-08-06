import { useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./DetailsPage.css";

const GET_ALL_DETAILS = gql`
  query {
  findAllBrands {
    id
    models {
      id
      description
      name
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        musicianImage
        name
      }
    }
  }
}
`;

function DetailsPage() {
    const { brandId, modelId } = useParams();
    const { error, loading, data } = useQuery(GET_ALL_DETAILS);
    const [activeTab, setActiveTab] = useState("specs");
    const navigate = useNavigate()

    if (loading) return <div>Loading spinner...</div>;
    if (error) return <div>Something went wrong</div>;

    const brand = data.findAllBrands.find((b) => b.id === brandId);

    let model;
    if (brand && brand.models) {
        model = brand.models.find(m => m.id === modelId);

        if (!model) return <div>Model not found!</div>;

        return (
            <div className="container">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 mt-5">
                                <button className="btn btn-warning" onClick={() => navigate(`/brand/${brandId}`)}>
                                    Back to list
                                </button>
                                <div className="list-item-with-logo mt-5 p-2">
                                    <img className="list-logo" src="/Butterfly.png" />
                                    <h3>ViteStrings</h3>
                                </div>
                                <h1 className="fw-bold w-75 ms-5 mt-5 p-2">{model.name}</h1>
                            </div>
                            <div className="col-6">
                                <div className="image-overlay-container">
                                    <img className="mb-5 pb-5 background-image" src="/secondheader.png" />
                                    <img className="overlay-image" src={model.image} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 text-center mb-3">
                        <button
                            className={`font-details nav-link w-100 py-2 fw-bold ${activeTab === "specs" ? "text-warning" : "text-secondary"}`}
                            onClick={() => setActiveTab("specs")}
                        >
                            Specification
                        </button>
                    </div>
                    <div className="col-6 text-center mb-3">
                        <button
                            className={`font-details nav-link w-100 py-2 fw-bold ${activeTab === "musicians" ? "text-warning" : "text-secondary"}`}
                            onClick={() => setActiveTab("musicians")}
                        >
                            Who plays it?
                        </button>
                    </div>
                </div>

                {activeTab === "specs" && (
                    <div className="font-details">
                        <p className="mb-5">{model.description}</p>
                        <ul className="list-unstyled">
                            <li>Body wood: {model.specs.bodyWood}</li>
                            <li>Neck wood: {model.specs.neckWood}</li>
                            <li>Fingerboard: {model.specs.fingerboardWood}</li>
                            <li>Pickups: {model.specs.pickups}</li>
                            <li>Scale length: {model.specs.scaleLength}</li>
                            <li>Bridge: {model.specs.bridge}</li>
                        </ul>
                    </div>
                )}

                {activeTab === "musicians" && (
                    <div className="container">
                        <div className="row">
                            {model.musicians.slice(0, 2).map((musician, index) => (
                                <div className="col-6" key={index}>
                                    <img className="img-fluid mt-5 mb-2" src={musician.musicianImage} />
                                    <p className="font-details text-center fw-bold mb-5">{musician.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default DetailsPage
