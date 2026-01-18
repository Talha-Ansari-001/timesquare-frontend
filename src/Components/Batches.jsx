import React from 'react'
import { useNavigate } from 'react-router-dom';

const Batches = () => {

  const navigate = useNavigate();

  return (
    <div className='mainContainer'>
      <div className='mg-15'>
        <h1 className='text-center hd pt-44'>Batches</h1>
        <form className="teacher-form teacher-search-form">
          <input type="text" placeholder="Name or Surname" />

          <select id="selection">
            <option value="">Select Stream</option>
            <option value="IT">IT</option>
            <option value="Non IT">Non IT</option>
          </select>

          <select>
            <option value="">Select Reference</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Banner">Banner</option>
            <option value="Others">Others</option>
          </select>

          <select>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button type="submit">Search</button>
          <button type="button">Clear</button>
          <button type="button" className="add-btn" onClick={() => { navigate("/AddBatch") }}>Add Batch</button>
        </form>
        <hr />
      </div>
    </div>
  )
}

export default Batches
