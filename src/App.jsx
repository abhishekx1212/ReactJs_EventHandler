import './App.css'
import ClassComp from './components/ClassComp'
import Counter from './components/Counter'
import HideShow from './components/HideShow'
import Prop from './components/Prop'
import State from './components/State'
import Form from './Form'

function App() {
  let myData = {
    myName: "trigon",
    myId: "1212",   
    myEmail: "trigon@gmail.com"      
  }
  return (
    <>
      {/* <State/> */}
      
      {/* <Prop user={myData} />         */}
      
      {/* <ClassComp user={myData}/> */}
    
      {/* <Counter/> */}

      {/* <Form/> */}

      <HideShow/>
    </>
  )
}

export default App
