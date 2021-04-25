
import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//pass in user ID and display username and profile pic
class SubProfile extends Component {
  constructor(props){
    super(props);
    this.renderPic = this.renderPic.bind(this);
    this.state = {
      username: '',
      profilePic: ''
    }
  }
  
  //props:
  //need username for display
  //add profile pic link later
  //will pass in more later
  componentDidMount(){
    const user = this.props.userID;
    console.log(user);
    axios.get("http://localhost:5000/users/" + user)
            .then(function(res){
                console.log(res.data);
                if(typeof res.data !== 'undefined'){
                  console.log(res.data.username);
                  this.setState({
                    username: res.data.username,
                    profilePic: res.data.profilePic
                  })
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
  }
  renderPic(){
    
    if(typeof this.state.profilePic!='undefined' &&this.state.profilePic!=''){
      return(<div className = "imgDiv" style= {{height: '50px', width: '50px', overflow: 'hidden', borderRadius: '25px'}}>
      <img style={{height: '100%'}} src={process.env.PUBLIC_URL + '/images_uploads/' + this.state.profilePic } />
    </div>);
    }return(<div></div>);
  }
  render() {
    
    return (
      <div className="subProfile" >
        <this.renderPic/>
        <Link to = {"/profiles/" + this.state.username}>{this.state.username}</Link>
      </div>
    );
  }
}

export default SubProfile;