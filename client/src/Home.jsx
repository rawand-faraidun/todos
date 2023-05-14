import { useContext, useEffect, useState } from 'react'
import Collection from './components/Collection'
import Dialog from './components/Dialog'
import request from './components/request'
import { AuthContext } from './components/AuthContext'

export default function Page() {
  const { loginState } = useContext(AuthContext)
  const [refresh, setRefresh] = useState(Math.random())
  const [datas, setDatas] = useState([])
  const [showNewCollection, setShowNewCollection] = useState(false)
  const [newCollection, setNewCollection] = useState({ name: '' })

  // handle add collection
  const handleAddCollection = async e => {
    try {
      const { data } = await request('/api/collections', {
        method: 'POST',
        data: { name: newCollection.name },
        token: loginState.token
      })
      setNewCollection({ name: '' })
      setRefresh(Math.random())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    request('/api/collections', { token: loginState.token })
      .then(res => {
        setDatas(res.data.data)
      })
      .catch(err => console.log(err))
  }, [refresh])

  return (
    <>
      <div className="p-6 w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-teal-500 to-cyan-700">
        {/* collection's main */}
        <main className="p-4 w-full max-w-xl bg-white rounded-lg shadow-md">
          {/* title */}
          <h1 className="text-2xl font-bold">Collections</h1>

          <hr className="my-4 border-gray-700" />

          {/* collections */}
          <div className="grid grid-cols-1 gap-2">
            {datas.map(collection => (
              <Collection key={collection.id} data={collection} setRefresh={setRefresh} />
            ))}
            <div className="pt-4 flex justify-center">
              <button
                className="p-2.5 w-full max-w-[10rem] text-white bg-teal-500 hover:bg-teal-700 rounded-md outline-none transition duration-200"
                onClick={() => setShowNewCollection(true)}
              >
                Add collection
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
              onChange={e => setNewCollection({ ...datas, name: e.target.value })}
              autoComplete="off"
            />
          </div>
        }
      />
    </>
  )
}
