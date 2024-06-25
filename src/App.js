import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import './App.css';

const PAT = '6ef13969f2194ed3b6187da8bb943161';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'venkatsainath';
const APP_ID = 'smartrobot';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      regions : [],
      route: 'signin',
      isSignedIn: false,
      user : {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }



  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": this.state.input

                }
            }
        }
    ]
});
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.outputs) {
          const regionsData = result.outputs[0].data.regions.map(region => {
            const boundingBox = region.region_info.bounding_box;
            return {
              topRow: boundingBox.top_row,
              leftCol: boundingBox.left_col,
              bottomRow: boundingBox.bottom_row,
              rightCol: boundingBox.right_col
            };
          });
          this.setState({regions: regionsData});
          return fetch('http://localhost:5000/image', {
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          });
        }
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(error => console.log('error', error));
  }
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    return (
      <div className = "App">
        <Navigation isSignedIn = {this.state.isSignedIn}onRouteChange = {this.onRouteChange} />
        {this.state.route === 'home'
        ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition imageUrl = {this.state.imageUrl} regions = {this.state.regions}/> 
          </div>
         : (this.state.route === 'signin'
            ?<Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <Signup loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
           )

       }
      </div>
    );
  }
}
export default App;