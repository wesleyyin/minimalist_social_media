import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReqStub from './req-stub.component'
import axios from 'axios'
//pass in viewed user, connection status, and id of user who is viewing
class Notifications extends Component {
  constructor(props){
    super(props);
    

   
    this.state = {
      requests : []
    };
  }
  componentDidMount(){
    const user = localStorage.getItem("userID");
    alert(user);
    if (user.length ==0) {
        alert("you are not logged in");
        window.location.href = '/login';
    }
    axios.post("http://localhost:5000/connections/userreqs",{userB: user})
       .then(function(res){
         console.log(res);
           this.setState({
               requests: res.data
           });
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));
    
}

  render() {
    const currReqs = this.state.requests;
    
    return (
      <div>
        <h3>Your Connect Requests</h3>
        <div>
            {currReqs.map((req) =>
                <ReqStub req = {req} key={req._id}/>
             )}
        </div>
      </div>
    );
  }
}

export default Notifications;