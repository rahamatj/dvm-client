import {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [candidates, setCandidates] = useState([]);
    const [votedId, setVotedId] = useState(null);
    const [nid, setNid] = useState("");

    // Update state when input changes
    const handleChange = (e) => {
        setNid(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        await axios.get("http://localhost:8080/api/voters/" + nid)
            .then((response) => {
                console.log(response);
                toast("NID received successfully.");
            })
            .catch((error) => {
                console.error(error);
                toast("Something went wrong. Please try again later.");
            });

        console.log("Submitted NID:", nid);
    };

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/candidates/')
			.then((response) => {
				setCandidates(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);


    const handleVote = (c) => {
        setVotedId(c.id);
        c.votes += 1;
        axios
        .get('http://localhost:8080/api/candidates/' + c.id)
        .then((response) => {
            console.log(response.data);

            toast("You've voted successfully!");
        })
        .catch((error) => {
            console.error(error);

            toast("Something went wrong!");
        });
    };

	return (
        <>
            {/*<form method="GET" onSubmit={handleSubmit} className="input-group mb-3">*/}
            {/*    <span className="input-group-text" id="basic-addon1">NID:</span>*/}
            {/*    <input type="text" name="nid" className="form-control" onChange={handleChange} />*/}
            {/*    <button type="submit" className="btn btn-primary">Submit</button>*/}
            {/*</form>*/}
            <div className="row">
                {candidates.map((c) => (
                    <button onClick={() => handleVote(c)}
                            className="col-md-4 d-flex justify-content-around border-0"
                            disabled={!!votedId}
                            key={c.id}
                    >
                        <div className="align-items-center">
                            <div className="fs-1">{c.symbol.emoji}</div>
                            <div className="text-center fw-bolder">{c.name}</div>
                            <div>Votes: {c.votes}</div>
                        </div>
                    </button>
                ))}
            </div>

        </>
    );
}

export default App;
