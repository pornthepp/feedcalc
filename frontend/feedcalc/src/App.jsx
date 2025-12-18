import { use, useState } from "react";
function App() {
  const [data, setData] = useState([
    { empId: "001", name: "ram", age: 20 },
    { empId: "002", name: "shyam", age: 21 },
    { empId: "003", name: "hari", age: 22 },
    { empId: "004", name: "sita", age: 23 },
  ]);
  const [show,setShow] = useState(true);
  return (
    <div>
      <h1>Employee count: {data.length}</h1>
      <button onClick={() => setShow(!show)}> {show ? "Hide":"Show"} </button>

      <ul>
        {show && data.map((item) => (
          <li key={item.empId}> <h3> {item.name} age: {item.age}  </h3> </li>
        ))}

      </ul>
    </div>
  );
}

export default App;
