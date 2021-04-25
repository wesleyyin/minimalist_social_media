import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

//pass req in this.props.req
//get user info on mount from 
class ReqStub extends Component {
  constructor(props){
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.renderStatus = this.renderStatus.bind(this);

    this.state = {
      username: '',
      profPic: '',
      status: '',
    }
    
  }
  
 
  //props:
  //need username for display
  //add profile pic link later
  //will pass in more later

  componentDidMount(){
    const user = this.props.req.userA;
    alert(user);
    if (user.length ==0) {
        alert("you are not logged in");
        window.location.href = '/login';
    }
    axios.get("http://localhost:5000/users/" + user)
       .then(function(res){
         console.log(res);

           this.setState({
               username: res.data.username,
               profPic: res.data.profilePic,
           });
           this.updateStatus();
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));
    
}
updateStatus(){
  axios.get("http://localhost:5000/connections/" + this.props.req._id)
  .then(function(res){
    console.log(res.data);
    if(res.data==null){
      this.setState({
        status: 'declined'
      })
    }
    else if(res.data.status == 'pending'){
      this.setState({
        status: 'pending'
      })
    }else if(res.data.status == 'connected'){
      this.setState({
        status: 'connected'
      })
    }
    else{
      this.setState({
        status: 'declined'
      })
    }
  }.bind(this))
  .catch(err => console.log('Error: ' + err));
}
renderStatus(){
  if(this.state.status=='declined'){
    return(<div>Request Declined</div>)
  }else if(this.state.status =='connected'){
    return(<div>Request Accepted</div>)
  }return(<div>
          <button onClick = {this.onAccept}>Accept</button>
          <button onClick = {this.onDecline}>Decline</button>
  </div>)
}
onAccept(){
  axios.post("http://localhost:5000/connections/accept/" + this.props.req._id)
  .then(function(res){
      alert(res.data);
      this.updateStatus();
  }.bind(this))
  .catch(err => console.log('Error: ' + err));
}
onDecline(){
  axios.delete("http://localhost:5000/connections/" + this.props.req._id)
  .then(function(res){
      alert(res.data);
      this.updateStatus();
  }.bind(this))
  .catch(err => console.log('Error: ' + err));
}
  render() {
    if(this.state.username == ''){
      return (<div></div>);
    }//add prof pic later
    return (
      <div>
          <p><Link to = {"/profiles/" + this.state.username}>{this.state.username}</Link> has requested to connect with you</p>
          <this.renderStatus/>
      </div>
    );
  }
}

export default ReqStub;