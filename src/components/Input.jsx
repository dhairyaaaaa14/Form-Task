import React from 'react'

function Input(props) {
  return (
    <input type={props.type} name={props.name} onChange={props.onChange}/>
  )
}

export default Input

// import React from 'react';

// function Input() {
//   return (
//     <div className="row g-3 align-items-center">
//       <div className="col-auto">
//         <label htmlFor="inputPassword6" className="col-form-label">Password of your account</label>
//       </div>
//       <div className="col-auto">
//         <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
//       </div>
//       <div className="col-auto">
//         <span id="passwordHelpInline" className="form-text">
//           Must be 8-20 characters long.
//         </span>
//       </div>
//     </div>
//   );
// }

// export default Input;