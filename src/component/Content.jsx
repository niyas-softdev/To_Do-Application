import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

function Content() {
  const [Tasks, setTasks] = useState([]);
  const [Newtask, setNewtask] = useState("");
  const [Edittask, setEdittask] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const [name, setName] = useState();
  const [dp, setDp] = useState();

  useEffect(() => {
    const displayData = auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
        setDp(user.photoURL);
        setUserId(user.uid);
        getTasks(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => displayData();
  }, [navigate]);

  const getTasks = async (uid) => {
    if (uid) {
      const taskQuery = query(
        collection(db, "taskscollection"),
        where("userId", "==", uid)
      );
      const data = await getDocs(taskQuery);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setTasks(filteredData);
    }
  };

  const InputChange = (e) => {
    setNewtask(e.target.value);
  };

  const OnSubmit = async () => {
    setNewtask("");
    if (Edittask) {
      const updateRef = doc(db, "taskscollection", Edittask.id);
      await updateDoc(updateRef, { text: Newtask });
      setEdittask(null);
    } else {
      await addDoc(collection(db, "taskscollection"), {
        text: Newtask,
        completed: false,
        userId
      });
    }
    getTasks(userId);
  };

  const deleteTask = async (task) => {
    const docRef = doc(db, "taskscollection", task.id);
    await deleteDoc(docRef);
    getTasks(userId);
  };

  const updateTask = (task) => {
    setNewtask(task.text);
    setEdittask(task);
  };

  const completeTask = async (task) => {
    const radioRef = doc(db, "taskscollection", task.id);
    await updateDoc(radioRef, { completed: !task.completed });
    getTasks(userId);
  };

  return (
    <Container fluid>
      <Row>
        <Col
          lg={5}
          md={6}
          className="leftcontent d-flex flex-column align-items-center justify-content-center"
        >
          <Image src={dp} alt="" className="profpic rounded-circle shadow" />
          <h1 className="mt-3">Hi, {name}</h1>
          <Image src="/assets/taskimg.png" alt="" className="taskimg mt-4" />
        </Col>

        <Col
          lg={7}
          md={6}
          className="rightcontent d-flex flex-column align-items-center pt-4"
        >
          <h1>My Tasks</h1>

          <div className="inputcontent px-5 d-flex w-100 my-3">
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Enter the task here"
              value={Newtask}
              onChange={InputChange}
            />
            <Button
              className="btn btn-primary rounded-pill ms-2"
              onClick={OnSubmit}
            >
              {Edittask ? "Update" : "Add"}
            </Button>
          </div>

          <div className="tasklist w-100 px-3">
            <ul className="list-unstyled">
              {Tasks.map((task) => (
                <li
                  key={task.id}
                  className={`taskitem d-flex align-items-center justify-content-between p-3 mb-3 rounded shadow ${
                    task.completed ? "completed" : ""
                  }`}
                >
                  <div className="taskcontent d-flex align-items-center w-100">
                    <Form.Check
                      type="checkbox"
                      className="me-3"
                      onChange={() => completeTask(task)}
                      checked={task.completed}
                    />
                    <span className="flex-grow-1">{task.text}</span>
                    <Button
                      variant="warning"
                      size="sm"
                      className="ms-2"
                      onClick={() => updateTask(task)}
                    >
                      UPD
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => deleteTask(task)}
                    >
                      DEL
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Content;
