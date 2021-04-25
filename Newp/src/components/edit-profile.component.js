
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class EditProfile extends Component {
  constructor(props){
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.renderPic = this.renderPic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.state = {
      username: "",
      profilePicName: "",
      photo:'',
      bio: "",
    }
  }
  
  //props:
  //need username for display
  //add profile pic link later
  //will pass in more later
  updateUser(){
    const user = localStorage.getItem("userID");
    axios.get("http://localhost:5000/users/" + user)
            .then(function(res){
                console.log(res.data);
                if(typeof res.data !== 'undefined'){
                  this.setState({
                    username: res.data.username,
                    profilePic: res.data.profilePic,
                    bio: res.data.bio
                  })
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
  }

  componentDidMount(){
    const user = localStorage.getItem("userID")
        alert(user);
        if (user.length ==0) {
            alert("you are not logged in");
          window.location.href = '/login';
        }this.updateUser();
  }
  renderPic(){
    if(this.state.profilePic!= ""){
      return(<div className = "imgDiv" style= {{height: '150px', width: '150px', overflow: 'hidden', borderRadius: '50px'}}>
      <img style={{height: '100%'}} src={process.env.PUBLIC_URL + '/images_uploads/' + this.state.profilePic } />
    </div>);
    }
    return(<div></div>);
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state.photo);
    if(this.state.photo == ''){
      console.log('works');
      const bio = this.state.bio;
                
     
      console.log(this.state.username);
      const userData = {
          username: this.state.username,
          bio: bio
       }
      axios.post("http://localhost:5000/users/updatebio", userData)
                    .then(function(res){
                        alert(res.data);
                        this.updateUser();
                        return;

                    }.bind(this))
                    .catch(err => console.log('Error: ' + err));
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.state.photo);
    
    axios.post('http://localhost:5000/images/add/', formData)
        .then(function(res){
            if(res.data.uploaded){
                console.log("image uploaded");
                const fileName = res.data.fileName;
                const bio = this.state.bio;
                const user = localStorage.getItem("userID");
                console.log(user);
                console.log(this.state.username);
                const userData = {
                    username: this.state.username,
                    bio: bio,
                    photoName: fileName
                }
                axios.post("http://localhost:5000/users/update", userData)
                    .then(function(res){
                        alert(res.data);
                        this.updateUser();

                    }.bind(this))
                    .catch(err => console.log('Error: ' + err));
             }else{
                 alert("photo upload failed");
             }
            
         }.bind(this));
  }
  onChangeBio(e){
    this.setState({
      bio: e.target.value
  });
  }
  onChangePhoto(e){
    this.setState({
      photo: e.target.files[0]
    });
  }
  render() {
    if(this.state.username == ""){
      return (<h3>User not found</h3>);
    }
    return (
      <div>
        <this.renderPic/>
        <h3>{this.state.username}</h3>
        <h5>{this.state.bio}</h5>
        <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                
                <div className = "form-group">
                    <label>Upload a profile pic: </label>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={this.onChangePhoto}
                    />   
                </div>

                <div className = "form-group">
                    <label>Update your bio: </label>
                    <input type = "text" 
                        required
                        className = "form-control"
                        value = {this.state.bio}
                        onChange = {this.onChangeBio}
                        />    
                </div>
    
               
    
    
                <div className = "form-group">
                    <input type = "submit" value = "Update!" className = "btn btn-primary"/>
                </div>
            </form>
      </div>
    );
  }
}

export default EditProfile;