import { useEffect, useState } from "react"

function App() {
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(res => res.json())
      .then(data => setStatus(data.status))
  }, [])

  return (
    <div className="p-10 text-xl">
      Backend status: {status}
    </div>
  )
}

export default App