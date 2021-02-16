import React, { useState, useEffect } from "react";

import axios from "axios";

import FetchData from "./context";

function App() {
  const [users, setUsers] = useState([]);
  const [todo, setTodo] = useState([]);

  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(10);

  const { data, error, loading } = FetchData({ type: "todos" });

  const url = `https://jsonplaceholder.typicode.com/`;

  const removeTodoItem = (index) => {
    setTodo(todo.filter(({ id }) => id !== index));
  };

  const getDataFromAPI = async (type = "users") => {
    await axios
      .get(`${url}${type}`)
      .then((res) => {
        const data = res.data;

        console.log(data);

        type == "users" ? setUsers(data) : setTodo(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // getDataFromAPI("todos");
    // getDataFromAPI("users");
    {
      users && getDataFromAPI("users");
    }
    {
      loading && getDataFromAPI("todos");
    }

    // {
    //   !loading && data && setTodo(data);
    // }

    // console.log("todo: " + todo);
    // console.log("users: " + users);
  }, []);

  return (
    <div className="lg:py-16 py-8 align-middle flex flex-col justify-center items-center">
      <p className="text-4xl font-bold capitalize">coding test</p>

      {/* {!loading && console.log(data)} */}

      {todo && console.log("todo1: ", todo)}
      {users && console.log("users1: ", users)}

      {error && <p>fetching data gives error</p>}
      {loading && <p>loading</p>}

      {/* {todo &&
        todo.map((item, key) => {
          return <List2 key={key} dt={item} />;
        })} */}

      <List2
        dt={todo}
        users={users}
        next={next}
        prev={prev}
        removeTodoItem={removeTodoItem}
      />

      <div className="flex flex-row gap-20">
        <button
          className="text-lg font-normal p-4 bg-orange-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out"
          onClick={() => {
            setPrev(prev - 10);
            setNext(next - 10);
          }}
        >
          prev
        </button>
        <button
          className="text-lg font-normal p-4 bg-orange-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out"
          onClick={() => {
            setPrev(prev + 10);
            setNext(next + 10);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;

function List2({ dt, users, next = 10, prev = 0, removeTodoItem }) {
  return (
    <div className="max-w-6xl w-full lg:py-8 py-4 justify-center items-center mx-auto self-center flex">
      <table className="table-auto gap-4">
        <thead className="border-b-2">
          <tr className="justify-between  justify-aroundly">
            <th className="">#</th>
            <th className="ml-auto justify-start">Title</th>
            <th>Assignes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* {console.log("data2: " + data2)} */}
        <tbody>
          {dt.slice(prev, next).map((item, key) => {
            return (
              <TBODY
                removeTodoItem={removeTodoItem}
                key={key}
                id={item.id}
                user={users.filter((user) => {
                  return user.id == item.userId;
                })}
                title={item.title}
                completed={item.completed}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TBODY({ id, title, completed, user, removeTodoItem }) {
  return (
    <tr>
      {console.log("user--: ", user)}
      <td className="py-2 px-4" key={id}>
        {id}
      </td>
      <td className="py-2 px-4 justify-start">{title && title}</td>
      <td className="py-2 px-4">{user && user[0].name}</td>
      <td className="py-2 px-4">{completed.toString()}</td>
      <td className="py-2 px-4">
        <div className="flex flex-row gap-2">
          <button className="text-lg font-normal p-4 bg-blue-600 text-white capitalize hover:bg-blue-400 transition duration-300 ease-in-out">
            edit
          </button>
          <button
            className="text-lg font-normal p-4 bg-red-600 text-white capitalize hover:bg-red-400 transition duration-300 ease-in-out"
            onClick={() => {
              removeTodoItem(id);
            }}
          >
            remove
          </button>
        </div>
      </td>
    </tr>
  );
}
