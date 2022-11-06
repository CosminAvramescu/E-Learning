import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChoiceService from "../../services/ChoiceService";

const ListChoiceComponent = () => {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    getAllChoices();
  }, []);

  const getAllChoices = () => {
    ChoiceService.getAllChoices()
      .then((response) => {
        setChoices(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteChoice = (choiceId) => {
    ChoiceService.deleteChoice(choiceId)
      .then((response) => {
        getAllChoices();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Choices </h2>
      <Link to="/add-choice" className="btn btn-primary">
        {" "}
        Add Choice
      </Link>
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: 'center' }}>
          <th> Choice Id </th>
          <th> Choice answer</th>
          <th> Choice isCorrect </th>
          <th> Actions </th> 
        </thead>
        <tbody>
          {choices.map((choice) => (
            <tr style={{ textAlign: 'center' }} key={choice.id}>
              <td> {choice.id} </td>
              <td> {choice.answer} </td>
              <td> {JSON.stringify(choice.isCorrect)}</td>
              <td>
                <Link className="btn btn-info" to={`/edit-choice/${choice.id}`}>
                  {" "}
                  Update{" "}
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteChoice(choice.id)}
                  style={{ marginLeft: "10px" }}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListChoiceComponent;
