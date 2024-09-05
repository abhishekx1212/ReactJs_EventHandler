import React, { useEffect, useState } from 'react'

const Form = () => {
  
  const [studnt,setStudnt] = useState({})  
  const [list,setList] = useState([])  
  const [ind, setInd] = useState(-1)
  const [err,setErr] = useState({})
  const [hoby,setHoby] = useState([])

  useEffect(()=>{
    let oldVal = JSON.parse(localStorage.getItem('list')) || []
    setList(oldVal)
  },[])

  function handleInput(val){        
    let {name,value} = val.target;
    if(name == 'hobby'){
      let tempArr = [...hoby];
      if(val.target.checked){
        tempArr.push(value)
      }else{
        let arrInd = hoby.findIndex((v)=> v == value)
        tempArr.splice(arrInd,1)
      }
      setHoby(tempArr)
      value = [...tempArr]
      // console.log(tempArr);
    }
    setStudnt({...studnt,[name]:value}) 
  }

  function handleValidation(){
   let tempError = {};
   if(!studnt.userName) tempError.userName = "User Name required"
   if(!studnt.email) tempError.email = "email required"
   else if(!/\S+@\S+\.\S+/.test(studnt.email)) tempError.email = "Invalid Email"
   if(!studnt.mobile) tempError.mobile = "Mobile required"
   if(!studnt.gender) tempError.gender = "gender required"
   if(!studnt.city) tempError.city = "city required"
   setErr(tempError)
   return Object.keys(tempError).length != 0 
  }

  function submtForm(){
    if (handleValidation()) return;
    if(ind == -1){
      let newVal = [...list,studnt]
      setList(newVal)      
      localStorage.setItem('list', JSON.stringify(newVal))
    }else{      
      let newVal = [...list];
      newVal[ind] = {...studnt};      
      setList(newVal)
      localStorage.setItem('list', JSON.stringify(newVal))
      setInd(-1)
    }
    setStudnt({})  
    setErr({}) 
    setHoby([])
  }
 
  function delFun(i){    
    list.splice(i,1)
    let newVal = [...list] 
    localStorage.setItem('list', JSON.stringify(newVal))
    setList(newVal)
  }

  function edt(i){
    setStudnt(list[i]);
    setInd(i)
    setHoby(list[i].hobby)
  }

  return (
    <div>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {err.userName? <span>{err.userName}</span>:null }<input type="text" name='userName' value={studnt.userName?studnt.userName:""} onChange={handleInput}  /><br />
            {err.email? <span>{err.email}</span>:null }<input type="text" name='email' value={studnt.email?studnt.email:""} onChange={handleInput}  /><br />
            {err.mobile? <span>{err.mobile}</span>:null }<input type="text" name='mobile' value={studnt.mobile?studnt.mobile:""} onChange={handleInput}  /><br />
            {err.gender? <span>{err.gender}</span>:null }<input type="radio" name="gender" checked={studnt.gender == 'male'} value={"male"} onChange={handleInput} />Male <br />
            <input type="radio" name="gender" checked={studnt.gender == 'female'} value={"female"} onChange={handleInput} />Female <br />
            {err.city? <span>{err.city}</span>:null }<select name="city" id="" value={studnt.city || ""} onChange={(e) => handleInput(e)} >
                <option disabled value="">Select City</option>
                <option value="surat">Surat</option>
                <option value="Baroda">Baroda</option>
                <option value="Vapi">Vapi</option>
            </select>
            <input type="checkbox" name="hobby" id="" value={"cricket"} onChange={handleInput} checked={hoby.includes('cricket')} />Cricket
            <input type="checkbox" name="hobby" id="" value={"football"} onChange={handleInput} checked={hoby.includes('football')} />Football
            <input type="checkbox" name="hobby" id="" value={"hockey"} onChange={handleInput} checked={hoby.includes('hockey')} />Hockey
            <button type='submit' onClick={submtForm} >Submit</button>
        </form>
        <table border={1} align='center' style={{marginTop:20}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Gender</th>
              <th>City</th>
              <th>Hobby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((val,index)=>{
                return(
                <tr key={index} >
                  <td>{val.userName}</td>
                  <td>{val.email}</td>
                  <td>{val.mobile}</td>
                  <td>{val.gender}</td>
                  <td>{val.city}</td>
                  <td>{val.hobby.join(" ")}</td>
                  <td>
                    <button onClick={()=>{delFun(index)}} >Delete</button>
                    <button onClick={()=>{edt(index)}} >EDIT</button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default Form
