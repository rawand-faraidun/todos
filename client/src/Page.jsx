import { useParams, useNavigate, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Todo from './components/Todo'
import Dialog from './components/Dialog'
import request from './components/request'
import { AuthContext } from './components/AuthContext'

export default function Page() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loginState } = useContext(AuthContext)

  const [refresh, setRefresh] = useState(Math.random())
  // current todos
  const [datas, setDatas] = useState([])
  // new todo
  const [showNewTodo, setShowNewTodo] = useState(false)
  const [newTodo, setNewTodo] = useState({ title: '' })
  // all collections
  const [allCollections, setAllCollections] = useState([])
  // current collection
  const [collection, setCollection] = useState({})
  // edit and delete collection
  const [showEdit, setShowEdit] = useState(false)
  const [editCollection, setEditCollection] = useState({ name: '' })
  const [showDelete, setShowDelete] = useState(false)
  // new collection
  const [showNewCollection, setShowNewCollection] = useState(false)
  const [newCollection, setNewCollection] = useState({ name: '' })

  // handle add todo
  const handleAddTodo = async e => {
    try {
      const { data } = await request('/api/todos', {
        method: 'POST',
        data: { title: newTodo.title, collectionId: collection.id },
        token: loginState.token
      })
      setNewTodo({ title: '' })
      setRefresh(Math.random())
    } catch (err) {
      console.log(err)
    }
  }

  // handle add collection
  const handleAddCollection = async e => {
    try {
      const { data } = await request('/api/collections', {
        method: 'POST',
        data: { name: newCollection.name },
        token: loginState.token
      })
      setNewCollection({ name: '' })
      navigate(`/${data.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  // handle update collection
  const handleUpdateCollection = async e => {
    try {
      const { data } = await request(`/api/collections/${collection.id}`, {
        method: 'PUT',
        data: { name: editCollection.name },
        token: loginState.token
      })
      setRefresh(Math.random())
    } catch (err) {
      console.log(err)
    }
  }

  // handle update collection
  const handleDeleteCollection = async e => {
    try {
      const { data } = await request(`/api/collections/${collection.id}`, {
        method: 'DELETE',
        data: { name: datas.name },
        token: loginState.token
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  // all collections
  useEffect(() => {
    request('/api/collections', { token: loginState.token })
      .then(res => {
        setAllCollections(res.data.data)
      })
      .catch(err => console.log(err))
  }, [refresh])

  // current collection
  useEffect(() => {
    request(`/api/collections/${id}`, { token: loginState.token })
      .then(res => {
        setCollection(res.data.data)
        setEditCollection(res.data.data)
      })
      .catch(err => console.log(err))
    request(`/api/todos/collection/${id}`, { token: loginState.token })
      .then(res => {
        setDatas(res.data.data)
      })
      .catch(err => console.log(err))
  }, [refresh, id])

  return (
    <>
      <div className="p-6 w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-teal-500 to-cyan-700">
        {/* back button */}
        <div className="fixed top-6 left-6">
          <Link to="/">
            <button className="p-2.5 bg-white hover:bg-gray-100 outline-none rounded-md shadow-md transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* todo's main */}
        <main className="p-4 w-full max-w-xl bg-white rounded-lg shadow-md">
          {/* collections */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="hover:underline underline-offset-4" onClick={() => setShowEdit(true)}>
                <h1 className="text-2xl font-bold">{collection.name}</h1>
              </button>
              <button
                className="text-gray-600 hover:text-rose-600 focus:text-rose-600 transition duration-200"
                onClick={() => setShowDelete(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                name="collection"
                id="collection"
                className="p-2 border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
                value={collection.id}
                onChange={e => navigate(`/${e.target.value}`)}
              >
                {allCollections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <button
                className="text-gray-600 hover:text-teal-500 focus:text-teal-500 transition duration-200"
                onClick={() => setShowNewCollection(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <hr className="my-4 border-gray-700" />

          {/* todos */}
          <div className="grid grid-cols-1 gap-2">
            {datas.map(todo => (
              <Todo key={todo.id} data={todo} setRefresh={setRefresh} />
            ))}
            <div className="pt-4 flex justify-center">
              <button
                className="p-2.5 w-full max-w-[10rem] text-white bg-teal-500 hover:bg-teal-700 rounded-md outline-none transition duration-200"
                onClick={() => setShowNewTodo(true)}
              >
                Add todo
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* new collection */}
      <Dialog
        show={showNewCollection}
        onClose={() => setShowNewCollection(false)}
        acceptButton={{ show: true, onAccept: handleAddCollection }}
        header="Add collection"
        body={
          <div>
            <input
              type="text"
              className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
              id="newCollection"
              name="newCollection"
              placeholder="Collection name"
              value={newCollection.name}
              onChange={e => setNewCollection({ ...newCollection, name: e.target.value })}
              autoComplete="off"
            />
          </div>
        }
      />

      {/* edit collection */}
      <Dialog
        show={showEdit}
        onClose={() => setShowEdit(false)}
        acceptButton={{ show: true, onAccept: handleUpdateCollection }}
        header="Edit Collection"
        body={
          <div>
            <input
              type="text"
              className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
              id="collection"
              name="collection"
              placeholder="Collection name"
              value={editCollection.name}
              onChange={e => setEditCollection({ ...editCollection, name: e.target.value })}
              autoComplete="off"
            />
          </div>
        }
      />
      {/* delete collection */}
      <Dialog
        show={showDelete}
        onClose={() => setShowDelete(false)}
        acceptButton={{ show: true, onAccept: handleDeleteCollection }}
        header="Delete collection"
        body="Are you sure you want to delete this collection?"
      />

      {/* new todo */}
      <Dialog
        show={showNewTodo}
        onClose={() => setShowNewTodo(false)}
        acceptButton={{ show: true, onAccept: handleAddTodo }}
        header="Add todo"
        body={
          <div>
            <input
              type="text"
              className="p-2.5 w-full border-2 hover:border-teal-500 focus:border-teal-500 rounded-md outline-none transition duration-200"
              id="newTodo"
              name="newTodo"
              placeholder="Todo title"
              value={newTodo.title}
              onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
              autoComplete="off"
            />
          </div>
        }
      />
    </>
  )
}
