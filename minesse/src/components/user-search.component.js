import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Redirect } from 'react-router-dom'

export default class UserSearch extends Component{
    
    constructor(props){
        super(props)
        this.onChangeSearch = this.onChangeSearch.bind(this);
      
   
        this.onSubmit= this.onSubmit.bind(this);

        
        this.state = {
            searchedUser : ''
        };

    }

    componentDidMount(){
        const user = localStorage.getItem("username")
        alert(user);
        if (user.length ==0) {
            alert("you are not logged in");
          window.location.href = '/login';
        }
        const username = user;
        const userData = {
            username  : username,
        }
        console.log(userData);
        let id = "";
        
        axios.post("http://localhost:5000/users/findname", userData)
            .then(function(res){
                alert(res.data.status);
                if(res.data.status){
                    id = res.data.id
                    this.setState({
                        userID:id
                    });
                }else{
                    alert(res.data.msg);
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    onChangeSearch(e){
        this.setState({
            searchedUser: e.target.value
        });
    }
    

    onSubmit(e){
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('photo', this.state.photo);
        
        axios.post('http://localhost:5000/images/add/', formData)
            .then(res => {
                if(res.data.uploaded){
                    console.log("image uploaded");
                    const fileName = res.data.fileName;
                    const caption = this.state.caption;
                    const user = this.state.userID;
                    console.log(user);
                    const post = {
                        user: user,
                        caption: caption,
                        photoName: fileName
                    }
                    axios.post("http://localhost:5000/posts/add", post)
                        .then(function(res){
                            alert(res.data);
                        })
                        .catch(err => console.log('Error: ' + err));
                 }else{
                     alert("photo upload failed");
                 }
                
             });
             
    }
    
    render(){
        return (
            <div>
            <h3>Search for a User</h3>
            <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                    <label>Username: @</label>
                    <input type = "text" 
                        required
                        className = "form-control"
                        value = {this.state.searchedUser}
                        onChange = {this.onChangeSearch}
                        />    
                </div>
                
                    
                    
                    <div className = "form-group">
                        <input type = "submit" value = "Search!" className = "btn btn-primary"/>
                    </div>
                    

                </form>
            </div>
        );
    }
}