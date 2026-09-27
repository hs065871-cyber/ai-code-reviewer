import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import EditorImport from "react-simple-code-editor"
import axios from 'axios'
import Markdown from "react-markdown"


import { useState,useEffect } from 'react'
const Editor = EditorImport.default ?? EditorImport


function App(){
  const [count,setCount]=useState(0)
  const [code, setcode] = useState(`function sum(){
              return 1+1
  }`)
  const [review, setreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    prism.highlightAll()
  },[])
 async function reviewCode() {
    try {
        setLoading(true)

        const response = await axios.post(
          'https://ai-code-reviewer-fps5.onrender.com/ai/get-review',
          { code }
        )
        setreview(response.data)

    } catch (error) {
        console.error("Review Error:", error)
        setreview("Something went wrong. Please try again.")

    } finally {
        setLoading(false)
    }
}

  return(
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
        value={code}
        onValueChange={code => setcode(code)}
        highlight={code =>
          prism.highlight(code, prism.languages.javascript, "javascript")
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 25,
          padding:10,
      
          border: "1px solid #ddd",
          borderRadius: 5,
          height: "100%",
          width: "100%",
        }}
      />
      </div>
        <div 
           onClick={!loading ? reviewCode : null}
          className={`review ${loading ? 'loading' : ''}`} >
          {loading ? 'Reviewing...' : 'Review'}
        </div>
      </div>
      <div className="right">
        REVIEW
       <Markdown>{review}</Markdown>
      </div>
    </main>
    </>

  )
}


export default App