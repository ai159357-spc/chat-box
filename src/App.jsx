import React, { useState, useEffect, useRef } from 'react'
import './App.css'

const App = () => {

  
  const [input1, setInput1] = useState("")
  const [messages1, setMessages1] = useState(() => {
    const saved = localStorage.getItem("chat1")
    return saved ? JSON.parse(saved) : []
  })
  const endRef1 = useRef(null)
  // Save to localStorage and scroll to bottom
  useEffect(() => {
    localStorage.setItem("chat1", JSON.stringify(messages1))
    endRef1.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages1])
  // Send message from Chat 1 to Chat 2
  const handleSend1 = () => {
    if (input1 == "") {
      alert("Enter a message...")
      return
    }
    setMessages1([...messages1, { text: input1, type: "sent" }])
    setMessages2([...messages2, { text: input1, type: "received" }])
    setInput1("")
  }


  const [input2, setInput2] = useState("")
  const endRef2 = useRef(null)
  const [messages2, setMessages2] = useState(() => {
    const saved = localStorage.getItem("chat2")
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => {         
    localStorage.setItem("chat2", JSON.stringify(messages2))
    endRef2.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages2])
  // Send message from Chat 2 to Chat 1
  const handleSend2 = () => {
    if (input2 == "") {
      alert("Enter a message...")
      return
    }
    setMessages2([...messages2, { text: input2, type: "sent" }])
    setMessages1([...messages1, { text: input2, type: "received" }])
    setInput2("")
  }

  return (
    <div className="container">
      {/* Chat 1 */}
      <div className="phone-frame">
        <div className="chat-header">
          <h2>Chat 1 : .....N..</h2>
        </div>
        <div className="messages">
          {
            messages1.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))
          }
          <div ref={endRef1}></div>
        </div>
        <div className="input-area">
          <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Type a message..." onKeyPress={(e) => { if (e.key === 'Enter') handleSend1() }} />
          <button onClick={handleSend1}>Send</button>
        </div>
      </div>

      {/* Chat 2 */}
      <div className="phone-frame">
        <div className="chat-header">
          <h2>Chat 2 : BHAVIK</h2>
        </div>
        <div className="messages">
          {
            messages2.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))
          }
          <div ref={endRef2}></div>
        </div>
        <div className="input-area">
          <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Type a message..." onKeyPress={(e) => { if (e.key === 'Enter') handleSend2() }} />
          <button onClick={handleSend2}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
