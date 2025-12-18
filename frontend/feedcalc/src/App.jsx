import { useState } from "react";
function App() {
  const name = "Bob";
  const [age,setAge] =useState(30)

  return (
    <div>
        <h1>Hello {name}</h1>
        <p>age: {age} years old.</p>
        <button onClick={()=>{setAge(age + 1 )}}> increase </button>
        <button onClick={()=>{setAge(age - 1 )}}> decrease</button>
        <button onClick ={() => {setAge(30)}}> reset </button>

    </div>
  );
}

export default App;
