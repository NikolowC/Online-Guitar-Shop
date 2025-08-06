import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import "./ModelPage.css";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

const GET_ALL_MODELS = gql`
  query {
    findAllBrands {
      id
      models {
        id
        image
        name
        price
        type 
      }
    }
  }
`;

interface Model {
    id: string;
    image: string;
    name: string;
    price: number;
    type: string;
}

interface Brand {
    id: string;
    models: Model[];
}

function ModelPage() {
    const { brandId } = useParams();
    const navigate = useNavigate();
    const { error, loading, data } = useQuery<{ findAllBrands: Brand[] }>(GET_ALL_MODELS);

    const [searchText, setSearchText] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("All");
    const [models, setModels] = useState<Model[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!data) return;

        const brand = data.findAllBrands.find((b) => b.id === brandId);
        if (brand?.models) {
            setModels(brand.models);
        }
    }, [data, brandId]);

    const filteredModels: Model[] = models.filter((model) => {
        const matchesSearch = model.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = selectedType === "All" || model.type === selectedType;
        return matchesSearch && matchesType;
    });

    const indexOfLastModel = currentPage * itemsPerPage;
    const indexOfFirstModel = indexOfLastModel - itemsPerPage;
    const currentModels: Model[] = filteredModels.slice(indexOfFirstModel, indexOfLastModel);

    const handleModelClick = (model: Model) => {
        navigate(`/brand/${brandId}/model/${model.id}`);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading spinner...</div>;
    if (error) return <div>Something went wrong</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col-6 mt-5">
                            <button className="btn btn-warning" onClick={() => navigate("/")}>
                                Back to home
                            </button>
                            <div className="list-item-with-logo mt-5 p-2">
                                <img className="list-logo" src="/Butterfly.png" />
                                <h3>ViteStrings</h3>
                            </div>
                            <h1 className="text-center fw-bold pt-5">
                                Play like a <span className="text-warning">Rock star</span>
                            </h1>
                            <p className="text-center">
                                With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance.
                            </p>
                        </div>
                        <div className="col-6">
                            <div className="image-overlay-container">
                                <img className="mb-5 pb-5 background-image" src="/secondheader.png" />
                                <img className="overlay-image" src="/image 3.png" />
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="text-center fw-bold mt-5">
                    Check out the <span className="text-warning">Selection</span>
                </h1>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="fw-bold form-control p-3"
                                type="search"
                                placeholder="Search by name"
                                aria-label="Search"
                            />
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="form-select fw-bold p-3"
                                aria-label="Filter by guitar type"
                            >
                                <option value="All">All Types</option>
                                <option value="Bass">Bass</option>
                                <option value="Acoustic">Acoustic</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    {currentModels.length === 0 ? (
                        <p className="text-center">No models found.</p>
                    ) : (
                        currentModels.map((model) => (
                            <div className="col-md-4 mb-4" key={model.id}>
                                <img
                                    src={model.image}
                                    className="model-img"
                                    onClick={() => handleModelClick(model)}
                                    style={{ cursor: "pointer" }}
                                />
                                <div>
                                    <p className="text">{model.name}</p>
                                    <p className="text">${model.price}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredModels.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModelPage;
