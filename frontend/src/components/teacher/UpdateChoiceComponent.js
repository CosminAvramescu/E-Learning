import React, { useState, useEffect } from "react";
import ChoiceService from "../../services/ChoiceService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddChoiceComponent = () => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setCorrect] = useState(false);
  const toggleCorrect = () => setCorrect(value => !value);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const updateChoice = (e) => {
    e.preventDefault();

    const choiceEntity = { answer, isCorrect };
  ChoiceService.updateChoice(id, choiceEntity)
        .then((response) => {
          navigate(`/choices`);
        })
        .catch((error) => {
          console.log(error);
        });
        console.log("choice updating..")
      };

  useEffect(() => {
    ChoiceService.getChoiceById(id)
      .then((response) => {
        setAnswer(response.data.answer);
        setCorrect(false);
      })
      .catch((error) => {
        console.log(error);
      });
      setCorrect(prevCheck => !prevCheck);
  }, [id]);


  return (
    <div>
      <br />
      <br />
      <div >
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Update Choice </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Choice name: </label>
                  <input
                    type="text"
                    placeholder="Enter choice name"
                    name="choice"
                    className="form-control"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> isCorrect: </label>
                </div>
                <input
                  type="checkbox"
                  isCorrect={isCorrect}
                  onChange={toggleCorrect}
                />
                <button
                  className="btn btn-success"
                  onClick={(e) => updateChoice(e)}
                >
                  Save Choice
                </button>
                <Link to="/choices" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChoiceComponent;
