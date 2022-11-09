import { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tourActions, createTour } from "../redux/features";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const { resetError } = tourActions;

  const [tourData, setTourData] = useState(initialState);
  const { error, loading } = useSelector((state) => ({ ...state.tour }));
  const user = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = tourData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updateTourData = { ...tourData, name: user?.result?.name };
      dispatch(createTour({ updateTourData, navigate, toast }));
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTag = (tag) => {
    setTourData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== deleteTag),
    }));
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };

  useEffect(() => {
    error && toast.error(error);
    return () => {
      dispatch(resetError());
    };
  }, [error]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <MDBCardBody>
          <h5>Add Tour</h5>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="please provide title."
              invalid
              className="col-md-12"
            >
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="please provide description."
              invalid
              className="col-md-12"
            >
              <MDBTextArea
                placeholder="Enter Description"
                type="text"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
